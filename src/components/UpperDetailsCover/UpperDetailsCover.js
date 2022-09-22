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
  return (
    <section style={{ backgroundImage: `url(${imgSrc})` }} className="details">
      <div className="details__blur"></div>
      <div className="details__wrap-info">
        {imgSrc && (
          <div className="details__wrap-img">
            <img src={imgSrc} alt={publisher} />
          </div>
        )}
        <div className="details__info">
          {type && <h2 className="details__type">{type}</h2>}
          <h1 className="details__title">{title}</h1>
          <p className="details__aditional">
            {publisher && <strong>{publisher}</strong>}
            {listenerQuantity && <span>{listenerQuantity} oyentes</span>}
            {stringAditionalInfoList.length > 0 &&
              stringAditionalInfoList.map((info) => <span>• {info}</span>)}
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
