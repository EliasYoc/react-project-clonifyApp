import "./ColorTheme.css";
import { useEffect } from "react";
import { BiPaint } from "react-icons/bi";
import DarkButton from "./components/DarkButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomThemeConfig,
  selectThemes,
  setColorTheme,
} from "../../features/themesSlice";
import ColorBox from "./components/ColorBox";

const ColorTheme = () => {
  const { darkMode, colorTheme } = useSelector(selectThemes);
  const { isCustom } = useSelector(selectCustomThemeConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = `${darkMode} ${colorTheme}`;
    const theme = {
      mode: darkMode,
      color: colorTheme,
    };
    localStorage.setItem("theme-clonify", JSON.stringify(theme));
  }, [darkMode, colorTheme]);

  const handleChange = (e) => {
    dispatch(setColorTheme(e.target.value));
  };
  const openCloseColorBox = () => {
    const $themeBox = document.querySelector(".colorTheme__box");
    $themeBox.classList.toggle("open-box");
  };
  return (
    <div onClick={(e) => e.stopPropagation()} className="colorTheme">
      {!isCustom && <DarkButton darkMode={darkMode} />}
      <button
        onClick={openCloseColorBox}
        aria-label="elegir color"
        className="btn-theme btn-theme--hover-pick"
      >
        <BiPaint />
      </button>
      <ColorBox handleChange={handleChange} />
    </div>
  );
};

export default ColorTheme;
