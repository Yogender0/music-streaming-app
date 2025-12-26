import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("tracks")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json([]); // ALWAYS array
  }

  res.json(data ?? []);
});

export default router;
