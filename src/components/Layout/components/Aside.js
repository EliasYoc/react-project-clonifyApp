import "./Aside.css";
import { NavLink } from "react-router-dom";
import ColorTheme from "../../ColorTheme/ColorTheme";
import { FiSearch } from "react-icons/fi";
import { VscLibrary, VscHome } from "react-icons/vsc";
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
const Aside = () => {
  return (
    <aside className="aside">
      <header className="aside__header">
        <h2>Clonify</h2>
        <ColorTheme />
      </header>
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
            {title}
          </NavLink>
        ))}
        <hr className="aside__space" />
      </nav>
    </aside>
  );
};

export default Aside;
