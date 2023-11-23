import React from "react";
import { FaHeart } from "react-icons/fa";

const TracksCard = ({ data }) => {
  if (!data) {
    return null;
  }

  const trackList = data.items.map((track) => (
    <li key={track.id}>
      {track.name} <FaHeart />
    </li>
  ));

  return (
    <>
      <h1>Album track of "{data.items[0].name}"</h1>
      <ul>{trackList}</ul>
    </>
  );
};

export default TracksCard;
