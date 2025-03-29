import { Test, TestExecEvent } from "./Definitions";
import { PossibleIssue } from "./PossibleIssue";
import { Test_DoubleQuote } from "./Tests/Test_DoubleQuote";
import { Test_DoubleQuote_FancyLeft } from "./Tests/Test_DoubleQuote_FancyLeft";
import { Test_DoubleQuote_FancyLeft_Missing_Space } from "./Tests/Test_DoubleQuote_FancyLeft_Missing_Space";
import { Test_DoubleQuote_FancyRight } from "./Tests/Test_DoubleQuote_FancyRight";
import {
  Test_DoubleQuote_FancyRight_Missing_Space,
  Test_DoubleQuote_Missing_Space,
} from "./Tests/Test_DoubleQuote_FancyRight_Missing_Space";
import { Test_SingleQuote } from "./Tests/Test_SingleQuote";
import {
  Test_SingleQuote_Contraction,
  Test_SingleQuote_Fancy_Contraction,
} from "./Tests/Test_SingleQuote_Contraction";
import { Test_SingleQuote_FancyLeft } from "./Tests/Test_SingleQuote_FancyLeft";
import { Test_SingleQuote_FancyRight } from "./Tests/Test_SingleQuote_FancyRight";

export class TextScanner {
  tests: Test[];
  testsEnabled: Test[];

  possibleIssues: PossibleIssue[];

  constructor() {
    this.tests = [
      Test_DoubleQuote_FancyRight_Missing_Space,
      Test_DoubleQuote_FancyLeft_Missing_Space,
      Test_DoubleQuote_Missing_Space,
      Test_SingleQuote_Fancy_Contraction,
      Test_SingleQuote_Contraction,

      // Test_SingleQuote,
      Test_SingleQuote_FancyLeft,
      Test_SingleQuote_FancyRight,

      // Test_DoubleQuote,
      Test_DoubleQuote_FancyLeft,
      Test_DoubleQuote_FancyRight,
    ];

    this.testsEnabled = this.tests;
    this.possibleIssues = [];
  }

  run(text: string) {
    const len = text.length;
    console.log("Scanning Text!");
    this.possibleIssues.forEach((i) => i.destroy());
    this.possibleIssues = [];

    const newIssues: PossibleIssue[] = [];

    for (let i = 0; i < len; i++) {
      const event: TestExecEvent = {
        char: text[i],
        contextLeft: text.substring(i - 3, i),
        contextRight: text.substring(i + 1, i + 4),
        pos: i,
      };

      for (let test of this.testsEnabled) {
        const res = test.exec(event);
        if (res === true) {
          continue;
        }

        newIssues.push(
          new PossibleIssue({
            pos: i,
            test: test,
            context: event.char,
            issue: res.found,
            fix: res.expected,
          })
        );

        // To prevent multiple tests for the same position, instead fix and rerun
        break;
      }
    }

    this.possibleIssues = newIssues.sort((a, b) => a.pos - b.pos);
  }
}
