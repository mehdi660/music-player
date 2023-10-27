import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import AlbumCard from "../components/AlbumCard";

const Home = () => {
  const CLIENT_ID = "a18ef4dbb3364dd49c476468b8bd2a3b";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [hoveredArtistId, setHoveredArtistId] = useState(null);
  const [hoveredArtistAlbums, setHoveredArtistAlbums] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

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
    setArtists(data.artists.items);
  };

  const searchAlbums = async (artistId) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          limit: 4,
        },
      }
    );
    setHoveredArtistAlbums(data.items);
  };

  const handleMouseEnter = (artistId) => {
    setHoveredArtistId(artistId);
    searchAlbums(artistId);
  };

  const handleMouseLeave = () => {
    setHoveredArtistId(null);
    setHoveredArtistAlbums([]);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <ArtistCard
        key={artist.id}
        artist={artist}
        onArtistHover={handleMouseEnter}
        onAlbumLeave={handleMouseLeave}
        isSelected={artist.id === selectedArtistId}
      />
    ));
  };

  const renderHoveredArtistAlbums = () => {
    return (
      <div className="hovered-albums">
        {hoveredArtistAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <header>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
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
      </header>
      <main>
        <h1>Hello world</h1>
        {token ? (
          <>
            {renderHoveredArtistAlbums()}
            <div className="artist">{renderArtists()}</div>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default Home;
