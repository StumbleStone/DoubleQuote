import styled from "@emotion/styled";
import { DefaultColors, DefaultStyles } from "../Toolbox";
export const Tile = styled("div")`
  background-color: ${DefaultColors.Container};
  border-radius: ${DefaultStyles.BORDER_RADIUS}px;
  padding: 15px;
  border: 2px solid ${DefaultColors.Background};
  box-shadow: 5px 5px 5px ${DefaultColors.Black};
  color: ${DefaultColors.Text_Color};
  user-select: none;
`;
