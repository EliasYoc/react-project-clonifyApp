import React from "react";

const ProfileSkeleton = () => {
  return (
    <section className="cover ">
      <div className="cover__wrap-img profile-skeleton"></div>
      <div className="cover__info gap-skeleton">
        <span className="cover__profile profile-skeleton"></span>
        <span className="cover__name profile-skeleton"></span>
        <span className="cover__followers profile-skeleton"></span>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
