export function isDiscordActivity() {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);

  return params.has("frame_id");
}
