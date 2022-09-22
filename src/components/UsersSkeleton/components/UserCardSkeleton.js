import React from "react";

const UserCardSkeleton = () => {
  return (
    <article className="skeleton__album">
      <div className="skeleton__wrap-img skeleton-circle-rounded"></div>
      <div className="skeleton__details"></div>
      <div className="skeleton__details"></div>
    </article>
  );
};

export default UserCardSkeleton;
