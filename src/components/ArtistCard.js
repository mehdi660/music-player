import React from "react";

const ArtistCard = ({ artist, isSelected }) => {
  return (
    <div className={`card ${isSelected ? "selected" : ""}`}>
      <div className="card_ctnr">
        <h3 id="album_page">Go to album page</h3>
        <img width={"50%"} src={artist.images[0].url} alt={artist.name} />
        <h3>{artist.name}</h3>
        <h3>Followers: {artist.followers.total}</h3>
        <h3>Popularity: {artist.popularity}</h3>
        <h3>Genres: {artist.genres[0] ? artist.genres[0] : "No genres"}</h3>
        <a href={artist.external_urls.spotify}>URL of the artist </a>
      </div>
    </div>
  );
};

export default ArtistCard;
