import React from "react";
import { millisecondsToMinute } from "../../../utils/readOnlyLayout";

const PopularAudio = ({ i, popular }) => {
  const { minutes, seconds } = millisecondsToMinute(popular.duration_ms);
  return (
    <li
      style={{
        animationDelay: `${100 + i * 50}ms`,
        animationDuration: "300ms",
        animationFillMode: "backwards",
      }}
      className="topList__popular"
      key={popular.id}
    >
      <div className="topList__image">
        <img src={popular.album.images[2].url} alt={popular.album.name} />
        <p>{popular.name}</p>
      </div>
      <time>
        {minutes}:{seconds}
      </time>
    </li>
  );
};

export default PopularAudio;
