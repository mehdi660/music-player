import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const CLIENT_ID = "a18ef4dbb3364dd49c476468b8bd2a3b";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [album, setAlbum] = useState([]);
  const [hoveredArtistAlbums, setHoveredArtistAlbums] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: searchKey,
        type: "artist",
        limit: 5,
      },
    });
    console.log(data);
    setArtists(data.artists.items);
  };

  const searchAlbums = async (artistId) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          limit: 5,
        },
      }
    );
    setHoveredArtistAlbums(data.items);
  };

  const renderHoveredArtistAlbums = () => {
    return (
      <div className="hovered-albums">
        {hoveredArtistAlbums.map((album) => (
          <div key={album.id}>
            <h3>{album.name}</h3>
            {/* Ajoutez d'autres détails de l'album selon vos besoins */}
          </div>
        ))}
      </div>
    );
  };

  const renderArtists = () => {
    return artists.map((artist) => {
      return (
        <div
          className="card"
          key={artist.id}
          onMouseEnter={() => searchAlbums(artist.id)}
          onMouseLeave={() => setHoveredArtistAlbums([])}
        >
          <div className="card_ctnr">
            <img width={"30%"} src={artist.images[0].url} alt={artist.name} />
            <h3>{artist.name}</h3>
            <h3>Followers: {artist.followers.total}</h3>
            <h3>Popularity: {artist.popularity}</h3>
            <h3>Genres: {artist.genres[0] ? artist.genres[0] : "No genres"}</h3>
            <a href={artist.external_urls.spotify}>URL of the artist </a>
            <button onClick={() => searchAlbums(artist.id)}>
              Voir les albums
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <main>
      {renderHoveredArtistAlbums()}
      <h1>Hello world</h1>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to spotify
        </a>
      ) : (
        <div className="btn_ctnr">
          <button onClick={logout} className="Btn">
            <div className="sign">
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>

            <div className="text">Logout</div>
          </button>
        </div>
      )}
      {token ? (
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      ) : (
        <h2>Please login</h2>
      )}
      {renderArtists()}
    </main>
  );
};

export default Home;
