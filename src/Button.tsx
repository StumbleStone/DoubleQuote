import styled from "@emotion/styled";
import { DefaultColors, DefaultStyles } from "./Toolbox";

export const Button = styled("div")`
  border: 2px solid ${DefaultColors.OffWhite};
  padding: 4px 8px;
  border-radius: ${DefaultStyles.BORDER_RADIUS}px;
  background-color: ${DefaultColors.Container};
  user-select: none;

  cursor: pointer;

  :active,
  :hover {
    color: ${DefaultColors.BrightOrange};
    border-color: ${DefaultColors.BrightOrange};
  }
`;

export const ButtonContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  user-select: none;
`;
