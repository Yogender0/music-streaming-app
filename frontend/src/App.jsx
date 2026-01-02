import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import GlobalPlayer from "./components/GlobalPlayer";

import Home from "./pages/Home";
import Podcasts from "./pages/Podcasts";
import Playlists from "./pages/Playlists";

// ✅ IMPORTANT: USE EXISTING FILE NAMES
import AdminUpload from "./pages/AdminUpload";
import PodcastUpload from "./pages/PodcastUpload";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/playlists" element={<Playlists />} />

        {/* ✅ UPLOAD ROUTES */}
        <Route path="/upload-track" element={<AdminUpload />} />
        <Route path="/upload-podcast" element={<PodcastUpload />} />
      </Routes>

      {/* ✅ GLOBAL PLAYER MUST BE OUTSIDE ROUTES */}
      <GlobalPlayer />
    </>
  );
}
