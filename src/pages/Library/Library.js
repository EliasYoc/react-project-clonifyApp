import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LibraryTabs from "./components/LibraryTabs";
import "./Library.css";
const initialPath = "/library";

const Library = () => {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === initialPath) navigate("playlists");
  }, [location.pathname, navigate]);
  return (
    <section>
      <LibraryTabs />
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Library;
