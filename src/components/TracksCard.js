import React from "react";
import { FaHeart } from "react-icons/fa";

const TracksCard = ({ data }) => {
  if (!data) {
    return null;
  }

  const trackList = data.items.map((track) => (
    <li className="tracks" key={track.id}>
      {track.name} <FaHeart />
    </li>
  ));

  return (
    <section className="tracks_main">
      <h1>Album track of "{data.items[0].name}"</h1>
      <ul>{trackList}</ul>
    </section>
  );
};

export default TracksCard;
