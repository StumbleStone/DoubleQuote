import React from "react";
import { PossibleIssue, Test, TestExecEvent } from "./Definitions";
import { Test_DoubleQuote } from "./Tests/Test_DoubleQuote";
import { Test_DoubleQuote_FancyLeft } from "./Tests/Test_DoubleQuote_FancyLeft";
import { Test_DoubleQuote_FancyRight } from "./Tests/Test_DoubleQuote_FancyRight";
import { Test_SingleQuote } from "./Tests/Test_SingleQuote";
import { Test_SingleQuote_FancyLeft } from "./Tests/Test_SingleQuote_FancyLeft";
import { Test_SingleQuote_FancyRight } from "./Tests/Test_SingleQuote_FancyRight";

export class TextScanner {
  tests: Test[];
  testsEnabled: Test[];

  possibleIssues: PossibleIssue[];

  constructor() {
    this.tests = [
      // Test_SingleQuote,
      // Test_DoubleQuote,
      Test_SingleQuote_FancyLeft,
      Test_SingleQuote_FancyRight,
      Test_DoubleQuote_FancyLeft,
      Test_DoubleQuote_FancyRight,
    ];

    this.testsEnabled = this.tests;
    this.possibleIssues = [];
  }

  run(text: string) {
    const len = text.length;
    console.log("Scanning Text!");
    this.possibleIssues.forEach((i) => (i.hoverListeners = []));
    this.possibleIssues = [];

    for (let i = 0; i < len; i++) {
      const event: TestExecEvent = {
        char: text[i],
        contextLeft: text.substring(i - 2, i),
        contextRight: text.substring(i + 1, i + 3),
        pos: i,
      };

      this.testsEnabled.forEach((t) => {
        const res = t.exec(event);
        if (res === true) {
          return;
        }

        console.log(
          `Found [${formatDisplayText(
            res.found
          )}] but expected [${formatDisplayText(res.expected)}]  ${t.name}`
        );

        const item: PossibleIssue = {
          // posStart: i - 2,
          // posEnd: i + 2,
          pos: i,
          test: t,
          context: event.char,
          issue: formatDisplayText(res.found),
          fix: formatDisplayText(res.expected),
          ref: React.createRef<HTMLSpanElement>(),
          refHovering: false,
          issueRef: React.createRef<HTMLTableRowElement>(),
          issueHovering: false,
          hoverListeners: [],
          hoverChanged: () => item.hoverListeners.forEach((cb) => cb()),
        };

        this.possibleIssues.push(item);
      });
    }
  }
}

function formatDisplayText(text: string): string {
  return text.replace(/\n/g, " ");
}
