import React from "react";
import nothing from "../img/nothing.png";
import { NavLink } from "react-router-dom";

const ArtistCard = ({ artist, isSelected }) => {
  return (
    <div className={`card ${isSelected ? "selected" : ""}`}>
      <div className="card_ctnr">
        {artist.images[0] ? (
          <NavLink to={`/album`}>
            <img width={"50%"} src={artist.images[0].url} alt={artist.name} />
          </NavLink>
        ) : (
          <NavLink to={`/album/${artist.id}`}>
            <img width={"50%"} src={nothing} alt={artist.name} />
          </NavLink>
        )}
        <h3>{artist.name}</h3>
        <h3>Followers: {artist.followers.total}</h3>
        <h3>Popularity: {artist.popularity}</h3>
        <h3>Genres: {artist.genres[0] ? artist.genres[0] : "No genres"}</h3>
      </div>
    </div>
  );
};

export default ArtistCard;
