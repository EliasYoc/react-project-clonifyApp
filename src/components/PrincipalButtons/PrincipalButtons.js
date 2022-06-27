import { FiSearch } from "react-icons/fi";
import { VscLibrary, VscHome } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import "./PrincipalButtons.css";
const list = [
  {
    path: "/",
    title: "Inicio",
    icon: VscHome,
  },
  {
    path: "search",
    title: "Buscar",
    icon: FiSearch,
  },
  {
    path: "library",
    title: "Biblioteca",
    icon: VscLibrary,
  },
];
const PrincipalButtons = () => {
  return (
    <nav className="aside__links">
      {list.map(({ path, title, icon: Icon }, i) => (
        <NavLink
          onClick={() => {
            localStorage.setItem("path-clonify", path);
          }}
          key={i}
          className={({ isActive }) =>
            `aside__path ${isActive ? "active" : ""}`
          }
          to={path}
        >
          <Icon className="aside__icon" />
          <span className="aside__links-title">{title} </span>
        </NavLink>
      ))}
    </nav>
  );
};

export default PrincipalButtons;
