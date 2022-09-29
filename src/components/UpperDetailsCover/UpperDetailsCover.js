import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRandomRgb, setRandomRgbColor } from "../../features/themesSlice";
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
  useEffect(() => {
    getAllPixelsFromImgId("upperImg").then(
      (imgRgbPixels) => {
        const uniqueColors = [...new Set(imgRgbPixels)];
        const randomColorIndex = Math.round(
          Math.random() * (uniqueColors.length - 1)
        );
        const randomRgbColor = uniqueColors[randomColorIndex];
        dispatch(setRandomRgbColor(randomRgbColor));
      },
      (error) => console.error(error)
    );
  }, [dispatch]);

  return (
    // style={{ backgroundImage: `url(${imgSrc})` }}
    <section
      style={{
        background: `rgb(${rgbColor}, .7)`,
        backdropFilter: "blur(20px)",
      }}
      className="details"
    >
      <div className="details__wrap-info">
        {imgSrc && (
          <div className="details__wrap-img">
            {/* crossOrigin anonymous in img tag to detect context.getImageData from canvas */}
            <img
              crossOrigin="anonymous"
              id="upperImg"
              src={imgSrc}
              alt={publisher}
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
