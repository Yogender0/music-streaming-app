import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WavePlayer({ url }) {
  const ref = useRef();

  useEffect(() => {
    const wave = WaveSurfer.create({
      container: ref.current,
      waveColor: "#555",
      progressColor: "#22c55e",
      height: 80,
      responsive: true,
    });

    wave.load(url);

    return () => wave.destroy();
  }, [url]);

  return <div ref={ref} />;
}
