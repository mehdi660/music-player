import React from "react";

const TracksCard = ({ data }) => {
  return (
    <>
      <h1>album track of ""</h1>
      {data && (
        <ul>
          {data.items.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TracksCard;
