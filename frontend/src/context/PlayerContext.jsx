import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const waveRef = useRef(null);
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  // Resume last played track metadata on mount
  useEffect(() => {
    try {
      const last = localStorage.getItem("lastTrack");
      if (last) setCurrent(JSON.parse(last));
    } catch (e) {
      console.error("Error reading last track from localStorage:", e);
    }
  }, []);

  // Cleanup WaveSurfer instance on unmount
  useEffect(() => {
    return () => {
      if (waveRef.current) {
        try {
          waveRef.current.destroy();
        } catch (e) {
          console.error("Error destroying WaveSurfer on unmount:", e);
        }
        waveRef.current = null;
      }
    };
  }, []);

  const play = (track) => {
    if (!track || !track.audio_url) {
      setAudioError("Unable to play: Audio URL is missing.");
      setIsPlaying(false);
      return;
    }

    setCurrent(track);
    setAudioError(null);
    setLoadingAudio(true);
    setCurrentTime(0);
    setDuration(0);

    try {
      localStorage.setItem("lastTrack", JSON.stringify(track));
    } catch (e) {
      console.error("Error saving last track to localStorage:", e);
    }

    setTimeout(() => {
      const container = document.getElementById("global-wave");
      if (!container) {
        setLoadingAudio(false);
        return;
      }

      // Destroy previous WaveSurfer instance cleanly
      if (waveRef.current) {
        try {
          waveRef.current.destroy();
        } catch (e) {
          console.error("Error destroying previous WaveSurfer instance:", e);
        }
        waveRef.current = null;
      }

      try {
        const wave = WaveSurfer.create({
          container,
          waveColor: "#555",
          progressColor: "#22c55e",
          cursorColor: "#22c55e",
          height: 80,
          responsive: true,
        });

        waveRef.current = wave;

        wave.load(track.audio_url);

        wave.on("ready", () => {
          setLoadingAudio(false);
          setDuration(wave.getDuration() || 0);
          wave.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            console.error("WaveSurfer play error:", err);
            setIsPlaying(false);
          });
        });

        wave.on("audioprocess", () => {
          setCurrentTime(wave.getCurrentTime() || 0);
        });

        wave.on("timeupdate", () => {
          setCurrentTime(wave.getCurrentTime() || 0);
        });

        wave.on("finish", () => {
          setIsPlaying(false);
          setCurrentTime(0);
        });

        wave.on("error", (err) => {
          console.error("WaveSurfer audio load error:", err);
          setLoadingAudio(false);
          setIsPlaying(false);
          setAudioError("Playback error: Unable to load audio stream.");
        });
      } catch (err) {
        console.error("Failed to initialize WaveSurfer:", err);
        setLoadingAudio(false);
        setIsPlaying(false);
        setAudioError("Failed to initialize audio player.");
      }
    }, 50);
  };

  const toggle = () => {
    if (!waveRef.current) return;
    try {
      waveRef.current.playPause();
      setIsPlaying(waveRef.current.isPlaying());
    } catch (e) {
      console.error("Error toggling play/pause:", e);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        play,
        toggle,
        current,
        isPlaying,
        currentTime,
        duration,
        audioError,
        loadingAudio,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
