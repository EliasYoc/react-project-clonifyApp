import { useSelector } from "react-redux";
import { selectRandomRgb } from "../../../features/themesSlice";
import { useLocation } from "react-router-dom";

const PodcastAside = ({ podcastDetails }) => {
  const { pathname } = useLocation();
  const rgbColor = useSelector(selectRandomRgb);

  return (
    <aside
      style={{
        background: `rgb(${rgbColor[pathname]},.7)`,
      }}
      className="asideShow"
    >
      <div className="asideShow__gradient"></div>
      <article className="asideShow__article">
        <h3 className="asideShow__title">Acerca de...</h3>
        <p className="asideShow__about">{podcastDetails}</p>
      </article>
    </aside>
  );
};

export default PodcastAside;
