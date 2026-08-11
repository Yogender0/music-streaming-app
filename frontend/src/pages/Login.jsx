import React, { useState } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: loginErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (loginErr) {
      setError(loginErr.message || "Invalid credentials.");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="p-6 text-white max-w-sm mx-auto mt-10 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <div className="p-3 mb-4 bg-red-950/70 border border-red-800 text-red-300 text-sm rounded">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          className="block mb-3 p-2.5 w-full bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-green-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          className="block mb-4 p-2.5 w-full bg-zinc-800 border border-zinc-700 text-white rounded focus:outline-none focus:border-green-500"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2.5 rounded font-medium text-white transition-colors"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
