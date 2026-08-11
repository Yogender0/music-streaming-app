import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

/**
 * GET /api/tracks
 * Retrieves list of tracks from database
 */
router.get("/", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("tracks")
      .select("*");

    if (error) {
      console.error("Supabase error fetching tracks:", error.message);
      return res.status(500).json({ error: "Failed to fetch tracks" });
    }

    res.status(200).json(data || []);
  } catch (err) {
    next(err);
  }
});

export default router;
