import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-black border-b border-white/10 px-6 py-3 flex justify-between items-center">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <span className="text-white font-bold text-lg flex items-center gap-2">
          🎧 Streamify
        </span>

        <Link to="/" className="text-white/80 hover:text-white">
          Home
        </Link>

        <Link to="/podcasts" className="text-white/80 hover:text-white">
          Podcasts
        </Link>
        <Link to="/playlists">Playlists</Link>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link
              to="/login"
              className="px-4 py-1 rounded bg-white/10 hover:bg-white/20"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-1 rounded bg-green-600 hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              to="/upload-track"
              className="text-white/80 hover:text-white"
            >
              Upload Track
            </Link>

            <Link
              to="/upload-podcast"
              className="text-white/80 hover:text-white"
            >
              Upload Podcast
            </Link>

            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}
