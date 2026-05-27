import { isDiscordActivity } from "@/lib/discord/isDiscordActivity";

let cachedDevId: string | null = null;

function getOrCreateDevId() {
  if (typeof window === "undefined") return "dev-user";

  const existing = localStorage.getItem("cipherline_dev_id");

  if (existing) return existing;

  const id = `dev-${crypto.randomUUID()}`;
  localStorage.setItem("cipherline_dev_id", id);

  return id;
}

export function getCanonicalUserId(discordUserId?: string | null) {
  const isActivity = isDiscordActivity();

  if (isActivity && discordUserId) {
    return discordUserId;
  }

  // dev fallback (stable across refreshes)
  return getOrCreateDevId();
}
