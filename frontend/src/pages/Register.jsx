import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for verification link");
    }
  };

  return (
    <div className="p-6 text-white max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Register</h2>

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
        onClick={handleRegister}
      >
        Register
      </button>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link className="text-blue-400" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
