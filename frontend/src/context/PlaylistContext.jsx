import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import React from "react";
import { useAuth } from "./AuthContext";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (user) fetchPlaylists();
  }, [user]);

  const fetchPlaylists = async () => {
    const { data } = await supabase
      .from("playlists")
      .select("*")
      .eq("user_id", user.id);

    setPlaylists(data || []);
  };

  const createPlaylist = async (name) => {
    await supabase.from("playlists").insert({
      name,
      user_id: user.id,
    });
    fetchPlaylists();
  };

  const addToPlaylist = async (playlistId, trackId) => {
    await supabase.from("playlist_items").insert({
  playlist_id: playlistId,
  track_id: trackId,
});

    alert("Added to playlist ✅");
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, createPlaylist, addToPlaylist }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistContext);
