import React, { ReactNode, RefObject } from "react";
import { Test } from "./Definitions";
import styled from "@emotion/styled";
import { DefaultColors } from "../Toolbox";

export interface PossibleIssueOptions {
  pos: number;
  test: Test;
  issue: string;
  fix: string;
  context: string;
}

export enum PossibleIssueEvent {
  HOVER = "hover",
  CLOSE = "close",
}

export type PossibleIssueEventListener = (
  event: PossibleIssueEvent,
  issue: PossibleIssue
) => void;

export class PossibleIssue {
  ref: RefObject<HTMLSpanElement>;
  issueRef: RefObject<HTMLTableRowElement>;
  private listeners: PossibleIssueEventListener[];

  _refHovering: boolean;
  _issueHovering: boolean;

  options: PossibleIssueOptions;

  constructor(options: PossibleIssueOptions) {
    this.options = options;

    this.ref = React.createRef<HTMLSpanElement>();
    this.issueRef = React.createRef<HTMLTableRowElement>();

    this._refHovering = false;
    this._issueHovering = false;

    this.listeners = [];

    // console.log(
    //   `Found [${this.formatDisplayText(
    //     options.issue
    //   )}] but expected [${this.formatDisplayText(options.fix)}]`
    // );
  }

  private hoverChanged() {
    this.sendEvent(PossibleIssueEvent.HOVER);
  }

  private sendEvent(event: PossibleIssueEvent) {
    this.listeners.forEach((cb) => cb(event, this));
  }

  private formatDisplayText(text: string): string {
    return text.replace(/\n/g, " ");
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

  get color(): string {
    return this.test.color;
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

  get description(): ReactNode {
    return (
      <S.Description>
        {"Found "}
        <S.DescriptionHighlight color={this.color}>
          {this.formatDisplayText(this.issue)}
        </S.DescriptionHighlight>
        {" but expected "}
        <S.DescriptionHighlight color={this.color}>
          {this.formatDisplayText(this.fix)}
        </S.DescriptionHighlight>
      </S.Description>
    );
  }

  get active() {
    return this.refHovering || this.issueHovering;
  }

  addListener(cb: PossibleIssueEventListener): () => void {
    this.listeners.push(cb);

    return () => (this.listeners = this.listeners.filter((l) => l !== cb));
  }

  destroy() {
    this.sendEvent(PossibleIssueEvent.CLOSE);
    this.listeners = [];
    (this.ref as any) = null;
    (this.issueRef as any) = null;
  }
}

namespace S {
  export const Description = styled("span")`
    color: ${DefaultColors.OffWhite};
  `;

  export const DescriptionHighlight = styled("span")<{ color: string }>`
    color: ${DefaultColors.Text_Color};
    border-radius: 5px;
    background-color: ${(p) => p.color};
  `;
}
