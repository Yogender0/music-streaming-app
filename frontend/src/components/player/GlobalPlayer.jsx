import React from "react";
import { usePlayer } from "../../context/PlayerContext";
import { formatTime } from "../../utils/formatTime";

export default function GlobalPlayer() {
  const {
    current,
    toggle,
    isPlaying,
    currentTime,
    duration,
    audioError,
    loadingAudio,
  } = usePlayer();

  if (!current) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-700 p-4 z-50 shadow-lg">
      <div className="flex justify-between items-center text-sm mb-2">
        <div>
          <strong className="text-white">{current.title}</strong>{" "}
          <span className="text-zinc-400">
            – {current.artist || current.description || "Unknown Artist"}
          </span>
        </div>

        {/* TIME DISPLAY */}
        <div className="text-zinc-400 text-xs font-mono">
          {loadingAudio ? (
            <span className="text-yellow-400">Loading audio...</span>
          ) : (
            `${formatTime(currentTime)} / ${formatTime(duration)}`
          )}
        </div>
      </div>

      {/* AUDIO ERROR DISPLAY */}
      {audioError && (
        <div className="text-red-400 text-xs mb-2 p-1.5 bg-red-950/60 border border-red-800 rounded">
          ⚠️ {audioError}
        </div>
      )}

      {/* WAVE CONTAINER */}
      <div id="global-wave" className="w-full h-[80px]" />

      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={toggle}
          disabled={loadingAudio || !!audioError}
          className="px-5 py-1.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded font-medium transition-colors"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
