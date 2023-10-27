import React from "react";

const AlbumCard = ({ album }) => {
  return (
    <div className="album">
      <img width="25%" src={album.images[0].url} alt="" />
      <h3>{album.name}</h3>
    </div>
  );
};

export default AlbumCard;
