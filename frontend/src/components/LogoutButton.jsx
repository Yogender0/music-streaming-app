import React from "react";
import { supabase } from "../supabaseClient";

export default function LogoutButton() {
  return (
    <button
      className="bg-red-600 px-3 py-1 rounded"
      onClick={() => supabase.auth.signOut()}
    >
      Logout
    </button>
  );
}
