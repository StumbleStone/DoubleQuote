import {
  CharSymbols,
  Test,
  TestExecEvent,
  TestFailedResult,
} from "../Definitions";

function exec(event: TestExecEvent): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;

  if (
    char === CharSymbols.SINGLE_QUOTE_FANCY_LEFT ||
    char === CharSymbols.SINGLE_QUOTE_FANCY_RIGHT
  ) {
    return {
      expected: contextLeft + CharSymbols.SINGLE_QUOTE + contextRight,
      found: contextLeft + char + contextRight,
    };
  }

  return true;
}

export const Test_SingleQuote: Test = {
  name: "Single Quote Test",
  exec: exec,
};
