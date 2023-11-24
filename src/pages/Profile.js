import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
const Profile = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProfile();
  }, [token]);
  return (
    <>
      <Header />
      <main>
        <h1>Profile</h1>
        <p>Your name is {data.display_name}</p>
      </main>
    </>
  );
};
export default Profile;
