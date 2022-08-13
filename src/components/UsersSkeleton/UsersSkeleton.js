import React from "react";
import GridContainer from "../GridContainer/GridContainer";
import UserCardSkeleton from "./components/UserCardSkeleton";

const UsersSkeleton = ({ itemsLength }) => {
  return (
    <GridContainer>
      <div className="skeleton__title"></div>
      <div className="skeleton__grid">
        {Array(itemsLength)
          .fill(0)
          .map((item, i) => (
            <UserCardSkeleton key={i} />
          ))}
      </div>
    </GridContainer>
  );
};

export default UsersSkeleton;
