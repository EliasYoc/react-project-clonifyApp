import React from "react";
import Track from "./Track";
import { AiOutlineClockCircle } from "react-icons/ai";
const AlbumTracks = ({ tracks }) => {
  return (
    <section className="section-track">
      <header className="track-row header-column">
        <div className="other-columns">#</div>
        <div className="middle-column">
          <span>Título</span>
        </div>
        <div className="other-columns">
          <AiOutlineClockCircle />
        </div>
      </header>
      <ul>
        {tracks.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </ul>
    </section>
  );
};

export default AlbumTracks;
