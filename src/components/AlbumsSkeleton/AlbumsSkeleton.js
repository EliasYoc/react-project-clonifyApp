import React from "react";
import "./AlbumsSkeleton.css";
import AlbumSkeleton from "./components/AlbumSkeleton";
const AlbumsSkeleton = ({ itemsLength }) => {
  return (
    <section className="skeleton">
      {Array(itemsLength)
        .fill(0)
        .map((item, i) => (
          <AlbumSkeleton key={i} />
        ))}
    </section>
  );
};

export default AlbumsSkeleton;
