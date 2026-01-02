import { supabase } from "../supabaseClient";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function LikeButton({ itemId, type }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!user) return;
    check();
  }, []);

  const check = async () => {
    const { data } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", user.id)
      .eq("item_id", itemId)
      .eq("type", type)
      .single();

    setLiked(!!data);
  };

  const toggle = async () => {
    if (!user) return alert("Login first");

    if (liked) {
      await supabase
        .from("likes")
        .delete()
        .eq("user_id", user.id)
        .eq("item_id", itemId)
        .eq("type", type);
    } else {
      await supabase.from("likes").insert({
        user_id: user.id,
        item_id: itemId,
        type,
      });
    }
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggle}
      className="text-xl"
      title="Like"
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}
