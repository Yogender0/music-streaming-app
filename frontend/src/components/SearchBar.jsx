import React from "react";
export default function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search music or podcasts..."
      className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 text-white"
    />
  );
}
