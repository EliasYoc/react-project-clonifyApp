import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  selectElementTransition,
  selectRandomRgb,
  setIncomingElement,
  setRandomRgbColor,
} from "../../features/themesSlice";
import { useElementPosition } from "../../hooks/useElementPosition";
import { getAllPixelsFromImgId } from "../../utils/themes";
import "./UpperDetailsCover.css";

const UpperDetailsCover = ({
  imgSrc = null,
  title = "",
  type = "",
  publisher = "",
  howLongTimeSongs = "",
  listenerQuantity = "",
  stringAditionalInfoList = [],
}) => {
  const dispatch = useDispatch();
  const rgbColor = useSelector(selectRandomRgb);
  const { pathname } = useLocation();
  const { incomingElementBounding } = useSelector(selectElementTransition);
  const { refElement, getPosition } = useElementPosition();
  useEffect(() => {
    // en themeSlice.js crear objeto que guarde dinamicamente un color de cada section(show/podcast/artist/playlist) de acuerdo al [show/:id]
    // const objPageColors = {
    //   ["show/id"]: "color"
    // }
    // if(!objPaheColors){ getAllPixelsFromImgId}
    if (!rgbColor[pathname]) {
      getAllPixelsFromImgId("upperImg").then(
        (imgRgbaPixels) => {
          const randomColorIndex = Math.round(
            Math.random() * (imgRgbaPixels.length - 1)
          );
          const { rgbString } = imgRgbaPixels[randomColorIndex];
          const randomColorInfo = {
            info: pathname,
            color: rgbString,
          };
          dispatch(setRandomRgbColor(randomColorInfo));
        },
        (error) => console.error(error)
      );
    }

    return () => {
      dispatch(setRandomRgbColor("0, 0, 0"));
    };
  }, [dispatch, pathname, rgbColor]);
  useEffect(() => {
    if (!incomingElementBounding) {
      const incomingElement = getPosition();
      dispatch(setIncomingElement(incomingElement));
    }
  }, [dispatch, getPosition, incomingElementBounding]);
  return (
    // style={{ backgroundImage: `url(${imgSrc})` }}
    <section
      style={{
        background: `rgb(${rgbColor[pathname]}, .7)`,
      }}
      className="details"
    >
      <div className="upperBlur"></div>
      <div className="details__wrap-info">
        {imgSrc && (
          <div className="details__wrap-img">
            {/* crossOrigin anonymous in img tag to detect context.getImageData from canvas */}
            <img
              crossOrigin="anonymous"
              id="upperImg"
              src={imgSrc}
              alt={publisher}
              ref={refElement}
            />
          </div>
        )}
        <div className="details__info">
          {type && <h2 className="details__type">{type}</h2>}
          <h1 className="details__title">{title}</h1>
          <p className="details__aditional">
            {publisher && <strong>{publisher}</strong>}
            {listenerQuantity && <span>{listenerQuantity} oyentes</span>}
            {stringAditionalInfoList.length > 0 &&
              stringAditionalInfoList.map((info, i) => (
                <span key={i}>• {info}</span>
              ))}
            {howLongTimeSongs && (
              <>
                ,<time>{howLongTimeSongs}</time>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UpperDetailsCover;
