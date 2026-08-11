import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { useAuth } from "./AuthContext";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (user) fetchPlaylists();
    else setPlaylists([]);
  }, [user]);

  const fetchPlaylists = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("playlists")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching playlists:", error.message);
      return;
    }

    setPlaylists(data || []);
  };

  const createPlaylist = async (name) => {
    if (!user) throw new Error("Authentication required to create a playlist");
    if (!name.trim()) throw new Error("Playlist name cannot be empty");

    const { error } = await supabase.from("playlists").insert({
      name: name.trim(),
      user_id: user.id,
    });

    if (error) {
      console.error("Error creating playlist:", error.message);
      throw new Error(error.message);
    }

    await fetchPlaylists();
  };

  const addToPlaylist = async (playlistId, trackId) => {
    if (!user) return alert("Please login to add tracks to playlist");

    const { error } = await supabase.from("playlist_items").insert({
      playlist_id: playlistId,
      track_id: trackId,
    });

    if (error) {
      alert(`Error adding to playlist: ${error.message}`);
    } else {
      alert("Added to playlist ✅");
    }
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, createPlaylist, addToPlaylist, fetchPlaylists }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistContext);
