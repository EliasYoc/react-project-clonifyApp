import "./GridContainer.css";
const GridContainer = ({ title = "", children }) => {
  return (
    <section className="grid-container">
      {title && <h2 className="grid-container__title">{title}</h2>}
      {children}
    </section>
  );
};

export default GridContainer;
