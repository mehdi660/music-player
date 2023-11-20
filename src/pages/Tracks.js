import React from "react";

import axios from "axios";

const Tracks = ({ id, album }) => {
  const token = window.localStorage.getItem("token");

  React.useEffect(() => {
    const getTracks = async () => {
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/albums/${id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la recherche de son :", error);
      }
    };

    getTracks();
  }, [id, token]);

  return (
    <div>
      <h1>{}</h1>
    </div>
  );
};

export default Tracks;
