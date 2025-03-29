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
  symbol: CharSymbols
): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;

  if (contextRight[0] !== symbol) {
    return true;
  }

  if (!char || WhitespaceRegex.test(char)) {
    return true;
  }

  return {
    expected:
      contextLeft +
      char +
      " " +
      contextRight.substring(0, contextRight.length - 1),
    found: contextLeft + char + contextRight,
  };
}

export const Test_DoubleQuote_FancyLeft_Missing_Space: Test = {
  name: "Fancy Left Double Quote Missing Space Test",
  exec: (event: TestExecEvent): true | TestFailedResult =>
    exec(event, CharSymbols.DOUBLE_QUOTE_FANCY_LEFT),
  color: DefaultColors.Purple,
};
