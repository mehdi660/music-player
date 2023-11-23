import React from "react";
import { FaHeart } from "react-icons/fa";

const convertDuration = (duration_ms) => {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = Math.floor((duration_ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const TracksCard = ({ data }) => {
  if (!data) {
    return null;
  }
  const trackList = data.items.map((track) => (
    <li className="track" key={track.id}>
      <span className="track-name">{track.name}</span>
      <FaHeart className="track-icon" />
      <span className="track-duration">
        {convertDuration(track.duration_ms)}
      </span>
    </li>
  ));
  return (
    <section className="tracks">
      <h1>Album track of "{data.items[0].name}"</h1>
      <ol>{trackList}</ol>
    </section>
  );
};

export default TracksCard;
