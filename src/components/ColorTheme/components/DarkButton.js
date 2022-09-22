import { ImSun } from "react-icons/im";
import { FaRegMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectThemes, setDarkMode } from "../../../features/themesSlice";

const DarkButton = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(selectThemes);
  const handleClick = () => {
    const darkModeSwitched = darkMode === "dark" ? "light" : "dark";
    // setDarkMode((theme) => {
    //   return theme === "dark" ? "light" : "dark";
    // });
    dispatch(setDarkMode(darkModeSwitched));
  };
  return (
    <button className="btn-theme" onClick={handleClick} aria-label="dark mode">
      {darkMode === "dark" ? <ImSun /> : <FaRegMoon />}
    </button>
  );
};

export default DarkButton;
