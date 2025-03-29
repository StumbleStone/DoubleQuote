import {
  CharSymbols,
  Test,
  TestExecEvent,
  TestFailedResult,
} from "../Definitions";
import {
  DefaultColors,
  NotWhitespaceRegex,
  WhitespaceRegex,
} from "../../Toolbox";

function exec(event: TestExecEvent): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;

  if (
    char === CharSymbols.DOUBLE_QUOTE &&
    WhitespaceRegex.test(contextLeft[1]) &&
    NotWhitespaceRegex.test(contextRight[0])
  ) {
    return {
      expected:
        contextLeft + CharSymbols.DOUBLE_QUOTE_FANCY_LEFT + contextRight,
      found: contextLeft + char + contextRight,
    };
  }

  return true;
}

export const Test_DoubleQuote_FancyLeft: Test = {
  name: "Fancy Left Double Quote Test",
  exec: exec,
  color: DefaultColors.Orange,
};
