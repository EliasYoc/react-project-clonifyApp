import { forwardRef, useState } from "react";
import {
  addCustomPropertyAlpha,
  editCustomPropertyAlpha,
  selectThemes,
} from "../../../features/themesSlice";
import { hexToPercent, percentToHex } from "../../../utils/themes";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";

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
  return (
    <div className="custom-themes__option">
      <label htmlFor={cssVariableName} className="custom-themes__focur-clr">
        <p>{cssVariableName}</p>
        <input
          onChange={onChange}
          id={cssVariableName}
          className="btn-pickColor"
          type="color"
          data-css-variable={cssVariableName}
          value={value}
        />
      </label>

      {cssCustomProperties[cssVariableName] && (
        <div className="custom-themes__percent">
          transparency {transparencyPercentage}
          <div className="custom-themes__wrapper">
            <input
              onChange={handleChangeTransparency}
              className="custom-themes__range range"
              type="range"
              min={0}
              max={100}
              value={transparencyPercentage}
            />
            <button
              className="btn-alphaColor"
              aria-label={`transparencia ${transparencyPercentage}`}
            >
              <span
                style={{
                  backgroundColor: cssCustomProperties[cssVariableName],
                }}
                className="bg-transparency"
              ></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default CustomOption;
