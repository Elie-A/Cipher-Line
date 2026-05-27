"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getDiscordSdk } from "./sdk";

export type DiscordUser = {
  id: string;
  username: string;
  avatar?: string | null;
};

type DiscordContextType = {
  user: DiscordUser | null;
  isReady: boolean;
};

const DiscordContext = createContext<DiscordContextType>({
  user: null,
  isReady: false,
});

export function DiscordProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const sdk = getDiscordSdk();

        if (!sdk) {
          setIsReady(true);
          return;
        }

        await sdk.ready();

        const isActivity =
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).has("frame_id");

        if (!isActivity) {
          setIsReady(true);
          return;
        }

        const auth = await sdk.commands.authenticate({
          access_token: null,
        });

        setUser({
          id: auth.user.id,
          username: auth.user.username,
          avatar: auth.user.avatar ?? null,
        });

        setIsReady(true);
      } catch (err) {
        console.log("Discord init failed", err);
        setIsReady(true);
      }
    }

    init();
  }, []);

  return (
    <DiscordContext.Provider value={{ user, isReady }}>
      {children}
    </DiscordContext.Provider>
  );
}

export function useDiscord() {
  return useContext(DiscordContext);
}
