import {
  DefaultColors,
  NotWhitespaceRegex,
  WhitespaceRegex,
} from "../../Toolbox";
import {
  CharSymbols,
  Test,
  TestExecEvent,
  TestFailedResult,
} from "../Definitions";

function exec(event: TestExecEvent): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;

  if (
    char === CharSymbols.SINGLE_QUOTE &&
    NotWhitespaceRegex.test(contextLeft[1]) &&
    WhitespaceRegex.test(contextRight[3])
  ) {
    return {
      expected:
        contextLeft + CharSymbols.SINGLE_QUOTE_FANCY_RIGHT + contextRight,
      found: contextLeft + char + contextRight,
    };
  }

  return true;
}

export const Test_SingleQuote_FancyRight: Test = {
  name: "Fancy Right Single Quote Test",
  exec: exec,
  color: DefaultColors.Orange,
};
