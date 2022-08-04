import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../../features/authSpotifySlice";
import useMediaMinWidth720p from "../../../hooks/useMediaMinWidth720p";
import ColorTheme from "../../ColorTheme/ColorTheme";
import "./AvatarOptions.css";
const AvatarOptions = ({ className }) => {
  const isDesktop = useMediaMinWidth720p();
  const dispatch = useDispatch();
  const [isLogginOut, setIsLogginOut] = useState(false);
  const handleLogOut = () => {
    sessionStorage.removeItem("clonify-req-token");
    const openedWindowLogout = window.open(
      "https://www.spotify.com/logout/",
      "spotify_logout",
      "height=300,width=300"
    );
    setIsLogginOut(true);
    setTimeout(() => {
      openedWindowLogout.close();
      setIsLogginOut(false);
      dispatch(logOut());
    }, 1500);
  };
  return (
    <div className="filter-dropShadow">
      <nav className={`options ${className}`}>
        {!isDesktop && <ColorTheme />}
        <Link className="options__profile" to="/profile">
          Perfil
        </Link>
        <button
          disabled={isLogginOut}
          onClick={handleLogOut}
          className="logout-btn"
        >
          {isLogginOut ? "Cerrando Sesión..." : "Cerrar Sesión"}
        </button>
      </nav>
    </div>
  );
};

export default AvatarOptions;
