import { createRoot } from "react-dom/client";
import styled from "@emotion/styled";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  BackgroundColorFlicker,
  BoxShadowFlicker,
  DefaultColors,
  FontSizes,
} from "./Toolbox";
import { Tile } from "./Tile";
import { PossibleIssue } from "./TextScanner/Definitions";
import { useHover } from "./Hooks/useHover";
import { css, keyframes } from "@emotion/react";

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

    let startDelta = Math.min(prevIssue ? issue.pos - prevIssueEndPos : 2, 2);
    let issueStartPos = issue.pos - startDelta;

    let endDelta = Math.min(nextIssue ? nextIssue.pos - issue.pos : 2, 2);
    let issueEndPos = issue.pos + endDelta;

    let textLeft: string = text.substring(issueStartPos, issue.pos);
    const trimmedLeft = textLeft.replace(/\n/g, "");
    if (trimmedLeft !== textLeft) {
      issueStartPos =
        issue.pos - (textLeft.length - (startDelta - trimmedLeft.length));
      textLeft = trimmedLeft;
    }

    let textRight: string =
      issueEndPos <= issue.pos + 1
        ? ""
        : text.substring(issue.pos + 1, issueEndPos + 1);
    const trimmedRight = textRight.replace(/\n/g, "");
    if (trimmedRight !== textRight) {
      issueEndPos =
        issue.pos + (textRight.length - (endDelta - trimmedRight.length));
      textRight = trimmedRight;
    }

    // // Cause I suck with off-by-one issues
    // textRight = textRight.substring(1);

    parts.push(
      <S.Text key={`text-${issue.pos}`}>
        {text.substring(prevIssueEndPos + 1, issueStartPos)}
      </S.Text>
    );

    prevIssueEndPos = issueEndPos;

    parts.push(
      <IssueSpan
        key={issue.pos}
        issue={issue}
        textLeft={textLeft}
        textRight={textRight}
      />
    );
  }

  parts.push(<S.Text key="last">{text.substring(prevIssueEndPos)}</S.Text>);

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
      <S.Checkbox
        type="checkbox"
        onChange={(ev) => {
          setDebug(() => ev.target.checked);
        }}
      />
      <S.scroller>{content}</S.scroller>
    </S.Container>
  );
};

export interface IssueSpanProps {
  issue: PossibleIssue;
  textLeft: string;
  textRight: string;
}

export const IssueSpan: React.FC<IssueSpanProps> = (props: IssueSpanProps) => {
  const { issue, textLeft, textRight } = props;

  const isHovering = useHover(issue.ref);

  useEffect(() => {
    issue.refHovering = isHovering;
    issue.hoverChanged();
  }, [isHovering]);

  const [issueRefHovering, setIssueRefHovering] = useState(false);

  useEffect(() => {
    const cb = () => setIssueRefHovering(issue.issueHovering);

    issue.hoverListeners.push(cb);

    return () => {
      issue.hoverListeners = issue.hoverListeners.filter((c) => c !== cb);
    };
  }, []);

  const clickHighlight = useCallback(() => {
    if (!issue.issueRef.current) {
      return;
    }

    issue.issueRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  return (
    <S.Issue
      key={issue.pos}
      ref={issue.ref}
      isHovering={isHovering}
      isFlickering={issueRefHovering}
      onClick={clickHighlight}
    >
      {textLeft + issue.context + textRight}
    </S.Issue>
  );
};

namespace S {
  export const Container = styled(Tile)`
    flex: 1;
    background-color: ${DefaultColors.Container_Active};
    font-size: ${FontSizes.SMALL}px;
    overflow: hidden;
    padding: 0;
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

  export const Issue = styled("span")<{
    isHovering: boolean;
    isFlickering: boolean;
  }>`
    background-color: ${(p) =>
      p.isHovering
        ? DefaultColors.BrightOrange
        : `${DefaultColors.BrightOrange}aa`};
    color: ${DefaultColors.Text_Color};
    border-radius: 5px;
    cursor: pointer;

    animation: ${(p) =>
      p.isFlickering
        ? css`0.5s infinite ${BackgroundColorFlicker(
            DefaultColors.TRANSPARENT,
            DefaultColors.BrightOrange
          )}`
        : null};
  `;

  export const Checkbox = styled("input")`
    position: absolute;
    top: 0;
    left: 0;
  `;
}
