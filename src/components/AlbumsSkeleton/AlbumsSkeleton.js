import React from "react";
import GridContainer from "../GridContainer/GridContainer";
import "./AlbumsSkeleton.css";
import AlbumSkeleton from "./components/AlbumSkeleton";
const AlbumsSkeleton = ({ itemsLength }) => {
  return (
    <GridContainer>
      <div className="skeleton__title"></div>
      <div className="skeleton__grid">
        {Array(itemsLength)
          .fill(0)
          .map((item, i) => (
            <AlbumSkeleton key={i} />
          ))}
      </div>
    </GridContainer>
  );
};

export default AlbumsSkeleton;
