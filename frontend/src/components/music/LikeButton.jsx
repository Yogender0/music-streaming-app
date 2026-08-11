import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { useAuth } from "../../context/AuthContext";

/**
 * Reusable Like Button Component
 * Handles checking existing like state, toggling likes, updating Supabase 'likes' table,
 * and preventing duplicate like records.
 *
 * @param {string} itemId - ID of track or podcast
 * @param {string} type - "track" or "podcast"
 */
export default function LikeButton({ itemId, type = "track" }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !itemId) {
      setLiked(false);
      return;
    }
    checkLikeStatus();
  }, [user, itemId, type]);

  const checkLikeStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("user_id", user.id)
        .eq("track_id", itemId)
        .eq("type", type)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking like status:", error.message);
      }
      setLiked(!!data);
    } catch (err) {
      console.error("Like check error:", err);
    }
  };

  const toggleLike = async () => {
    if (!user) {
      alert("Please log in to like items.");
      return;
    }
    if (loading || !itemId) return;

    setLoading(true);
    try {
      if (liked) {
        // Remove from likes table
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("track_id", itemId)
          .eq("type", type);

        if (error) {
          console.error("Error unliking:", error.message);
          return;
        }
        setLiked(false);
      } else {
        // Insert into likes table
        const { error } = await supabase.from("likes").insert({
          user_id: user.id,
          track_id: itemId,
          type,
        });

        if (error) {
          console.error("Error liking:", error.message);
          return;
        }
        setLiked(true);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-lg transition-colors disabled:opacity-50"
      title={liked ? "Unlike" : "Like"}
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}
