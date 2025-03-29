import { createRoot } from "react-dom/client";
import styled from "@emotion/styled";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DefaultColors, DefaultStyles, FontSizes } from "./Toolbox";
import { FloatingWindow } from "./FloatingWindow";
import { Heading } from "./Heading";
import { Button, ButtonContainer } from "./Button";

export interface TextInputProps {
  className?: string;
  close: () => void;
  setText: (text: string) => void;
  startingText: string;
}

export const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  const { className, close, setText, startingText } = props;

  const ref = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    if (!ref.current) {
      return;
    }

    setText(ref.current.value);
  }, [setText, ref]);

  return (
    <FloatingWindow close={close} className={className}>
      <S.Container>
        <Heading text="Paste text here!" />
        <TextArea
          focusOnMount={true}
          forwardRef={ref}
          startingValue={startingText}
        />
        <ButtonContainer>
          <Button onClick={handleSubmit}>Scan for Issues!</Button>
        </ButtonContainer>
      </S.Container>
    </FloatingWindow>
  );
};

export interface TextAreaProps {
  focusOnMount?: boolean;
  forwardRef?: RefObject<HTMLTextAreaElement>;
  startingValue?: string;
}

const TextArea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
  const { focusOnMount = false, startingValue, forwardRef } = props;
  const ref = forwardRef ?? useRef<HTMLTextAreaElement>(null);

  const [value, setValue] = useState(startingValue);

  useEffect(() => {
    setValue(startingValue);
  }, [startingValue]);

  useEffect(() => {
    if (!focusOnMount || !ref.current) {
      return;
    }

    ref.current.focus();
  }, [ref]);

  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(ev.target.value);
    },
    [ref]
  );

  return <S.TextArea ref={ref} value={value} onChange={handleChange} />;
};

namespace S {
  export const Container = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

  export const TextArea = styled("textarea")`
    outline: transparent;
    padding: 10px;
    white-space: break-spaces;
    font-size: ${FontSizes.NORMAL}px;
    user-select: text;
    overflow: hidden;
    color: ${DefaultColors.Text_Color};
    border-radius: ${DefaultStyles.BORDER_RADIUS}px;
    background-color: ${DefaultColors.Container_Active};
    border: 2px solid ${DefaultColors.OffWhite};

    width: 60vw;
    height: 60vh;

    :active,
    :focus,
    :hover {
      border-color: ${DefaultColors.BrightOrange};
    }
  `;
}
