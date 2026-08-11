/**
 * Formats a duration in seconds into a standard mm:ss string representation.
 * @param {number} seconds - Time duration in seconds
 * @returns {string} Formatted time string (e.g. "3:45")
 */
export function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
