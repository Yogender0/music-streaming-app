import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, user_id } = req.body;
  const { data, error } = await supabase
    .from("playlists")
    .insert([{ name, user_id }]);

  if (error) return res.status(500).json(error);
  res.json(data);
});

export default router;
