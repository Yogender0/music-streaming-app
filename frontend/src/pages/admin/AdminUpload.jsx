import React, { useState } from "react";
import { supabase } from "../../config/supabase";
import { useAuth } from "../../context/AuthContext";

export default function AdminUpload() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const upload = async (e) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim() || !file) {
      setFeedback({ type: "error", message: "Please fill in all fields and select an audio file." });
      return;
    }

    setUploading(true);
    setFeedback(null);

    try {
      const path = `tracks/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("audio")
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("audio").getPublicUrl(path);

      const { error: dbError } = await supabase.from("tracks").insert({
        title: title.trim(),
        artist: artist.trim(),
        audio_url: data.publicUrl,
        user_id: user.id,
      });

      if (dbError) throw dbError;

      setTitle("");
      setArtist("");
      setFile(null);
      setFeedback({ type: "success", message: "Track uploaded successfully! ✅" });
    } catch (err) {
      console.error("Upload error:", err.message);
      setFeedback({ type: "error", message: err.message || "Failed to upload track." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 text-white max-w-md mx-auto mt-6 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload Track</h1>

      {feedback && (
        <div
          className={`p-3 mb-4 text-sm rounded ${
            feedback.type === "success"
              ? "bg-green-950/70 border border-green-800 text-green-300"
              : "bg-red-950/70 border border-red-800 text-red-300"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <form onSubmit={upload}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          className="block mb-3 p-2.5 w-full bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-green-500"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={artist}
          placeholder="Artist"
          className="block mb-3 p-2.5 w-full bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-green-500"
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="file"
          accept="audio/*"
          className="block mb-4 p-2 w-full text-sm text-zinc-400 bg-zinc-800 border border-zinc-700 rounded cursor-pointer"
          onChange={(e) => setFile(e.target.files[0] || null)}
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2.5 rounded font-medium text-white transition-colors"
        >
          {uploading ? "Uploading..." : "Upload Track"}
        </button>
      </form>
    </div>
  );
}
