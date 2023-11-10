import React from "react";

const Tracks = (album) => {
  const token = window.localStorage.getItem("token");
  const id = window.location.pathname.split("/")[2];

  React.useEffect(() => {
    const getTracks = async () => {
      try {
        const { data } = await React.axios.get(
          `https://api.spotify.com/v1/tracks/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              type: "track",
            },
          }
        );
      } catch (error) {
        console.error("Erreur lors de la recherche d'albums :", error);
      }
    };

    getTracks();
  }, [id, token]);

  return <div></div>;
};

export default Tracks;
