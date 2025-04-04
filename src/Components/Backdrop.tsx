import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { DefaultColors, elementIsChildOf } from "../Toolbox";

export interface BackdropProps {
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}

const debounceThreshold = 100;

export const Backdrop: React.FC<BackdropProps> = (props: BackdropProps) => {
  const { className, onClose, children } = props;

  const containerRef = useRef(null);

  const [blocking, setBlocking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBlocking(false);
    }, debounceThreshold);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (blocking) {
      return;
    }

    const handleClick = (ev: MouseEvent) => {
      if (blocking) {
        return;
      }

      if (elementIsChildOf(ev.target as HTMLElement, containerRef.current)) {
        return;
      }

      ev.stopPropagation();
      ev.stopImmediatePropagation();

      setTimeout(() => {
        console.log("Closing");
        onClose?.();
      }, 150);
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [blocking]);

  return (
    <S.Container
      ref={containerRef}
      className={className}
      blockClicks={blocking}
    >
      {children}
    </S.Container>
  );
};

namespace S {
  export const Container = styled("div")<{ blockClicks: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: ${DefaultColors.OffWhite}33;

    pointer-events: ${(p) => (p.blockClicks ? "all" : "none")};
  `;
}
