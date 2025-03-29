import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {
  PossibleIssue,
  PossibleIssueEvent,
} from "../TextScanner/PossibleIssue";
import { FontSizes } from "../Toolbox";

export interface InfoProps {
  issues: PossibleIssue[];
  className?: string;
}

export const Info: React.FC<InfoProps> = (props: InfoProps) => {
  const { className, issues } = props;

  const [activeIssue, setActiveIssue] = useState<PossibleIssue | null>(
    () => issues.find((i) => i.active) ?? null
  );

  useEffect(() => {
    const listeners: (() => void)[] = [];

    issues.forEach((i) => {
      const cb = (event: PossibleIssueEvent, issue: PossibleIssue) => {
        switch (event) {
          case PossibleIssueEvent.HOVER: {
            setActiveIssue((prevActiveIssue: PossibleIssue | null) => {
              if (!issue.active && prevActiveIssue?.id === issue.id) {
                return null;
              }

              if (issue.active) {
                return issue;
              }

              return prevActiveIssue;
            });

            break;
          }
          case PossibleIssueEvent.CLOSE: {
            l();
            break;
          }
        }
      };

      const l = i.addListener(cb);

      listeners.push(l);
    });

    return () => listeners.forEach((l) => l());
  }, [issues]);

  if (!activeIssue) {
    return null;
  }

  return (
    <S.Container className={className}>{activeIssue.description}</S.Container>
  );
};

namespace S {
  export const Container = styled("div")`
    font-size: ${FontSizes.NORMAL}px;
    text-align: center;
  `;
}
