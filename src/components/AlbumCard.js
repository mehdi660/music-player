import React from "react";
import { NavLink } from "react-router-dom";

const AlbumCard = ({ album }) => {
  if (!album || !album.images || album.images.length === 0) {
    return <div>Album not available</div>;
  }

  return (
    <div className="album">
      <div className="album-ctnr">
        <NavLink to={"/tracks"}>
          <img src={album.images[1].url} alt={album.name} />
        </NavLink>
        <div className="info_album">
          <h3>Name : {album.name}</h3>
          <h3>Total tracks : {album.total_tracks}</h3>
          <h3>Release date : {album.release_date}</h3>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
