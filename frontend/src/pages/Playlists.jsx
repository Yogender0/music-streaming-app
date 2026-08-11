import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { usePlayer } from "../context/PlayerContext";
import { usePlaylists } from "../context/PlaylistContext";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

export default function Playlists() {
  const { play } = usePlayer();
  const { playlists, loading: playlistsLoading, error: playlistsError, createPlaylist, deletePlaylist, removeFromPlaylist } = usePlaylists();
  const { user } = useAuth();

  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [tracksLoading, setTracksLoading] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingPlaylist, setDeletingPlaylist] = useState(false);
  const [removingTrackId, setRemovingTrackId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (selectedPlaylist) {
      loadTracks(selectedPlaylist.id);
    } else {
      setTracks([]);
    }
  }, [selectedPlaylist]);

  const loadTracks = async (playlistId) => {
    setTracksLoading(true);
    try {
      const { data, error } = await supabase
        .from("playlist_items")
        .select("tracks(*)")
        .eq("playlist_id", playlistId);

      if (error) throw error;
      setTracks(data ? data.map((d) => d.tracks).filter(Boolean) : []);
    } catch (err) {
      console.error("Error loading playlist tracks:", err.message);
      setFeedback({ type: "error", message: `Failed to load tracks: ${err.message}` });
    } finally {
      setTracksLoading(false);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) {
      setFeedback({ type: "error", message: "Playlist name cannot be empty." });
      return;
    }

    try {
      setCreating(true);
      setFeedback(null);
      await createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
      setFeedback({ type: "success", message: "Playlist created successfully! ✅" });
    } catch (err) {
      setFeedback({ type: "error", message: err.message || "Failed to create playlist." });
    } finally {
      setCreating(false);
    }
  };

  const handleDeletePlaylist = async (playlist) => {
    if (!confirm(`Are you sure you want to delete playlist "${playlist.name}"?`)) return;

    try {
      setDeletingPlaylist(true);
      setFeedback(null);
      await deletePlaylist(playlist.id);
      if (selectedPlaylist?.id === playlist.id) {
        setSelectedPlaylist(null);
        setTracks([]);
      }
      setFeedback({ type: "success", message: `Playlist "${playlist.name}" deleted. ✅` });
    } catch (err) {
      setFeedback({ type: "error", message: err.message || "Failed to delete playlist." });
    } finally {
      setDeletingPlaylist(false);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    if (!selectedPlaylist) return;

    try {
      setRemovingTrackId(trackId);
      setFeedback(null);
      await removeFromPlaylist(selectedPlaylist.id, trackId);
      setTracks((prev) => prev.filter((t) => t.id !== trackId));
    } catch (err) {
      console.error("Error removing track from playlist:", err.message);
      setFeedback({ type: "error", message: `Failed to remove track: ${err.message}` });
    } finally {
      setRemovingTrackId(null);
    }
  };

  return (
    <div className="p-6 pb-32">
      <h1 className="text-xl font-bold mb-4 text-white">🎵 My Playlists</h1>

      {/* CREATE PLAYLIST FORM */}
      {user ? (
        <form onSubmit={handleCreatePlaylist} className="mb-6 max-w-md">
          <div className="flex gap-2">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="New playlist name..."
              className="flex-1 p-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              disabled={creating}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium transition-colors disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
          {feedback && (
            <p
              className={`mt-2 text-sm ${
                feedback.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {feedback.message}
            </p>
          )}
        </form>
      ) : (
        <p className="text-zinc-400 mb-6">Log in to create and manage playlists.</p>
      )}

      {playlistsError && (
        <div className="p-4 mb-4 bg-red-950/60 border border-red-800 text-red-300 rounded text-sm">
          ⚠️ {playlistsError}
        </div>
      )}

      {playlistsLoading ? (
        <Loader message="Loading playlists..." />
      ) : playlists.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <p className="text-lg font-medium text-zinc-300 mb-1">No playlists yet</p>
          <p className="text-sm">Create your first playlist to get started.</p>
        </div>
      ) : (
        <>
          {/* PLAYLIST BUTTONS */}
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            {playlists.map((p) => (
              <div key={p.id} className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedPlaylist(p)}
                  className={`px-3 py-1 rounded transition-colors ${
                    selectedPlaylist?.id === p.id
                      ? "bg-green-600 text-white font-medium"
                      : "bg-zinc-700 text-zinc-200 hover:bg-zinc-600"
                  }`}
                >
                  {p.name}
                </button>
                {selectedPlaylist?.id === p.id && (
                  <button
                    onClick={() => handleDeletePlaylist(p)}
                    disabled={deletingPlaylist}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs rounded transition-colors"
                    title="Delete playlist"
                  >
                    {deletingPlaylist ? "..." : "✕"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* TRACKS IN SELECTED PLAYLIST */}
          {selectedPlaylist && (
            <div>
              <h2 className="text-lg font-semibold mb-3 text-zinc-200">
                Tracks in "{selectedPlaylist.name}"
              </h2>

              {tracksLoading ? (
                <Loader message="Loading tracks..." />
              ) : tracks.length === 0 ? (
                <p className="text-zinc-400">No tracks in this playlist</p>
              ) : (
                tracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex justify-between items-center bg-zinc-800 p-3 mb-2 rounded border border-zinc-700"
                  >
                    <span className="text-white">{track.title}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => play(track)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
                      >
                        Play
                      </button>
                      <button
                        onClick={() => handleRemoveTrack(track.id)}
                        disabled={removingTrackId === track.id}
                        className="bg-zinc-700 hover:bg-red-700 disabled:opacity-50 px-3 py-1 rounded text-white text-sm transition-colors"
                      >
                        {removingTrackId === track.id ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
