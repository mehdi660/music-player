import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import Header from "../components/Header";

const Home = () => {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);

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
        console.log("Aucun artiste trouvé.");
        setErrorMsg(true);
        console.log(errorMsg);
        // Vous pouvez également afficher un message à l'utilisateur ou effectuer d'autres actions ici
      } else {
        // Des artistes ont été trouvés, mettez à jour la liste des artistes
        setErrorMsg(false);
        setArtists(data.artists.items);
      }
    } catch (error) {
      // Gérer les erreurs de l'API ici, par exemple, afficher un message d'erreur à l'utilisateur
      console.error("Erreur lors de la recherche d'artistes :", error);
      setErrorMsg(true);
      // Vous pouvez également afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions ici
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
        {errorMsg && <p>No artist found, try someone else !</p>}
        {token && !errorMsg && <div className="artist">{renderArtists()}</div>}
      </main>
    </div>
  );
};

export default Home;
