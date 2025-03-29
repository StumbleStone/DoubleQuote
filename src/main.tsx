import { createRoot } from "react-dom/client";
import styled from "@emotion/styled";
import React from "react";

function createMain() {
  const root = createRoot(document.getElementById("app")!);
  root.render(<MainPage />);
}

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
  return <S.Page>REEEE</S.Page>;
};

namespace S {
  export const Page = styled("div")``;
}

createMain();

console.log("Main loaded");
