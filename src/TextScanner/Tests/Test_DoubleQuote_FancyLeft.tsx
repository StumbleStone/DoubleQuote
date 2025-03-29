import {
  CharSymbols,
  Test,
  TestExecEvent,
  TestFailedResult,
} from "../Definitions";
import {
  DefaultColors,
  NotWhitespaceRegex,
  SpecialCharRegex,
  WhitespaceRegex,
} from "../../Toolbox";

function exec(event: TestExecEvent): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;
  if (char !== CharSymbols.DOUBLE_QUOTE) {
    return true;
  }

  // Left quote either needs to be preceded by whitespace, special characters, or undefined
  if (
    !!contextLeft[contextLeft.length - 1] &&
    !WhitespaceRegex.test(contextLeft[contextLeft.length - 1]) &&
    !SpecialCharRegex.test(contextLeft[contextLeft.length - 1])
  ) {
    return true;
  }

  // To use left quote the following character needs to be non-whitespace
  if (!NotWhitespaceRegex.test(contextRight[0])) {
    return true;
  }

  return {
    expected: contextLeft + CharSymbols.DOUBLE_QUOTE_FANCY_LEFT + contextRight,
    found: contextLeft + char + contextRight,
  };
}

export const Test_DoubleQuote_FancyLeft: Test = {
  name: "Fancy Left Double Quote Test",
  exec: exec,
  color: DefaultColors.Orange,
};
