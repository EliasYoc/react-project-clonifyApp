const PodcastAside = ({ podcastDetails }) => {
  return (
    <aside className="asideShow">
      <article className="asideShow__article">
        <h3 className="asideShow__title">Acerca de...</h3>
        <p className="asideShow__about">{podcastDetails}</p>
      </article>
    </aside>
  );
};

export default PodcastAside;
