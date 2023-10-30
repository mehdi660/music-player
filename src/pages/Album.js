import React from "react";
import { NavLink } from "react-router-dom";

const Album = () => {
  return (
    <div>
      <NavLink to={"/"}>
        <p>Return to homepage</p>
      </NavLink>
      <h1>album</h1>
    </div>
  );
};

export default Album;
