import { getAuth } from "@/lib/discord/auth";

const STORAGE_KEY = "cipher_identity_v1";

type StoredIdentity = {
  id: string;
  guestId: string;
  discordId?: string;
};

function createGuestId() {
  return crypto.randomUUID();
}

function loadLocal(): StoredIdentity | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function saveLocal(data: StoredIdentity) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getIdentity(): StoredIdentity {
  const auth = getAuth();

  // 1. Discord identity (strongest)
  if (auth?.user?.id) {
    const existing = loadLocal();

    const identity: StoredIdentity = {
      id: `discord:${auth.user.id}`,
      discordId: auth.user.id,
      guestId: existing?.guestId ?? createGuestId(),
    };

    saveLocal(identity);
    return identity;
  }

  // 2. Web identity
  const existing = loadLocal();

  if (existing) return existing;

  const newIdentity: StoredIdentity = {
    id: `guest:${createGuestId()}`,
    guestId: createGuestId(),
  };

  saveLocal(newIdentity);
  return newIdentity;
}
