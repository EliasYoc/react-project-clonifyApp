import "./ColorTheme.css";
import { useEffect, useState } from "react";
import { ImSun } from "react-icons/im";
import { FaRegMoon } from "react-icons/fa";
import { BiPaint } from "react-icons/bi";
import RadioColor from "./components/RadioColor";

const colors = [
  {
    colorName: "",
    customPropCss: "--radio-normal",
  },
  {
    colorName: "green",
    customPropCss: "--radio-green",
  },
  {
    colorName: "purple",
    customPropCss: "--radio-purple",
  },
  {
    colorName: "orange",
    customPropCss: "--radio-orange",
  },
];
const storageTheme = JSON.parse(localStorage.getItem("theme-clonify"));
const ColorTheme = () => {
  const [darkMode, setDarkMode] = useState(storageTheme.mode || "dark");
  const [colorTheme, setColorTheme] = useState(storageTheme.color || "");
  useEffect(() => {
    document.body.className = `${darkMode} ${colorTheme}`;
    const theme = {
      mode: darkMode,
      color: colorTheme,
    };
    localStorage.setItem("theme-clonify", JSON.stringify(theme));
  }, [darkMode, colorTheme]);

  const handleClick = () => {
    setDarkMode((theme) => {
      return theme === "dark" ? "light" : "dark";
    });
  };
  const handleChange = (e) => {
    setColorTheme(e.target.value);
  };
  return (
    <div className="colorTheme">
      <button
        className="btn-theme"
        onClick={handleClick}
        aria-label="dark mode"
      >
        {darkMode === "dark" ? <ImSun /> : <FaRegMoon />}
      </button>
      <div className="colorTheme___wrapper">
        <div className="btn-theme btn-theme--hover-pick">
          <BiPaint />
          <div className="colorTheme__box">
            {colors.map((color, i) => (
              <RadioColor
                onChange={handleChange}
                customPropCss={color.customPropCss}
                key={i}
                title={color.colorName}
                value={`${color.colorName}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorTheme;
