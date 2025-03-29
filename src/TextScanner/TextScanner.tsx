import React from "react";
import { Test, TestExecEvent } from "./Definitions";
import { Test_DoubleQuote } from "./Tests/Test_DoubleQuote";
import { Test_DoubleQuote_FancyLeft } from "./Tests/Test_DoubleQuote_FancyLeft";
import { Test_DoubleQuote_FancyRight } from "./Tests/Test_DoubleQuote_FancyRight";
import { Test_SingleQuote } from "./Tests/Test_SingleQuote";
import { Test_SingleQuote_FancyLeft } from "./Tests/Test_SingleQuote_FancyLeft";
import { Test_SingleQuote_FancyRight } from "./Tests/Test_SingleQuote_FancyRight";
import { PossibleIssue } from "./PossibleIssue";

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
    this.possibleIssues.forEach((i) => i.destroy());
    this.possibleIssues = [];

    for (let i = 0; i < len; i++) {
      const event: TestExecEvent = {
        char: text[i],
        contextLeft: text.substring(i - 3, i),
        contextRight: text.substring(i + 1, i + 4),
        pos: i,
      };

      this.testsEnabled.forEach((t) => {
        const res = t.exec(event);
        if (res === true) {
          return;
        }

        this.possibleIssues.push(
          new PossibleIssue({
            pos: i,
            test: t,
            context: event.char,
            issue: res.found,
            fix: res.expected,
          })
        );
      });
    }
  }
}
