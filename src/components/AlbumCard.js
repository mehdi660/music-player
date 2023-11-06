import React from "react";

const AlbumCard = ({ album }) => {
  if (!album || !album.images || album.images.length === 0) {
    return <div>Album not available</div>;
  }

  return (
    <div className="album">
      <div className="album-ctnr">
        <img src={album.images[1].url} alt={album.name} />
        <h3>{album.name}</h3>
      </div>
    </div>
  );
};

export default AlbumCard;
