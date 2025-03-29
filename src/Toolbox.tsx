import { keyframes } from "@emotion/react";

export enum DefaultStyles {
  BORDER_RADIUS = 15,
}

export enum DefaultColors {
  Text_Color = "#f5f4f3",
  OffWhite = "#b6b6b6",
  Background = "#777777",
  Container = "#1C2127",
  Container_Active = "#313840",
  Shadow = "#000000aa",
  Red = "#962240",
  BrightRed = "#ff0015",
  Purple = "#8a2296",
  BrightPurple = "#c231d3",
  Cyan = "#227b96",
  BrightCyan = "#31acd2",
  Green = "#319622",
  Brown = "#965c22",
  BrightGrey = "#999999",
  Grey = "#666666",
  BrightGreen = "#45d030",
  Yellow = "#839622",
  BrightYellow = "#bbd533",
  Blue = "#224396",
  BrightBlue = "#2f5cd0",
  Orange = "#964b22",
  BrightOrange = "#d76d34",
  Black = "#000000",
  TRANSPARENT = "transparent",
}

export enum FontSizes {
  TINY = 10,
  MICRO = 12,
  MINI = 14,
  SMALL = 18,
  NORMAL = 22,
  HEADING = 26,
  TITLE = 30,
}

export function GenerateId(): string {
  return Math.round(Math.random() * 99999999999).toString(16);
}

export function elementIsChildOf(
  childEl: HTMLElement | null,
  parentEl: HTMLElement | Document | null
): boolean {
  if (!childEl || !parentEl) {
    return false;
  }

  if (childEl === parentEl) {
    return true;
  }

  let curParent = childEl.parentElement;
  while (curParent) {
    if (curParent === parentEl) {
      return true;
    }

    curParent = curParent.parentElement;
  }

  return false;
}

export const BoxShadowFlicker = (
  onColor: string,
  offColor: string
) => keyframes`
  0% {
    box-shadow: 0px 0px 2px 2px ${offColor};
  }
  50% {
    box-shadow: 0px 0px 4px 4px ${onColor};
  }
  100% {
    box-shadow: 0px 0px 2px 2px ${offColor};
  }
`;

export const BackgroundColorFlicker = (
  onColor: string,
  offColor: string
) => keyframes`
  0% {
    background-color: ${offColor};
  }
  50% {
    background-color: ${onColor};
  }
  100% {
    background-color: ${offColor};
  }
`;

export const WhitespaceRegex: RegExp = /\s/;
export const NotWhitespaceRegex: RegExp = /[^\s]/;
export const STARTS_WITH_NEWLINE = /^\n+/;
export const ENDS_WITH_NEWLINE = /\n+$/;
