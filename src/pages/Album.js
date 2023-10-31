import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Album = () => {
  let token = window.localStorage.getItem("token");
  const id = window.location.pathname.split("/")[2];
  const [artistName, setArtistName] = useState(""); // Nouvel état pour stocker le nom de l'artiste

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/artists/${id}/albums`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              type: "album",
              limit: 5,
            },
          }
        );
        const firstAlbumId = data.items[0].id;
        setArtistName(data.items[0].artists[0].name); // Mettez à jour le nom de l'artiste dans l'état
        console.log(firstAlbumId);
      } catch (error) {
        console.error("Erreur lors de la recherche d'artistes :", error);
      }
    };

    getAlbum(); // Appelez la fonction getAlbum dans useEffect pour qu'elle s'exécute après le rendu initial
  }, [id, token]); // Assurez-vous d'inclure id et token dans la liste des dépendances

  return (
    <div>
      <NavLink to={"/"}>
        <p>Return to homepage</p>
      </NavLink>
      {/* Utilisez artistName dans votre JSX pour afficher le nom de l'artiste */}
      <h1>Album of {artistName}</h1>
    </div>
  );
};

export default Album;
