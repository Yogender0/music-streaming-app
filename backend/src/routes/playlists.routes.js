import express from "express";

const router = express.Router();

/**
 * GET /api/playlists
 * Placeholder route for fetching playlists
 */
router.get("/", async (req, res, next) => {
  try {
    res.status(200).json([]);
  } catch (err) {
    next(err);
  }
});

export default router;
