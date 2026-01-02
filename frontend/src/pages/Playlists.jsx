import { useEffect, useState } from "react";
import React from "react";
import { supabase } from "../supabaseClient";
import { usePlayer } from "../context/PlayerContext";
import { usePlaylists } from "../context/PlaylistContext";

export default function Playlists() {
  const { play } = usePlayer();
  const { playlists } = usePlaylists();

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (selectedPlaylist) loadTracks(selectedPlaylist.id);
  }, [selectedPlaylist]);

  const loadTracks = async (playlistId) => {
    const { data, error } = await supabase
      .from("playlist_items")
      .select("tracks(*)")
      .eq("playlist_id", playlistId);

    if (error) {
      console.error(error);
      return;
    }

    setTracks(data.map(d => d.tracks));
  };

  return (
    <div className="p-6 pb-32">
      <h1 className="text-xl mb-4">🎵 My Playlists</h1>

      {/* PLAYLIST LIST */}
      <div className="mb-6">
        {playlists.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPlaylist(p)}
            className={`mr-2 mb-2 px-3 py-1 rounded ${
              selectedPlaylist?.id === p.id
                ? "bg-green-600"
                : "bg-zinc-700"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* TRACKS IN PLAYLIST */}
      {tracks.length === 0 && selectedPlaylist && (
        <p className="text-zinc-400">No tracks in this playlist</p>
      )}

      {tracks.map(track => (
        <div
          key={track.id}
          className="flex justify-between bg-zinc-800 p-3 mb-2 rounded"
        >
          <span>{track.title}</span>
          <button
            onClick={() => play(track)}
            className="bg-green-600 px-3 rounded"
          >
            Play
          </button>
        </div>
      ))}
    </div>
  );
}
