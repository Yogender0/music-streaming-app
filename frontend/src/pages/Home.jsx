import { useEffect, useState } from "react";
import React from "react";
import { supabase } from "../supabaseClient";
import { usePlayer } from "../context/PlayerContext";
import { useAuth } from "../context/AuthContext";
import { usePlaylists } from "../context/PlaylistContext";

export default function Home() {
  const { play } = usePlayer();
  const { user } = useAuth();
  const { playlists, addToPlaylist } = usePlaylists();

  const [tracks, setTracks] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const { data } = await supabase.from("tracks").select("*");
    setTracks(data || []);
  };

  const deleteTrack = async (track) => {
    if (!confirm("Delete this track?")) return;
    await supabase.from("tracks").delete().eq("id", track.id);
    fetchTracks();
  };

  const likeTrack = async (track) => {
    await supabase.from("likes").insert({
      user_id: user.id,
      track_id: track.id,
      type: "track",
    });
    alert("Liked ❤️");
  };

  const filtered = tracks.filter((t) =>
    t.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-6 pb-32">
      <input
        placeholder="Search music..."
        className="w-full mb-4 p-2 bg-zinc-800 rounded"
        onChange={(e) => setQ(e.target.value)}
      />

      {filtered.map((t) => (
        <div
          key={t.id}
          className="flex justify-between items-center p-3 bg-zinc-800 mb-2 rounded"
        >
          <span>{t.title}</span>

          <div className="flex gap-2">
            <button
              onClick={() => play(t)}
              className="bg-green-600 px-3 rounded"
            >
              Play
            </button>

            {playlists.length > 0 && (
              <select
                onChange={(e) => addToPlaylist(e.target.value, t.id)}
                className="bg-zinc-700 text-sm px-2 rounded"
              >
                <option>Add to playlist</option>
                {playlists.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}

            {user && (
              <button
                onClick={() => likeTrack(t)}
                className="px-3 rounded bg-pink-600"
              >
                ❤️
              </button>
            )}

            {user && (
              <button
                onClick={() => deleteTrack(t)}
                className="px-3 rounded bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
