import React from "react";

const TracksCard = ({ data }) => {
  if (!data) {
    return null;
  }

  const trackList = data.items.map((track) => (
    <li key={track.id}>{track.name}</li>
  ));

  return (
    <>
      <h1>Album track of "{data.items[0].name}"</h1>
      <ul>{trackList}</ul>
    </>
  );
};

export default TracksCard;
