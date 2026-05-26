import { getAuth } from "@/lib/discord/auth";

function getOrCreateGuestId(): string {
  if (typeof window === "undefined") return "guest";

  let id = localStorage.getItem("cipher_guest_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("cipher_guest_id", id);
  }

  return id;
}

export function getUserId(): string {
  const auth = getAuth();

  // 1. Discord user (highest priority)
  if (auth?.user?.id) {
    return `discord:${auth.user.id}`;
  }

  // 2. fallback guest
  return `guest:${getOrCreateGuestId()}`;
}
