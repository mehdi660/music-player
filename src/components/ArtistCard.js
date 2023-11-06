import React, { useState } from "react";
import nothing from "../img/nothing.png";
import { NavLink } from "react-router-dom";

const ArtistCard = ({ artist }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="card">
      <div className={`card_ctnr ${isHovered ? "hovered" : ""}`}>
        <NavLink to={`/albums/${artist.id}`}>
          {artist.images[0] ? (
            <img
              width={"50%"}
              src={artist.images[0].url}
              alt={artist.name}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          ) : (
            <img
              width={"50%"}
              src={nothing}
              alt={artist.name}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          )}
          {isHovered && <p>Go to album page</p>}
        </NavLink>
        <h3>{artist.name}</h3>
        <h3>Followers: {artist.followers.total}</h3>
        <h3>Popularity: {artist.popularity}</h3>
        <h3>Genres: {artist.genres[0] ? artist.genres[0] : "No genres"}</h3>
      </div>
    </div>
  );
};

export default ArtistCard;
