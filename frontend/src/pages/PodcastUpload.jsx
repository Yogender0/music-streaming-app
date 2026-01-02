import { useState } from "react";
import React from "react";
import { supabase } from "../supabaseClient";

export default function PodcastUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const uploadPodcast = async () => {
    if (!file || !title) return alert("Missing fields");

    const filePath = `podcasts/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("audio")
      .upload(filePath, file);

    if (error) return alert(error.message);

    const { data } = supabase.storage.from("audio").getPublicUrl(filePath);

    await supabase.from("podcasts").insert({
      title,
      description,
      audio_url: data.publicUrl,
    });

    alert("Podcast uploaded");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold mb-4">Upload Podcast</h1>

      <input
        className="block mb-2 p-2 text-black"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="block mb-2 p-2 text-black"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadPodcast}
        className="mt-4 bg-green-600 px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
