import { useEffect, useState } from "react";
import React from "react";
import { supabase } from "../supabaseClient";
import { usePlayer } from "../context/PlayerContext";
import { useAuth } from "../context/AuthContext";

export default function Podcasts() {
  const { play } = usePlayer();
  const { user } = useAuth();

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    const { data } = await supabase.from("podcasts").select("*");
    setPodcasts(data || []);
  };

  const deletePodcast = async (p) => {
    if (!confirm("Delete this podcast?")) return;

    await supabase.from("podcasts").delete().eq("id", p.id);
    fetchPodcasts();
  };

  const likePodcast = async (p) => {
    await supabase.from("likes").insert({
      user_id: user.id,
      track_id: p.id,
      type: "podcast",
    });
    alert("Liked ❤️");
  };

  return (
    <div className="p-6 pb-32">
      <h1 className="text-xl mb-4">🎙 Podcasts</h1>

      {podcasts.map(p => (
        <div
          key={p.id}
          className="flex justify-between items-center p-3 bg-zinc-800 mb-2 rounded"
        >
          <div>
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-zinc-400">{p.description}</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => play(p)}
              className="bg-green-600 px-3 rounded"
            >
              Play
            </button>

            {user && (
              <button
                onClick={() => likePodcast(p)}
                className="px-3 rounded bg-pink-600"
              >
                ❤️
              </button>
            )}

            {user && (
              <button
                onClick={() => deletePodcast(p)}
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
