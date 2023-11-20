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
        <NavLink to={"/tracks"}>
          <img src={images[1].url} alt={name} />
        </NavLink>
        <div className="info_album">
          <h3>Nom : {name}</h3>
          <h3>Nombre de pistes : {total_tracks}</h3>
          <h3>Date de sortie : {release_date}</h3>
        </div>
      </div>
    </article>
  );
};

export default AlbumCard;
