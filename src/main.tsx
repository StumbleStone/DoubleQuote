import { createRoot } from "react-dom/client";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { DefaultColors, DefaultStyles, FontSizes } from "./Toolbox";
import { Title } from "./Title";
import { Button, ButtonContainer } from "./Button";
import { TextInput } from "./TextInput";
import { Tile } from "./Tile";
import { TextRenderer } from "./TextRenderer";
import { FixRenderer, FixRendererProps } from "./FixRenderer";
import { debug_text } from "./debugText";
import { TextScanner } from "./TextScanner/TextScanner";
import { PossibleIssue } from "./TextScanner/Definitions";

function createMain() {
  const root = createRoot(document.getElementById("app")!);
  root.render(<MainPage />);
}

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
  const [showTextInput, setShowTextInput] = useState<boolean>(false);

  const [text, setText] = useState<string>(debug_text);

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
      {text.length > 0 && (
        <S.TextRenderContainer>
          <TextRenderer issues={issues} text={text} />
          <FixRenderer issues={issues} />
        </S.TextRenderContainer>
      )}
      <S.StyledButtonContainer>
        {!showTextInput && (
          <Button onClick={() => setShowTextInput(() => true)}>
            {text.length > 0 ? "Edit Text" : "Start Here!"}
          </Button>
        )}
        {showTextInput && (
          <TextInput
            close={() => setShowTextInput(() => false)}
            startingText={text}
            setText={handleSetText}
          />
        )}
      </S.StyledButtonContainer>
    </S.Page>
  );
};

namespace S {
  export const Page = styled(Tile)`
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    margin: 20px;
    font-size: ${FontSizes.NORMAL}px;
    display: flex;
    flex-direction: column;
    padding: 15px 0px;
  `;

  export const StyledButtonContainer = styled(ButtonContainer)`
    padding: 0px 15px;
  `;

  export const TextRenderContainer = styled("div")`
    flex: 1;
    display: flex;
    gap: 10px;
    overflow-y: hidden;
    padding: 15px 15px;
  `;
}

createMain();

console.log("Main loaded");
