import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { usePlayer } from "../context/PlayerContext";
import { useAuth } from "../context/AuthContext";
import { usePlaylists } from "../context/PlaylistContext";
import SearchBar from "../components/common/SearchBar";
import LikeButton from "../components/music/LikeButton";
import Loader from "../components/common/Loader";

export default function Home() {
  const { play } = usePlayer();
  const { user } = useAuth();
  const { playlists, addToPlaylist } = usePlaylists();

  const [tracks, setTracks] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase.from("tracks").select("*");
      if (fetchErr) throw fetchErr;
      setTracks(data || []);
    } catch (err) {
      console.error("Error fetching tracks:", err.message);
      setError("Unable to load tracks. Please check your connection or backend environment.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTrack = async (track) => {
    if (!confirm(`Delete "${track.title}"?`)) return;
    setDeletingId(track.id);
    try {
      const { error: deleteErr } = await supabase.from("tracks").delete().eq("id", track.id);
      if (deleteErr) throw deleteErr;
      fetchTracks();
    } catch (err) {
      console.error("Error deleting track:", err.message);
      alert(`Error deleting track: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = tracks.filter((t) =>
    (t.title || "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 pb-32">
      <SearchBar
        value={q}
        onChange={setQ}
        placeholder="Search music..."
      />

      {error && (
        <div className="p-4 mb-4 bg-red-950/60 border border-red-800 text-red-300 rounded text-sm">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <Loader message="Loading tracks..." />
      ) : tracks.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <p className="text-lg font-medium text-zinc-300 mb-1">No tracks available</p>
          <p className="text-sm">Music will appear here when tracks are added.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <p className="text-lg font-medium text-zinc-300 mb-1">No results found</p>
          <p className="text-sm">Try a different search term.</p>
        </div>
      ) : (
        filtered.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center p-3 bg-zinc-800 mb-2 rounded border border-zinc-700 hover:border-zinc-600 transition-colors"
          >
            <span className="font-medium text-white">{t.title}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => play(t)}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white font-medium text-sm transition-colors"
              >
                Play
              </button>

              {user && playlists.length > 0 && (
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addToPlaylist(e.target.value, t.id);
                      e.target.value = "";
                    }
                  }}
                  className="bg-zinc-700 text-sm px-2 py-1 rounded text-white focus:outline-none"
                >
                  <option value="">Add to playlist</option>
                  {playlists.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )}

              <LikeButton itemId={t.id} type="track" />

              {user && (
                <button
                  onClick={() => deleteTrack(t)}
                  disabled={deletingId === t.id}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm transition-colors"
                >
                  {deletingId === t.id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
