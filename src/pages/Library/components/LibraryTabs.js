import { NavLink } from "react-router-dom";
import "./LibraryTabs.css";
const LibraryTabs = () => {
  return (
    <ul className="tabs">
      <li className="tabs__ul">
        <NavLink
          className={({ isActive }) =>
            `tabs__tab ${isActive ? "activeTab" : ""}`
          }
          to="playlists"
        >
          Playlists
        </NavLink>
      </li>
      <li className="tabs__ul">
        <NavLink
          className={({ isActive }) =>
            `tabs__tab ${isActive ? "activeTab" : ""}`
          }
          to="podcasts"
        >
          Podcasts
        </NavLink>
      </li>
      <li className="tabs__ul">
        <NavLink
          className={({ isActive }) =>
            `tabs__tab ${isActive ? "activeTab" : ""}`
          }
          to="artistas"
        >
          Artistas
        </NavLink>
      </li>
      <li className="tabs__ul">
        <NavLink
          className={({ isActive }) =>
            `tabs__tab ${isActive ? "activeTab" : ""}`
          }
          to="albumes"
        >
          Albumes
        </NavLink>
      </li>
    </ul>
  );
};

export default LibraryTabs;
