import { forwardRef, useState } from "react";
import {
  addCustomPropertyAlpha,
  editCustomPropertyAlpha,
  selectThemes,
} from "../../../features/themesSlice";
import { hexToPercent, percentToHex } from "../../../utils/themes";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

const CustomOption = forwardRef(({ cssVariableName, onChange, value }, ref) => {
  const [transparencyPercentage, setTransparencyPercentage] = useState("100");
  const dispatch = useDispatch();
  const { cssCustomProperties, cssCustomPropertiesAlpha } =
    useSelector(selectThemes);
  const refTimeout = useRef(false);

  useEffect(
    function saveCssColorAlphaProperty() {
      if (cssCustomPropertiesAlpha[cssVariableName]) {
        dispatch(
          editCustomPropertyAlpha({
            variable: cssVariableName,
            alpha: cssCustomPropertiesAlpha[cssVariableName],
          })
        );
        localStorage.setItem(
          "customThemeClonifyAlpha",
          JSON.stringify(cssCustomPropertiesAlpha)
        );
        setTransparencyPercentage(
          hexToPercent(cssCustomPropertiesAlpha[cssVariableName])
        );
      } else {
        setTransparencyPercentage("100");
      }
    },
    [cssCustomPropertiesAlpha, cssVariableName, dispatch]
  );

  const handleChangeTransparency = (e) => {
    clearTimeout(refTimeout.current);
    setTransparencyPercentage(e.target.value);
    const transparencyColor = {
      variable: cssVariableName,
      alpha: percentToHex(e.target.value),
    };
    refTimeout.current = setTimeout(
      () => dispatch(addCustomPropertyAlpha(transparencyColor)),
      250
    );
    ref.current.style.setProperty(
      transparencyColor.variable,
      `${value}${transparencyColor.alpha}`
    );
  };
  const [openColorPicker, setOpenColorPicker] = useState(false);
  return (
    <div className="custom-themes__option">
      <label
        onClick={() => setOpenColorPicker(!openColorPicker)}
        htmlFor={cssVariableName}
        className="custom-themes__focus-clr"
      >
        <p>{cssVariableName}</p>
        <button
          className="btn-alphaColor"
          aria-label={`transparencia ${transparencyPercentage}`}
        >
          <span
            style={{ background: cssCustomProperties[cssVariableName] }}
            className="custom-themes__prev-color"
          ></span>
        </button>
      </label>
      {openColorPicker && (
        <>
          <div className="custom-picker">
            <HexColorPicker
              color={value}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onChange({ value: e, cssVariableName })}
            />
          </div>
          <div className="custom-themes__percent">
            <p className="custom-themes__subtitle">
              transparency {transparencyPercentage}
            </p>
            <input
              onChange={handleChangeTransparency}
              className="custom-themes__range range"
              type="range"
              min={0}
              max={100}
              value={transparencyPercentage}
            />
          </div>
        </>
      )}
      {/* cssCustomProperties[cssVariableName] */}
    </div>
  );
});

export default CustomOption;
