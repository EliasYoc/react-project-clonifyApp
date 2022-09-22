import { IoPlayOutline } from "react-icons/io5";
const Episode = ({
  espisodeTitle,
  episodeDescription,
  imageSrc,
  publicationDate,
  publisher,
  delayAnimationSeconds,
}) => {
  return (
    <article
      style={{
        animationDuration: `${delayAnimationSeconds}ms`,
      }}
      className="episode"
    >
      <header className="episode__header">
        <div className="episode__img-wrapper">
          <img loading="lazy" src={imageSrc} alt={publisher} />
        </div>
        <h3 className="episode__title">{espisodeTitle}</h3>
      </header>

      <p className="episode__description ellipsis-lines">
        {episodeDescription}
      </p>
      <footer className="episode__publication">
        <span className="episode__play">
          <IoPlayOutline />
        </span>
        <p>{publicationDate}</p>
      </footer>
    </article>
  );
};

export default Episode;
