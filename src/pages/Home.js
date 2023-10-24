import React from "react";

const Home = () => {
  const CLIENT_ID = "c6b658ec1b5544829e1049238a9b6d0a";
  const REDIRECT_URI = "http://localhost:3001";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REPONSE_TYPE = "token";

  return (
    <div>
      <h1>Hello world</h1>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&reponse_type=${REPONSE_TYPE}`}
      >
        Login to spotify
      </a>
    </div>
  );
};

export default Home;
