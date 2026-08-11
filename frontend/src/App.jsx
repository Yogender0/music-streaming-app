import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import GlobalPlayer from "./components/player/GlobalPlayer";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/Home";
import Podcasts from "./pages/Podcasts";
import Playlists from "./pages/Playlists";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminUpload from "./pages/admin/AdminUpload";
import PodcastUpload from "./pages/admin/PodcastUpload";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* AUTHENTICATION PROTECTED UPLOAD ROUTES */}
        <Route
          path="/upload-track"
          element={
            <ProtectedRoute>
              <AdminUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-podcast"
          element={
            <ProtectedRoute>
              <PodcastUpload />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* GLOBAL PLAYER MUST BE OUTSIDE ROUTES */}
      <GlobalPlayer />
    </>
  );
}
