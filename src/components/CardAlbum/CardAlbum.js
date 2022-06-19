import "./CardAlbum.css";

const CardAlbum = ({ urlImg, altImg, title }) => {
  return (
    <article className="album">
      <div className="album__wrap-img">
        <img loading="lazy" src={urlImg} alt={altImg} />
      </div>
      <div className="album__details">
        <p className="album__title">
          {title}
          <span className="album__toltip">{title}</span>
        </p>
      </div>
    </article>
  );
};

export default CardAlbum;
