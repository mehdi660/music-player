import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TracksCard from "../components/TracksCard";
import Header from "../components/Header";

const Tracks = () => {
  const { id } = useParams();
  const token = window.localStorage.getItem("token");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Vérifier si les données sont déjà en cache
        const cachedData = localStorage.getItem(`tracksData_${id}`);
        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          const { data } = await axios.get(
            `https://api.spotify.com/v1/albums/${id}/tracks`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(data);
          // Mettre les données en cache
          localStorage.setItem(`tracksData_${id}`, JSON.stringify(data));
        }
      } catch (error) {
        console.error("Erreur lors de la recherche de son :", error);
      }
    };

    fetchData();
  }, [id, token]);

  return (
    <div>
      <Header />
      {data && <TracksCard data={data} />}
    </div>
  );
};

export default Tracks;
