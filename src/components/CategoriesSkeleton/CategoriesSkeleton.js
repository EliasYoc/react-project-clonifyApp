import GridContainer from "../GridContainer/GridContainer";
import "./CategoriesSkeleton.css";
const CategoriesSkeleton = ({ itemsLength = 0 }) => {
  return (
    <GridContainer>
      <div className="skeleton__title"> </div>
      <div className="skeleton__grid">
        {Array(itemsLength)
          .fill(0)
          .map((item, i) => (
            <div key={i} className="c-skeleton">
              <div className="c-skeleton__title"></div>
              <div className="c-skeleton__img"></div>
            </div>
          ))}
      </div>
    </GridContainer>
  );
};

export default CategoriesSkeleton;
