import {
  CharSymbols,
  NotWhitespaceRegex,
  Test,
  TestExecEvent,
  TestFailedResult,
  WhitespaceRegex,
} from "../Definitions";

function exec(event: TestExecEvent): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;

  if (
    char === CharSymbols.SINGLE_QUOTE &&
    WhitespaceRegex.test(contextLeft[1]) &&
    NotWhitespaceRegex.test(contextRight[0])
  ) {
    return {
      expected:
        contextLeft + CharSymbols.SINGLE_QUOTE_FANCY_LEFT + contextRight,
      found: contextLeft + char + contextRight,
    };
  }

  return true;
}

export const Test_SingleQuote_FancyLeft: Test = {
  name: "Fancy Left Single Quote Test",
  exec: exec,
};
