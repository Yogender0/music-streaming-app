import express from "express";
import cors from "cors";
import tracksRoutes from "./routes/tracks.js";
import podcastsRoutes from "./routes/podcasts.js";
import playlistsRoutes from "./routes/playlists.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tracks", tracksRoutes);
app.use("/api/podcasts", podcastsRoutes);
app.use("/api/playlists", playlistsRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Music Streaming Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
