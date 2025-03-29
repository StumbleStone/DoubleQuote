import styled from "@emotion/styled";
import React, { ReactNode, useMemo, useState } from "react";
import { PossibleIssue } from "../TextScanner/PossibleIssue";
import { DEBUG_ENABLED, DefaultColors, FontSizes } from "../Toolbox";
import { InlineIssueSpan } from "./InlineIssueSpan";
import { Tile } from "../Components/Tile";

export interface TextRendererProps {
  text: string;
  issues: PossibleIssue[];
  className?: string;
}

function textBuilder(text: string, issues: PossibleIssue[]): ReactNode[] {
  if (issues.length == 0) {
    return [<S.Text key={0}>{text}</S.Text>];
  }

  const parts: ReactNode[] = [];

  let prevIssueEndPos: number = -1;
  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    const prevIssue = issues[i - 1];
    const nextIssue = issues[i + 1];

    const startDelta = Math.min(
      prevIssue ? issue.pos - (prevIssueEndPos + 1) : 3,
      3
    );
    let issueStartPos = issue.pos - startDelta;

    const endDelta = Math.min(nextIssue ? nextIssue.pos - 1 - issue.pos : 3, 3);
    let issueEndPos = issue.pos + endDelta;

    let textLeft: string = text.substring(issueStartPos, issue.pos);
    const trimmedLeft = trimStartNewline(textLeft);
    if (trimmedLeft !== textLeft) {
      issueStartPos =
        issue.pos - (textLeft.length - (startDelta - trimmedLeft.length));
      textLeft = trimmedLeft;
    }

    //_  .  _  _  "  T  r  u  e  ,  "  _  N  a  b  e  e  h
    //0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17
    //           i1
    //  -3 -2 -1  0  1  2  3 [.__"Tru] [1-7(8)] -> ["Tru][4-7(8)]

    //_  .  _  _  "  T  r  u  e  ,  "  _  N  a  b  e  e  h
    //0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17
    //                             i1
    //                    -3 -2 -1  0  1  2  3 [ue,"_Na] [8-13(14)]

    // [1-7][8-13]

    let textRight: string =
      issueEndPos <= issue.pos
        ? ""
        : text.substring(issue.pos + 1, issueEndPos + 1);
    const trimmedRight = trimEndNewline(textRight);
    if (trimmedRight !== textRight) {
      issueEndPos =
        issue.pos + (textRight.length - (endDelta - trimmedRight.length));
      textRight = trimmedRight;
    }

    // // Cause I suck with off-by-one issues
    // textRight = textRight.substring(1);

    const plainText = text.substring(prevIssueEndPos + 1, issueStartPos);
    parts.push(<S.Text key={`text-${issue.pos}`}>{plainText}</S.Text>);

    prevIssueEndPos = issueEndPos;

    parts.push(
      <InlineIssueSpan
        key={issue.pos}
        issue={issue}
        textLeft={textLeft}
        textRight={textRight}
      />
    );
  }

  parts.push(<S.Text key="last">{text.substring(prevIssueEndPos + 1)}</S.Text>);

  return parts;
}

export const TextRenderer: React.FC<TextRendererProps> = (
  props: TextRendererProps
) => {
  const { text, className, issues } = props;

  const [debug, setDebug] = useState(false);

  const content = useMemo(() => {
    return textBuilder(text, debug ? [] : issues);
  }, [debug, issues, text]);

  return (
    <S.Container className={className}>
      {DEBUG_ENABLED && (
        <S.Checkbox
          type="checkbox"
          onChange={(ev) => {
            setDebug(() => ev.target.checked);
          }}
        />
      )}
      <S.scroller>{content}</S.scroller>
    </S.Container>
  );
};

namespace S {
  export const Container = styled(Tile)`
    flex: 1;
    background-color: ${DefaultColors.Container_Active};
    font-size: ${FontSizes.SMALL}px;
    overflow: hidden;
    padding: 0;
    position: relative;
  `;

  export const scroller = styled("div")`
    height: 100%;
    width: 100%;
    overflow: scroll;
    white-space: break-spaces;
    padding: 15px;
    user-select: text;
  `;

  export const Text = styled("span")`
    color: ${DefaultColors.OffWhite};
  `;

  export const Checkbox = styled("input")`
    position: absolute;
    top: 0;
    left: 0;
  `;
}

function trimEndNewline(str: string): string {
  if (!str.includes("\n")) {
    return str;
  }

  return str.substring(0, str.indexOf("\n"));
}

function trimStartNewline(str: string): string {
  if (!str.includes("\n")) {
    return str;
  }

  return str.substring(str.lastIndexOf("\n") + 1);
}
