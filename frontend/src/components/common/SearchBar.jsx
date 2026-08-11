import React from "react";

/**
 * Reusable SearchBar component
 *
 * @param {string} value - Current query value
 * @param {function} onChange - Callback function on input change
 * @param {string} placeholder - Input placeholder text
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search music or podcasts...",
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-green-500"
    />
  );
}
