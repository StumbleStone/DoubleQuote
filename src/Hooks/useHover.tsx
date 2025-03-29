import React, { useEffect } from "react";

export function useHover(ref: React.RefObject<HTMLElement>) {
  const [isHovering, setIsHovering] = React.useState(false);

  useEffect(() => {
    const cbEnter = () => setIsHovering(true);
    const cbLeave = () => setIsHovering(false);

    if (ref?.current) {
      ref.current.addEventListener("mouseenter", cbEnter);
      ref.current.addEventListener("mouseleave", cbLeave);
    }

    return () => {
      if (ref?.current) {
        ref.current.removeEventListener("mouseenter", cbEnter);
        ref.current.removeEventListener("mouseleave", cbLeave);
      }
    };
  }, [ref, ref?.current]);

  return isHovering;
}
