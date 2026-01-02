import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
  };

  return (
    <div className="p-6 text-white max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Login</h2>

      <input
        className="block mb-2 p-2 w-full text-black"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="block mb-4 p-2 w-full text-black"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
