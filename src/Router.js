import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Player from "./pages/Player";
import Trending from "./pages/Trending";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/player" element={<Player />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
