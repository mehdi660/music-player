import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import Header from "../components/Header";

const Home = () => {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
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

  const handleSearch = async (e) => {
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

  const renderArtists = () => {
    return artists.map((artist) => (
      <ArtistCard
        key={artist.id}
        artist={artist}
        isSelected={artist.id === selectedArtistId}
      />
    ));
  };

  return (
    <div>
      <Header token={token} onLogout={logout} />
      <main>
        <h1>Hello world</h1>
        {token && (
          <form onSubmit={handleSearch}>
            <input
              placeholder="Search a musical artist"
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        )}
        {token ? (
          <div className="artist">{renderArtists()}</div>
        ) : (
          <h2>Please login</h2>
        )}
      </main>
    </div>
  );
};

export default Home;
