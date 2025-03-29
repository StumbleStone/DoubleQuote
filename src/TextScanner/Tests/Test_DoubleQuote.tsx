import { DefaultColors } from "../../Toolbox";
import {
  CharSymbols,
  Test,
  TestExecEvent,
  TestFailedResult,
} from "../Definitions";

function exec(event: TestExecEvent): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;

  if (
    char === CharSymbols.DOUBLE_QUOTE_FANCY_LEFT ||
    char === CharSymbols.DOUBLE_QUOTE_FANCY_RIGHT
  ) {
    return {
      expected: contextLeft + CharSymbols.DOUBLE_QUOTE + contextRight,
      found: contextLeft + char + contextRight,
    };
  }

  return true;
}

export const Test_DoubleQuote: Test = {
  name: "Double Quote Test",
  exec: exec,
  color: DefaultColors.Orange,
};
