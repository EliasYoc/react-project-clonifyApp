import "./ColorTheme.css";
import { useEffect } from "react";
import { BiPaint } from "react-icons/bi";
import RadioColor from "./components/RadioColor";
import DarkButton from "./components/DarkButton";
import { useDispatch, useSelector } from "react-redux";
import { selectThemes, setColorTheme } from "../../features/themesSlice";

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
const ColorTheme = () => {
  const { darkMode, colorTheme } = useSelector(selectThemes);
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
  return (
    <div onClick={(e) => e.stopPropagation()} className="colorTheme">
      <DarkButton darkMode={darkMode} />
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
