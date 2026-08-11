import express from "express";

const router = express.Router();

/**
 * GET /api/podcasts
 * Placeholder route for fetching podcasts
 */
router.get("/", async (req, res, next) => {
  try {
    res.status(200).json([]);
  } catch (err) {
    next(err);
  }
});

export default router;
