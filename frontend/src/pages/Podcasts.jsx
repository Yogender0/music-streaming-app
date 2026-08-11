import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { usePlayer } from "../context/PlayerContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/common/SearchBar";
import LikeButton from "../components/music/LikeButton";
import Loader from "../components/common/Loader";

export default function Podcasts() {
  const { play } = usePlayer();
  const { user } = useAuth();

  const [podcasts, setPodcasts] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase.from("podcasts").select("*");
      if (fetchErr) throw fetchErr;
      setPodcasts(data || []);
    } catch (err) {
      console.error("Error fetching podcasts:", err.message);
      setError("Unable to load podcasts. Please check your connection or backend environment.");
    } finally {
      setLoading(false);
    }
  };

  const deletePodcast = async (p) => {
    if (!confirm(`Delete podcast "${p.title}"?`)) return;

    setDeletingId(p.id);
    try {
      const { error: deleteErr } = await supabase.from("podcasts").delete().eq("id", p.id);
      if (deleteErr) throw deleteErr;
      fetchPodcasts();
    } catch (err) {
      console.error("Error deleting podcast:", err.message);
      alert(`Error deleting podcast: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = podcasts.filter((p) =>
    (p.title || "").toLowerCase().includes(q.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 pb-32">
      <h1 className="text-xl font-bold mb-4 text-white">🎙 Podcasts</h1>

      <SearchBar
        value={q}
        onChange={setQ}
        placeholder="Search podcasts..."
      />

      {error && (
        <div className="p-4 mb-4 bg-red-950/60 border border-red-800 text-red-300 rounded text-sm">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <Loader message="Loading podcasts..." />
      ) : podcasts.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <p className="text-lg font-medium text-zinc-300 mb-1">No podcasts available</p>
          <p className="text-sm">Podcasts will appear here when they are added.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <p className="text-lg font-medium text-zinc-300 mb-1">No results found</p>
          <p className="text-sm">Try a different search term.</p>
        </div>
      ) : (
        filtered.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center p-3 bg-zinc-800 mb-2 rounded border border-zinc-700 hover:border-zinc-600 transition-colors"
          >
            <div>
              <div className="font-semibold text-white">{p.title}</div>
              <div className="text-sm text-zinc-400">{p.description}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => play(p)}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white font-medium text-sm transition-colors"
              >
                Play
              </button>

              <LikeButton itemId={p.id} type="podcast" />

              {user && (
                <button
                  onClick={() => deletePodcast(p)}
                  disabled={deletingId === p.id}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm transition-colors"
                >
                  {deletingId === p.id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
