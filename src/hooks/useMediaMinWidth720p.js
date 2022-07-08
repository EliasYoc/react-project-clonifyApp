import { useEffect, useState } from "react";

const useMediaMinWidth720p = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  let mediaQuery = window.matchMedia("(min-width: 720px)");
  useEffect(() => {
    const showOrHideOptions = () =>
      mediaQuery.matches ? setIsDesktop(true) : setIsDesktop(false);

    showOrHideOptions();
    mediaQuery.addEventListener("change", showOrHideOptions);
    return () => mediaQuery.removeEventListener("change", showOrHideOptions);
  }, [mediaQuery]);
  return isDesktop;
};

export default useMediaMinWidth720p;
