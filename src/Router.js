import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Player from "./pages/Player";
import Trending from "./pages/Trending";
import Album from "./pages/Album";
import Library from "./pages/Library";
import Tracks from "./pages/Tracks";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/player" element={<Player />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/library" element={<Library />} />
        <Route path="/tracks/:id" element={<Tracks />} />
        {/* Utilisez :id pour capturer l'ID de l'artiste dans l'URL */}
        <Route path="/albums/:id" element={<Album />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
