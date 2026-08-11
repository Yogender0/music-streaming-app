import React from "react";

/**
 * Reusable Loader Component
 * Displays a loading spinner along with an optional descriptive message.
 *
 * @param {string} message - Optional text to display below the spinner (e.g. "Loading tracks...")
 */
export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col justify-center items-center py-8 gap-3">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      {message && <p className="text-zinc-400 text-sm">{message}</p>}
    </div>
  );
}
