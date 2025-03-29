import styled from "@emotion/styled";
import React from "react";
import { FontSizes } from "../Toolbox";

export interface HeadingProps {
  text: string;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = (props: HeadingProps) => {
  const { text, className } = props;
  return <S.Container className={className}>{text}</S.Container>;
};

namespace S {
  export const Container = styled("div")`
    font-size: ${FontSizes.HEADING}px;
    text-align: center;
  `;
}
