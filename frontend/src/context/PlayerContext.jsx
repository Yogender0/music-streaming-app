import { createContext, useContext, useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import React from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const waveRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Resume last played
  useEffect(() => {
    const last = localStorage.getItem("lastTrack");
    if (last) setCurrent(JSON.parse(last));
  }, []);

  const play = (track) => {
    setCurrent(track);
    localStorage.setItem("lastTrack", JSON.stringify(track));

    setTimeout(() => {
      const container = document.getElementById("global-wave");
      if (!container) return;

      if (waveRef.current) {
        waveRef.current.destroy();
      }

      waveRef.current = WaveSurfer.create({
        container,
        waveColor: "#555",
        progressColor: "#22c55e",
        cursorColor: "#22c55e",
        height: 80,
        responsive: true,
      });

      waveRef.current.load(track.audio_url);

      waveRef.current.on("ready", () => {
        waveRef.current.play();
        setIsPlaying(true);
      });

      waveRef.current.on("finish", () => {
        setIsPlaying(false);
      });
    }, 50);
  };

  const toggle = () => {
    if (!waveRef.current) return;
    waveRef.current.playPause();
    setIsPlaying(waveRef.current.isPlaying());
  };

  return (
    <PlayerContext.Provider value={{ play, toggle, current, isPlaying }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
