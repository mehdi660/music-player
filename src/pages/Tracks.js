import React from "react";
import Header from "../components/Header";

const Tracks = (album) => {
  const token = window.localStorage.getItem("token");
  const id = window.location.pathname.split("/")[2];
  const [artistName, setArtistName] = React.useState("");
  const [tracks, setTracks] = React.useState([]);

  // React.useEffect(() => {
  //   const getTracks = async () => {
  //     try {
  //       const { data } = await React.axios.get(
  //         `https://api.spotify.com/v1/tracks/${id}/`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //           params: {
  //             type: "track",
  //           },
  //         }
  //       );
  //       if (data.items && data.items.length > 0) {
  //         setArtistName(data.items[0].artists[0].name);
  //         setTracks(data.items);
  //       } else {
  //         console.error("Aucun son trouvé.");
  //       }
  //     } catch (error) {
  //       console.error("Erreur lors de la recherche de son :", error);
  //     }
  //   };

  //   getTracks();
  // }, [id, token]);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Tracks;
