const CardUser = ({ urlImg, altImg, title, anyInfo }) => {
  return (
    <article className="album">
      <div className="album__wrap-img circle-img">
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

export default CardUser;
