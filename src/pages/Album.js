import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Album = () => {
  let token = window.localStorage.getItem("token");
  const id = window.location.pathname.split("/")[2];

  const getAlbum = async () => {
    try {
      await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      // Gérer les erreurs de l'API ici, par exemple, afficher un message d'erreur à l'utilisateur
      console.error("Erreur lors de la recherche d'artistes :", error);
      // Vous pouvez également afficher un message d'erreur à l'utilisateur ou effectuer d'autres actions ici
    }
  };
  console.log(id);

  return (
    <div>
      <NavLink to={"/"}>
        <p>Return to homepage</p>
      </NavLink>
      <h1 onClick={getAlbum}>album</h1>
    </div>
  );
};

export default Album;
