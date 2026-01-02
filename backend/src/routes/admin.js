import express from "express";
const router = express.Router();

router.post("/upload", async (req, res) => {
  res.json({ message: "Admin upload placeholder" });
});

export default router;
