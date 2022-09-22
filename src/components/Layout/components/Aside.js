import "./Aside.css";
import ColorTheme from "../../ColorTheme/ColorTheme";
import PrincipalButtons from "../../PrincipalButtons/PrincipalButtons";

const Aside = () => {
  return (
    <aside className="aside">
      <header className="aside__header">
        <h2>Clonify</h2>
        <ColorTheme />
      </header>
      <PrincipalButtons />
      <hr className="aside__space" />
    </aside>
  );
};

export default Aside;
