import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("podcasts").select("*");
  if (error) return res.status(500).json(error);
  res.json(data);
});

export default router;
