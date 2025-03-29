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

  // Right quote either needs to be followed by whitespace, special characters, or undefined
  if (
    !!contextRight[0] &&
    !WhitespaceRegex.test(contextRight[0]) &&
    !SpecialCharRegex.test(contextRight[0])
  ) {
    return true;
  }

  // To use right quote the preceding character needs to be non-whitespace
  if (!NotWhitespaceRegex.test(contextLeft[contextLeft.length - 1])) {
    return true;
  }

  return {
    expected: contextLeft + CharSymbols.DOUBLE_QUOTE_FANCY_RIGHT + contextRight,
    found: contextLeft + char + contextRight,
  };
}

export const Test_DoubleQuote_FancyRight: Test = {
  name: "Fancy Right Double Quote Test",
  exec: exec,
  color: DefaultColors.Orange,
};
