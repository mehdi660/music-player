import React from "react";
import { NavLink } from "react-router-dom";

const AlbumCard = ({ album }) => {
  const { images, name, total_tracks, release_date } = album;

  if (!album || !images || images.length === 0) {
    return <div>Album non disponible</div>;
  }

  return (
    <article className="album" key={album.id}>
      <div className="album-ctnr">
        <NavLink to={`${album.id}/tracks`}>
          <img src={images[1].url} alt={name} />
        </NavLink>
        <div className="info_album">
          <h3>Name : {name}</h3>
          <h3>Total tracks : {total_tracks}</h3>
          <h3>Release date : {release_date}</h3>
        </div>
      </div>
    </article>
  );
};

export default AlbumCard;
