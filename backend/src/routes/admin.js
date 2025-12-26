import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.post("/track", async (req, res) => {
  const { title, artist, audio_url, cover_url } = req.body;

  const { data, error } = await supabase.from("tracks").insert([
    { title, artist, audio_url, cover_url }
  ]);

  if (error) return res.status(500).json(error);
  res.json(data);
});

export default router;
