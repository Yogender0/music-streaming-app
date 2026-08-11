import express from "express";

const router = express.Router();

/**
 * POST /api/admin/upload
 * Placeholder admin track upload endpoint
 */
router.post("/upload", async (req, res, next) => {
  try {
    res.status(200).json({ message: "Admin upload placeholder" });
  } catch (err) {
    next(err);
  }
});

export default router;
