import { createRoot } from "react-dom/client";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { DefaultColors, FontSizes } from "./Toolbox";
import { Tile } from "./Tile";
import { TextScanner } from "./TextScanner/TextScanner";
import { IssueWidget } from "./TextScanner/IssueWidget";
import { PossibleIssue } from "./TextScanner/Definitions";

export interface FixRendererProps {
  issues: PossibleIssue[];
  className?: string;
}

export const FixRenderer: React.FC<FixRendererProps> = (
  props: FixRendererProps
) => {
  const { issues, className } = props;

  return (
    <S.Container className={className}>
      <S.scroller>
        <S.Table>
          <tbody>
            {issues.map((i, idx) => (
              <IssueWidget issue={i} key={idx} />
            ))}
          </tbody>
        </S.Table>
      </S.scroller>
    </S.Container>
  );
};

namespace S {
  export const Container = styled(Tile)`
    background-color: ${DefaultColors.Container_Active};
    overflow: hidden;
    padding: 0;
  `;

  export const scroller = styled("div")`
    height: 100%;
    width: 100%;
    overflow: scroll;
    padding: 15px 0px;
  `;

  export const Table = styled("table")`
    color: ${DefaultColors.Text_Color};
    border-collapse: collapse;
  `;
}
