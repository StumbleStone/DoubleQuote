import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, ButtonContainer } from "./Components/Button";
import { Info } from "./TextRenderer/Info";
import { TextInput } from "./Components/TextInput";
import { Tile } from "./Components/Tile";
import { Title } from "./Components/Title";
import { debug_text } from "./debugText";
import { FixRenderer } from "./FixRenderer";
import { TextRenderer } from "./TextRenderer/TextRenderer";
import { TextScanner } from "./TextScanner/TextScanner";
import { DefaultColors, FontSizes } from "./Toolbox";

function createMain() {
  const root = createRoot(document.getElementById("app")!);
  root.render(<MainPage />);
}

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
  const [showTextInput, setShowTextInput] = useState<boolean>(false);

  const [text, setText] = useState<string>("" /*debug_text*/);

  const handleSetText = useCallback((text: string) => {
    setText(text);
    setShowTextInput(() => false);
  }, []);

  const [scanner, _] = useState(() => new TextScanner());
  useEffect(() => {
    scanner.run(text);
    setIssues(scanner.possibleIssues);
  }, [text]);
  const [issues, setIssues] = useState(() => scanner?.possibleIssues);

  return (
    <S.Page>
      <Title text="“DoubleQuote”" />
      <S.Link
        target="_blank"
        href="https://github.com/StumbleStone/DoubleQuote"
      >
        Repo
      </S.Link>
      {text.length > 0 && (
        <S.TextRenderContainer>
          <TextRenderer issues={issues} text={text} />
          <FixRenderer issues={issues} />
        </S.TextRenderContainer>
      )}
      <S.ButtonAndInfoContainer>
        <S.StyledButtonContainer>
          {!showTextInput && (
            <Button onClick={() => setShowTextInput(() => true)}>
              {text.length > 0 ? "Edit Text" : "Start Here!"}
            </Button>
          )}
        </S.StyledButtonContainer>
        <Info issues={issues} />
      </S.ButtonAndInfoContainer>
      {showTextInput && (
        <TextInput
          close={() => setShowTextInput(() => false)}
          startingText={text}
          setText={handleSetText}
        />
      )}
    </S.Page>
  );
};

namespace S {
  export const Page = styled(Tile)`
    position: relative;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    margin: 20px;
    font-size: ${FontSizes.NORMAL}px;
    display: flex;
    flex-direction: column;
    padding: 15px 0px;
  `;

  export const StyledButtonContainer = styled(ButtonContainer)`
    flex: 1;
  `;

  export const ButtonAndInfoContainer = styled("div")`
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  export const TextRenderContainer = styled("div")`
    flex: 1;
    display: flex;
    gap: 10px;
    overflow-y: hidden;
    padding: 15px 15px;
  `;

  export const Link = styled("a")`
    color: ${DefaultColors.BrightCyan};
    font-size: ${FontSizes.MINI};
    padding: 15px 15px;
    position: absolute;
    top: 0;
    left: 0;
  `;
}

createMain();

console.log("Main loaded");
