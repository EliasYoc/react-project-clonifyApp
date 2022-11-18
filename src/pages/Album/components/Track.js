import React from "react";
import { millisecondsToMinute } from "../../../utils/readOnlyLayout";

const Track = ({ track }) => {
  const { minutes, seconds } = millisecondsToMinute(track.duration_ms);
  return (
    <li className="track-row" key={track.id}>
      <span className="other-columns">{track.track_number}</span>
      <div className="middle-column">
        <h3>{track.name}</h3>
      </div>
      <span className="other-columns">
        {minutes} : {seconds}
      </span>
    </li>
  );
};

export default Track;
