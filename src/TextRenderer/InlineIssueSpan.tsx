import { css } from "@emotion/react";
import { BackgroundColorFlicker, DefaultColors } from "../Toolbox";
import styled from "@emotion/styled";
import {
  PossibleIssue,
  PossibleIssueEvent,
} from "../TextScanner/PossibleIssue";
import { useHover } from "../Hooks/useHover";
import React, { useCallback, useEffect, useState } from "react";

export interface IssueSpanProps {
  issue: PossibleIssue;
  textLeft: string;
  textRight: string;
}

export const InlineIssueSpan: React.FC<IssueSpanProps> = (
  props: IssueSpanProps
) => {
  const { issue, textLeft, textRight } = props;

  const isHovering = useHover(issue.ref);

  useEffect(() => {
    issue.refHovering = isHovering;
  }, [isHovering]);

  const [issueRefHovering, setIssueRefHovering] = useState(false);

  useEffect(() => {
    const l = issue.addListener((event: PossibleIssueEvent) => {
      switch (event) {
        case PossibleIssueEvent.HOVER: {
          setIssueRefHovering(issue.issueHovering);
          break;
        }
        case PossibleIssueEvent.CLOSE: {
          l();
          break;
        }
      }
    });

    return () => l();
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
      color={issue.color}
      isHovering={isHovering}
      isFlickering={issueRefHovering}
      onClick={clickHighlight}
    >
      {textLeft + issue.context + textRight}
    </S.Issue>
  );
};

namespace S {
  export const Issue = styled("span")<{
    isHovering: boolean;
    isFlickering: boolean;
    color: string;
  }>`
    background-color: ${(p) => (p.isHovering ? p.color : `${p.color}aa`)};
    color: ${DefaultColors.Text_Color};
    border-radius: 5px;
    cursor: pointer;

    animation: ${(p) =>
      p.isFlickering
        ? css`0.5s infinite ${BackgroundColorFlicker(
            DefaultColors.TRANSPARENT,
            p.color
          )}`
        : null};
  `;
}
