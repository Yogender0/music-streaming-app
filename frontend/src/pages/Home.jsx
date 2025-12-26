import { useEffect, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";

export default function Home() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tracks")
      .then(res => res.json())
      .then(setTracks)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Music Streaming App</h1>

      {tracks.length === 0 && <p>No tracks found</p>}

      {tracks.map(track => (
        <div key={track.id} style={{ marginBottom: 20 }}>
          <p>{track.title} - {track.artist}</p>
          <AudioPlayer src={track.audio_url} />
        </div>
      ))}
    </div>
  );
}
