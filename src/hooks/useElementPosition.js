import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export const useElementPosition = (element) => {
  const refElement = useRef();
  const [position, setPosition] = useState({});
  useEffect(() => {
    const getPosition = () => {
      const { x, y } = refElement.current?.getBoundingClientRect() ?? {
        x: undefined,
        y: undefined,
      };
      const { x: elementX, y: elementY } = element?.getBoundingClientRect() ?? {
        x: undefined,
        y: undefined,
      };
      const position = {
        x,
        y,
        width: refElement.current?.offsetHeight,
        height: refElement.current?.offsetWidth,
        elementX,
        elementY,
        elementWidth: element?.offsetHeight,
        elementHeight: element?.offsetWidth,
      };

      return position;
    };
    setPosition(getPosition());
  }, [element]);
  return {
    refElement,
    position,
  };
};
