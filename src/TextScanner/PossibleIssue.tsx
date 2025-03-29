import React, { RefObject } from "react";
import { Test } from "./Definitions";

export interface PossibleIssueOptions {
  pos: number;
  test: Test;
  issue: string;
  fix: string;
  context: string;
}

export class PossibleIssue {
  ref: RefObject<HTMLSpanElement>;
  issueRef: RefObject<HTMLTableRowElement>;
  hoverListeners: (() => void)[];

  _refHovering: boolean;
  _issueHovering: boolean;

  options: PossibleIssueOptions;

  constructor(options: PossibleIssueOptions) {
    this.options = options;

    this.ref = React.createRef<HTMLSpanElement>();
    this.issueRef = React.createRef<HTMLTableRowElement>();

    this._refHovering = false;
    this._issueHovering = false;

    this.hoverListeners = [];

    console.log(
      `Found [${this.formatDisplayText(
        options.issue
      )}] but expected [${this.formatDisplayText(options.fix)}]  ${
        options.test.name
      }`
    );
  }

  private hoverChanged() {
    this.hoverListeners.forEach((cb) => cb());
  }

  private formatDisplayText(text: string): string {
    return text.replace(/\n/g, " ");
  }

  destroy() {
    this.hoverListeners = [];
    (this.ref as any) = null;
    (this.issueRef as any) = null;
  }

  get pos(): number {
    return this.options.pos;
  }
  get test(): Test {
    return this.options.test;
  }
  get issue(): string {
    return this.formatDisplayText(this.options.issue);
  }
  get fix(): string {
    return this.formatDisplayText(this.options.fix);
  }
  get context(): string {
    return this.options.context;
  }

  get refHovering(): boolean {
    return this._refHovering;
  }

  set refHovering(newState: boolean) {
    if (this._refHovering === newState) {
      return;
    }

    this._refHovering = newState;
    this.hoverChanged();
  }

  get issueHovering(): boolean {
    return this._issueHovering;
  }

  set issueHovering(newState: boolean) {
    if (this._issueHovering === newState) {
      return;
    }

    this._issueHovering = newState;
    this.hoverChanged();
  }
}
