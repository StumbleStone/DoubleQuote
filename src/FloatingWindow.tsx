import { createRoot } from "react-dom/client";
import styled from "@emotion/styled";
import React, { ReactNode } from "react";
import { DefaultColors, DefaultStyles, FontSizes } from "./Toolbox";
import { Backdrop } from "./Backdrop";
import { Tile } from "./Tile";

export interface FloatingWindowProps {
  children?: ReactNode;
  className?: string;
  close: () => void;
  withBackdrop?: boolean;
}

export const FloatingWindow: React.FC<FloatingWindowProps> = (
  props: FloatingWindowProps
) => {
  const { children, className, close, withBackdrop = true } = props;

  const content = <S.Container className={className}>{children}</S.Container>;

  if (!withBackdrop) {
    return content;
  }

  return <S.StyledBackdrop onClose={close}>{content}</S.StyledBackdrop>;
};

namespace S {
  export const Container = styled(Tile)`
    pointer-events: all;

    display: flex;
  `;

  export const StyledBackdrop = styled(Backdrop)`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
}
