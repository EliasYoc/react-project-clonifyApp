import "./RadioColor.css";

const RadioColor = ({ title, customPropCss, value, onChange, onClick }) => {
  return (
    <label onClick={onClick} className="radio-label" htmlFor={title}>
      <input
        onChange={onChange}
        className="colorTheme__radio"
        style={{ backgroundColor: `var(${customPropCss})` }}
        type="radio"
        name="color"
        id={title}
        value={value}
      />
      {title || "ninguno"}
    </label>
  );
};

export default RadioColor;
