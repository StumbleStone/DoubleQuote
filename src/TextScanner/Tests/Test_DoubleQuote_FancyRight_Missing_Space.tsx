import {
  DefaultColors,
  WhitespaceRegex,
  NotWhitespaceRegex,
} from "../../Toolbox";
import {
  CharSymbols,
  Test,
  TestExecEvent,
  TestFailedResult,
} from "../Definitions";

function exec(
  event: TestExecEvent,
  symbol: CharSymbols,
  extraCheck?: (event: TestExecEvent) => boolean
): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;

  if (contextLeft[contextLeft.length - 1] !== symbol) {
    return true;
  }

  if (extraCheck?.(event)) {
    return true;
  }

  if (!char || WhitespaceRegex.test(char)) {
    return true;
  }

  return {
    expected:
      contextLeft +
      " " +
      char +
      contextRight.substring(0, contextRight.length - 1),
    found: contextLeft + char + contextRight,
  };
}

export const Test_DoubleQuote_FancyRight_Missing_Space: Test = {
  name: "Fancy Right Double Quote Missing Space Test",
  exec: (event: TestExecEvent): true | TestFailedResult =>
    exec(event, CharSymbols.DOUBLE_QUOTE_FANCY_RIGHT),
  color: DefaultColors.Purple,
};

function checkIfEndOfDialog(event: TestExecEvent): boolean {
  const prevChar = event.contextLeft[event.contextLeft.length - 1];
  const prevPrevChar = event.contextLeft[event.contextLeft.length - 2];

  if (prevChar !== CharSymbols.DOUBLE_QUOTE) {
    return true;
  }

  if (NotWhitespaceRegex.test(prevPrevChar)) {
    return false;
  }

  return true;
}

export const Test_DoubleQuote_Missing_Space: Test = {
  name: "Double Quote Missing Space Test",
  exec: (event: TestExecEvent): true | TestFailedResult =>
    exec(event, CharSymbols.DOUBLE_QUOTE, checkIfEndOfDialog),
  color: DefaultColors.Purple,
};
