import {
  CharSymbols,
  Test,
  TestExecEvent,
  TestFailedResult,
} from "../Definitions";
import { NotWhitespaceRegex, WhitespaceRegex } from "../../Toolbox";

function exec(event: TestExecEvent): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;

  if (
    char === CharSymbols.DOUBLE_QUOTE &&
    NotWhitespaceRegex.test(contextLeft[1]) &&
    WhitespaceRegex.test(contextRight[0])
  ) {
    return {
      expected:
        contextLeft + CharSymbols.DOUBLE_QUOTE_FANCY_RIGHT + contextRight,
      found: contextLeft + char + contextRight,
    };
  }

  return true;
}

export const Test_DoubleQuote_FancyRight: Test = {
  name: "Fancy Right Double Quote Test",
  exec: exec,
};
