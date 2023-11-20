import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumCard from "../components/AlbumCard";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Album = () => {
  const [artistName, setArtistName] = useState("");
  const [albums, setAlbums] = useState([]);
  const id = useParams().id; // Utilisez useParams() pour obtenir les paramètres de l'URL
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/artists/${id}/albums`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              type: "album",
            },
          }
        );
        if (data.items && data.items.length > 0) {
          setArtistName(data.items[0].artists[0].name);
          setAlbums(data.items);
        } else {
          console.error("Aucun album trouvé.");
        }
      } catch (error) {
        console.error("Erreur lors de la recherche d'albums :", error);
      }
    };

    getAlbums();
  }, [id, token]);

  return (
    <div>
      <Header />
      <h1 id="artist_name">Albums / single of {artistName}</h1>
      <div className="album-list">
        {albums.map((album) => (
          <div key={album.id}>
            <AlbumCard album={album} />
            <Link to={`${album.id}/tracks`}>View Tracks</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
