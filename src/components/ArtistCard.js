import React from "react";

const ArtistCard = ({ artist, onAlbumClick }) => {
  return (
    <div className="card">
      <div className="card_ctnr">
        <img
          onMouseEnter={() => onAlbumClick(artist.id)}
          width={"50%"}
          src={artist.images[0].url}
          alt={artist.name}
        />
        <h3>{artist.name}</h3>
        <h3>Followers: {artist.followers.total}</h3>
        <h3>Popularity: {artist.popularity}</h3>
        <h3>Genres: {artist.genres[0] ? artist.genres[0] : "No genres"}</h3>
        <a href={artist.external_urls.spotify}>URL of the artist </a>
        <button onClick={() => onAlbumClick(artist.id)}>Voir les albums</button>
      </div>
    </div>
  );
};

export default ArtistCard;
