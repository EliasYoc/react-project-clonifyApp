import { useRef } from "react";

export const useElementPosition = () => {
  const refElement = useRef();
  const getPosition = (aditionalPropsObj) => {
    const { x, y } = refElement.current.getBoundingClientRect();
    const position = {
      x,
      y,
      width: refElement.current.offsetHeight,
      height: refElement.current.offsetWidth,
    };
    if (aditionalPropsObj) {
      for (const prop in aditionalPropsObj) {
        position[prop] = aditionalPropsObj[prop];
      }
    }
    return position;
  };
  return {
    refElement,
    getPosition,
  };
};
