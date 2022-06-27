import { Link } from "react-router-dom";
import useMediaMinWidth720p from "../../../hooks/useMediaMinWidth720p";
import ColorTheme from "../../ColorTheme/ColorTheme";
import "./AvatarOptions.css";
const AvatarOptions = ({ className }) => {
  const isDesktop = useMediaMinWidth720p();

  return (
    <nav className={`options ${className}`}>
      {!isDesktop && <ColorTheme />}
      <Link className="options__profile" to="/profile">
        Perfil
      </Link>
      <button className="logout-btn">Cerrar Sesión</button>
    </nav>
  );
};

export default AvatarOptions;
