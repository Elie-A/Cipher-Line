"use client";

import { useDiscord } from "./DiscordContext";

export function useDiscordUser() {
  const { user, isReady } = useDiscord();

  return {
    user,
    isReady,
    userId: user?.id ?? null,
    username: user?.username ?? null,
    isLoggedIn: !!user,
  };
}
