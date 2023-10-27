import React from "react";
import {
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from "../config/config";

const Header = ({ token, onLogout }) => {
  return (
    <header>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <div className="btn_ctnr">
          <button onClick={onLogout} className="Btn">
            <div className="sign">
              <svg viewBox="0 0 512 512">
                {/* ...Icône de déconnexion SVG */}
              </svg>
            </div>
            <div className="text">Logout</div>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
