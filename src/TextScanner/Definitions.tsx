import { RefObject } from "react";

export enum CharSymbols {
  SINGLE_QUOTE = "'",
  SINGLE_QUOTE_FANCY_LEFT = "‘",
  SINGLE_QUOTE_FANCY_RIGHT = "’",

  DOUBLE_QUOTE = '"',
  DOUBLE_QUOTE_FANCY_LEFT = "“",
  DOUBLE_QUOTE_FANCY_RIGHT = "”",
}

export interface TestExecEvent {
  char: string;
  contextLeft: string;
  contextRight: string;
  pos: number;
}

export interface TestFailedResult {
  expected: string;
  found: string;
}

export interface Test {
  name: string;
  exec: (event: TestExecEvent) => true | TestFailedResult;
}

// This is far past the point where it should be a class
export interface PossibleIssue {
  pos: number;
  test: Test;
  issue: string;
  fix: string;
  context: string;
  ref: RefObject<HTMLSpanElement>;
  issueRef: RefObject<HTMLTableRowElement>;
  hoverListeners: (() => void)[];
  refHovering: boolean;
  issueHovering: boolean;
  hoverChanged: () => void;
}
