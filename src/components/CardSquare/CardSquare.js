import { useNavigate } from "react-router-dom";
import "./CardSquare.css";

const CardSquare = ({ urlImg, altImg, title, anyInfo, id, type }) => {
  let navigate = useNavigate();
  const handleRedirect = () => {
    console.log("id", `../${type}/${id}`);
    navigate(`/${type}/${id}`);
  };
  return (
    <article onClick={handleRedirect} className="album">
      <div className="album__wrap-img">
        <img loading="lazy" src={urlImg} alt={altImg} />
      </div>
      <div className="album__details">
        <p className="album__title">
          {title}
          <span className="album__toltip">{title}</span>
        </p>
        <p className="album__any-info">{anyInfo || ""}</p>
      </div>
    </article>
  );
};

export default CardSquare;
