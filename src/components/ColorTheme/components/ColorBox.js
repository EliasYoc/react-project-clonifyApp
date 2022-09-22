import { MdOutlineColorLens } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useRef } from "react";
import RadioColor from "./RadioColor";
import { useDispatch, useSelector } from "react-redux";
import {
  editCustomProperty,
  addCustomProperties,
  resetCustomProperties,
  selectCustomThemeConfig,
  selectThemes,
  setIsCustom,
  setIsOpenCustomThemeBox,
  addCustomPropertiesAlpha,
} from "../../../features/themesSlice";
import CustomOption from "./CustomOption";
import {
  colors,
  cssCustomPropertiesList,
} from "../../../themes/cssCustomProperties";
import { createPortal } from "react-dom";

const ColorBox = ({ handleChange, openCloseColorBox }) => {
  const {
    cssCustomProperties,
    cssCustomPropertiesAlpha,
    darkMode,
    colorTheme,
  } = useSelector(selectThemes);
  const { isCustom, isOpenCustomThemeBox } = useSelector(
    selectCustomThemeConfig
  );
  const dispatch = useDispatch();
  const refCustomThemeBox = useRef();
  const refColors = useRef();
  const refColorBox = useRef();
  const refMyCustomRule = useRef(); //cuando tenia null dentro de useref, lanzaba error
  const refRules = useRef();
  const refTimeout = useRef(false); //for debouncing
  const refDelay = useRef(250); //debouncing

  useEffect(
    function modifyingThemeBox() {
      isOpenCustomThemeBox
        ? (refColorBox.current.style.height = `${refCustomThemeBox.current.offsetHeight}px`)
        : (refColorBox.current.style.height = `${refColors.current.offsetHeight}px`);
    },
    [isOpenCustomThemeBox, cssCustomProperties]
  );

  useEffect(
    function loadCssVariables() {
      refRules.current = document.styleSheets[0].cssRules;
      const getCustomCssProperties = (rule) => {
        const localCustomProperties =
          JSON.parse(localStorage.getItem("customThemeClonify")) || {};
        dispatch(addCustomProperties(localCustomProperties));
        const customThemeClonifyAlpha =
          JSON.parse(localStorage.getItem("customThemeClonifyAlpha")) || {};
        dispatch(addCustomPropertiesAlpha(customThemeClonifyAlpha));
        for (const key in localCustomProperties) {
          rule.current.style.setProperty(key, localCustomProperties[key]);
        }
      };
      if (isCustom) {
        for (const rule of refRules.current) {
          if (rule.selectorText === "#custom") refMyCustomRule.current = rule;
        }
        document.body.id = "custom";
        console.log(refRules);
        console.log(refMyCustomRule);
        getCustomCssProperties(refMyCustomRule);
      } else {
        document.body.id = "";
      }
    },
    [isCustom, dispatch, colorTheme, darkMode]
  );
  useEffect(
    function saveToLocal() {
      if (isCustom) {
        localStorage.setItem(
          "customThemeClonify",
          JSON.stringify(cssCustomProperties)
        );
      }
    },
    [cssCustomProperties, isCustom]
  );
  const openCustomThemeBox = () => {
    dispatch(setIsCustom(true));
    dispatch(setIsOpenCustomThemeBox(!isOpenCustomThemeBox));
  };
  const editingCssVariables = (e) => {
    const cssVariable = {
      variable: e.cssVariableName,
      colorHex: `${e.hexColor}${
        cssCustomPropertiesAlpha[e.cssVariableName] || "ff"
      }`,
    };
    clearInterval(refTimeout.current); //debouncing
    refTimeout.current = setTimeout(() => {
      dispatch(editCustomProperty(cssVariable));
    }, refDelay.current); //debouncing
    refMyCustomRule.current.style.setProperty(
      cssVariable.variable,
      cssVariable.colorHex
    );
  };

  const handleClickResetProperties = () => {
    localStorage.removeItem("customThemeClonify");
    localStorage.removeItem("customThemeClonifyAlpha");

    dispatch(resetCustomProperties());
    for (const value of cssCustomPropertiesList) {
      refMyCustomRule.current.style.removeProperty(value.trim());
    }
  };

  return createPortal(
    <div onClick={openCloseColorBox} className="wrapper-theme">
      <div
        onClick={(e) => e.stopPropagation()}
        ref={refColorBox}
        className="colorTheme__box"
      >
        <section
          ref={refColors}
          className={`colorTheme__colors ${
            isOpenCustomThemeBox ? "close-colors" : ""
          }`}
        >
          {colors.map((color, i) => (
            <RadioColor
              onClick={() => {
                dispatch(setIsCustom(false));
              }}
              onChange={handleChange}
              customPropCss={color.customPropCss}
              key={i}
              title={color.colorName}
              value={`${color.colorName}`}
            />
          ))}
          <label
            onClick={openCustomThemeBox}
            className="colorTheme__custom-btn"
            htmlFor="customOption"
          >
            <input
              className="colorTheme__radio"
              type="radio"
              name="color"
              id="customOption"
            />
            <span className="colorTheme__icon">
              <MdOutlineColorLens />
            </span>
          </label>
        </section>

        <section
          ref={refCustomThemeBox}
          className={`custom-themes ${
            isOpenCustomThemeBox ? "open-themes" : ""
          } scroll`}
        >
          <header className="custom-themes__header">
            <button
              className="btn-theme"
              onClick={openCustomThemeBox}
              aria-label="regresar a la caja de colores"
            >
              <IoIosArrowBack />
            </button>
            <h4 className="custom-themes__title">Custom theme</h4>
          </header>
          <div className="custom-themes__list">
            <button onClick={handleClickResetProperties} className="btn-reset">
              Reset
            </button>
            {cssCustomPropertiesList.map((option, i) => (
              <CustomOption
                ref={refMyCustomRule}
                key={i}
                cssVariableName={option.trim()}
                onChange={editingCssVariables}
                value={
                  cssCustomProperties[option.trim()]?.slice(0, 7) || "#ffffff"
                }
              />
            ))}
          </div>
        </section>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ColorBox;
