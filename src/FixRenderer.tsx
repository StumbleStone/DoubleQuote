import styled from "@emotion/styled";
import React from "react";
import { Tile } from "./Components/Tile";
import { IssueWidget } from "./TextScanner/IssueWidget";
import { PossibleIssue } from "./TextScanner/PossibleIssue";
import { DefaultColors, FontSizes } from "./Toolbox";

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
      <S.Empty>Possible Issues [{issues.length}]</S.Empty>
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
    display: flex;
    flex-direction: column;
  `;

  export const scroller = styled("div")`
    flex: 1;
    width: 100%;
    overflow: scroll;
    padding: 0px 0px 15px;
  `;

  export const Table = styled("table")`
    color: ${DefaultColors.Text_Color};
    margin-right: 5px;
    margin-left: 5px;

    border-collapse: separate;
    border-spacing: 0 4px;
  `;

  export const Empty = styled("div")`
    font-size: ${FontSizes.SMALL};
    color: ${DefaultColors.OffWhite};
    text-align: center;
    width: 100%;
    padding: 5px 5px;
  `;
}
