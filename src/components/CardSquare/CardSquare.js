import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOutgoingElement } from "../../features/themesSlice";
import { useElementPosition } from "../../hooks/useElementPosition";
import "./CardSquare.css";

const CardSquare = ({ urlImg, altImg, title, anyInfo, id, type }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { refElement, position } = useElementPosition(
    document.querySelector(".background")
  );
  const handleRedirect = () => {
    // const position = getPosition();
    console.log("saliente", position);
    const outgoingElement = {
      width: position.width,
      height: position.height,
      y: position.y,
      x: position.x - position.elementX, //restar numero mayor menos el menor para calcular respecto al elemento padre (getboundingclient es respecto al viewport)
      src: refElement.current.src,
    };
    navigate(`/${type}/${id}`);
    dispatch(setOutgoingElement(outgoingElement));
  };
  return (
    <article onClick={handleRedirect} className="album">
      <div className="album__wrap-img">
        <img ref={refElement} loading="lazy" src={urlImg} alt={altImg} />
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
