import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOutgoingElement } from "../../features/themesSlice";
import { useElementPosition } from "../../hooks/useElementPosition";

const CardCircle = ({ urlImg, altImg, title, anyInfo, id, type }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { refElement, getPosition } = useElementPosition();

  const handleRedirect = () => {
    const outgoingElement = getPosition({ src: refElement.current.src });
    navigate(`/${type}/${id}`);
    dispatch(setOutgoingElement(outgoingElement));
  };
  return (
    <article onClick={handleRedirect} className="album">
      <div className="album__wrap-img circle-img">
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

export default CardCircle;
