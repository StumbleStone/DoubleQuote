import { createRoot } from "react-dom/client";
import styled from "@emotion/styled";
import React from "react";
import { DefaultColors, FontSizes } from "./Toolbox";

export interface TitleProps {
  text: string;
  className?: string;
}

export const Title: React.FC<TitleProps> = (props: TitleProps) => {
  const { text, className } = props;
  return <S.Container className={className}>{text}</S.Container>;
};

namespace S {
  export const Container = styled("div")`
    font-size: ${FontSizes.TITLE}px;
    text-align: center;
  `;
}
