import { usePlayer } from "../context/PlayerContext";
import React from "react";
export default function GlobalPlayer() {
  const { current, toggle, isPlaying } = usePlayer();

  if (!current) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-700 p-4 z-50">
      <div className="text-sm mb-2">
        <strong>{current.title}</strong>{" "}
        <span className="text-zinc-400">
          – {current.artist || "Unknown Artist"}
        </span>
      </div>

      {/* ✅ WAVE CONTAINER */}
      <div id="global-wave" className="w-full h-[80px]" />

      <button
        onClick={toggle}
        className="mt-3 px-5 py-1 bg-green-600 rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
