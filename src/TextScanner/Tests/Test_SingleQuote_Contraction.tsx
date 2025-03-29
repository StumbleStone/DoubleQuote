import {
  DefaultColors,
  SpecialCharRegex,
  WhitespaceRegex,
} from "../../Toolbox";
import {
  CharSymbols,
  Test,
  TestExecEvent,
  TestFailedResult,
} from "../Definitions";

const contractionSuffix: string[] = ["s", "re", "m", "ll", "ve", "t"];
const longestSuffix: number = Math.max(
  ...contractionSuffix.map((s) => s.length)
);

function exec(
  event: TestExecEvent,
  charCheck: (char: string) => boolean,
  aimChar: string
): true | TestFailedResult {
  const { char, contextLeft, contextRight } = event;

  if (charCheck(char)) {
    return true;
  }

  const possibleSuffix: string = event.contextRight.substring(0, longestSuffix);
  let isContraction = false;
  let suffix: string | null = null;

  for (let suf of contractionSuffix) {
    if (possibleSuffix.startsWith(suf)) {
      isContraction = true;
      suffix = suf;
      break;
    }
  }

  if (!isContraction) {
    return true;
  }

  const charAfterSuffix = contextRight[suffix!.length];

  if (
    !!charAfterSuffix &&
    !WhitespaceRegex.test(charAfterSuffix) &&
    !SpecialCharRegex.test(charAfterSuffix)
  ) {
    return true;
  }

  return {
    expected: contextLeft + aimChar + contextRight,
    found: contextLeft + char + contextRight,
  };
}

function singleQuoteCheck(char: string): boolean {
  return (
    char !== CharSymbols.SINGLE_QUOTE_FANCY_LEFT &&
    char !== CharSymbols.SINGLE_QUOTE
  );
}

function singleQuoteFancyCheck(char: string): boolean {
  return (
    char !== CharSymbols.SINGLE_QUOTE_FANCY_LEFT &&
    char !== CharSymbols.SINGLE_QUOTE_FANCY_RIGHT
  );
}

export const Test_SingleQuote_Contraction: Test = {
  name: "Single Quote Contraction Test",
  exec: (event: TestExecEvent): true | TestFailedResult =>
    exec(event, singleQuoteFancyCheck, CharSymbols.SINGLE_QUOTE),
  color: DefaultColors.Cyan,
};

export const Test_SingleQuote_Fancy_Contraction: Test = {
  name: "Single Fancy Quote Contraction Test",
  exec: (event: TestExecEvent): true | TestFailedResult =>
    exec(event, singleQuoteCheck, CharSymbols.SINGLE_QUOTE_FANCY_RIGHT),
  color: DefaultColors.Cyan,
};
