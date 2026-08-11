import express from "express";
import cors from "cors";
import tracksRoutes from "./routes/tracks.routes.js";
import playlistsRoutes from "./routes/playlists.routes.js";
import podcastsRoutes from "./routes/podcasts.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
  res.status(200).send("Music Streaming Backend Running");
});

// API Routes
app.use("/api/tracks", tracksRoutes);
app.use("/api/playlists", playlistsRoutes);
app.use("/api/podcasts", podcastsRoutes);
app.use("/api/admin", adminRoutes);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global Centralized Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error"
  });
});

export default app;
