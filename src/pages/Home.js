import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import Header from "../components/Header";

const Home = () => {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtistId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true); // Activer le loader

    try {
      const { data } = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          q: searchKey,
          type: "artist",
          limit: 20,
        },
      });

      if (data.artists.items.length === 0) {
        setErrorMsg(true);
      } else {
        setErrorMsg(false);
        setArtists(data.artists.items);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche d'artistes :", error);
      setErrorMsg(true);
    } finally {
      setIsLoading(false); // Désactiver le loader une fois la recherche terminée
    }
  };

  const renderArtists = () => {
    const sortedArtists = artists.sort(
      (a, b) => b.followers.total - a.followers.total
    );

    return sortedArtists.map((artist) => (
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
        {isLoading && <div className="loader">Loading...</div>}
        {errorMsg && <p>No artist found, try someone else !</p>}
        {token && !errorMsg && <div className="artist">{renderArtists()}</div>}
      </main>
    </div>
  );
};

export default Home;
