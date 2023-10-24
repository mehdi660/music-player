import React from "react";
import { useEffect, useState } from "react";

const App = () => {
  const CLIENT_ID = "c6b658ec1b5544829e1049238a9b6d0a";
  const REDIRECT_URI = "http://localhost:3001/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

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
      setToken(token);
    }
  }, []);

  return (
    <main>
      <h1>Hello world</h1>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to spotify
        </a>
      ) : (
        <button>Logout</button>
      )}
    </main>
  );
};

export default App;
