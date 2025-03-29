import { createRoot } from "react-dom/client";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import {
  BackgroundColorFlicker,
  BoxShadowFlicker,
  DefaultColors,
  FontSizes,
} from "../Toolbox";
import { PossibleIssue } from "./Definitions";
import { useHover } from "../Hooks/useHover";
import { css } from "@emotion/react";

export interface IssueWidgetProps {
  issue: PossibleIssue;
  className?: string;
}

export const IssueWidget: React.FC<IssueWidgetProps> = (
  props: IssueWidgetProps
) => {
  const { issue, className } = props;

  const clickHighlight = useCallback(() => {
    if (!issue.ref.current) {
      return;
    }

    issue.ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  const isHovering = useHover(issue.issueRef);

  useEffect(() => {
    issue.issueHovering = isHovering;
    issue.hoverChanged();
  }, [isHovering]);

  const [refHovering, setRefHovering] = useState(false);

  useEffect(() => {
    const cb = () => setRefHovering(issue.refHovering);

    issue.hoverListeners.push(cb);

    return () => {
      issue.hoverListeners = issue.hoverListeners.filter((c) => c !== cb);
    };
  }, []);

  return (
    <S.Row
      className={className}
      onClick={clickHighlight}
      ref={issue.issueRef}
      isHovering={isHovering}
      isFlickering={refHovering}
    >
      <S.Pos>{issue.pos}</S.Pos>
      <S.Issue>
        <S.Text>{issue.issue}</S.Text>
      </S.Issue>
      <S.Arrow>{"→"}</S.Arrow>
      <S.Fix>
        <S.Text>{issue.fix}</S.Text>
      </S.Fix>
    </S.Row>
  );
};

namespace S {
  export const Row = styled("tr")<{
    isHovering: boolean;
    isFlickering: boolean;
  }>`
    font-size: ${FontSizes.MINI}px;
    white-space: pre;

    :nth-of-type(odd) {
      background-color: ${DefaultColors.Orange}${(p) => (p.isHovering ? "cc" : "aa")};

      animation: ${(p) =>
        p.isFlickering
          ? css`0.5s infinite ${BackgroundColorFlicker(
              DefaultColors.TRANSPARENT,
              DefaultColors.Orange
            )}`
          : null};
    }

    :nth-of-type(even) {
      background-color: ${DefaultColors.BrightOrange}${(p) => (p.isHovering ? "cc" : "aa")};

      animation: ${(p) =>
        p.isFlickering
          ? css`0.5s infinite ${BackgroundColorFlicker(
              DefaultColors.TRANSPARENT,
              DefaultColors.BrightOrange
            )}`
          : null};
    }

    cursor: pointer;
  `;

  export const Pos = styled("td")`
    text-align: right;
    padding-right: 10px;
    padding-left: 10px;
    color: ${DefaultColors.OffWhite};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  `;

  export const TextCell = styled("td")``;

  export const Text = styled("div")`
    padding-right: 5px;
    padding-left: 5px;
    background-color: ${DefaultColors.Container};
    border-radius: 10px;
  `;

  export const Issue = styled(TextCell)`
    color: ${DefaultColors.BrightRed};
  `;

  export const Fix = styled(TextCell)`
    color: ${DefaultColors.BrightGreen};
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding-right: 10px;
  `;

  export const Arrow = styled("td")`
    padding-right: 1px;
    padding-left: 1px;
    color: ${DefaultColors.OffWhite};
  `;
}
