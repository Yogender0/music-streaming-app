import { useState } from "react";
import React from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function AdminUpload() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);

  const upload = async () => {
    const path = `tracks/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("audio")
      .upload(path, file);

    if (uploadError) return alert(uploadError.message);

    const { data } = supabase.storage.from("audio").getPublicUrl(path);

    await supabase.from("tracks").insert({
      title,
      artist,
      audio_url: data.publicUrl,
      user_id: user.id, // 🔥 RLS FIX
    });

    alert("Track uploaded");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl mb-4">Upload Track</h1>

      <input
        placeholder="Title"
        className="block mb-2 p-2 text-black"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Artist"
        className="block mb-2 p-2 text-black"
        onChange={(e) => setArtist(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={upload}
        className="block mt-3 bg-green-600 px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
