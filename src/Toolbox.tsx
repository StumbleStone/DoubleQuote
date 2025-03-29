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

export function GenerateId(): string {
  return Math.round(Math.random() * 99999999999).toString(16);
}
