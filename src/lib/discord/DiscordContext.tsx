"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getDiscordSdk } from "./sdk";
import { isDiscordActivity } from "./isDiscordActivity";

type DiscordUser = {
  id: string;
  username: string;
  avatar?: string | null;
};

type DiscordContextType = {
  user: DiscordUser | null;
  isReady: boolean;
  isActivity: boolean;
};

const DiscordContext = createContext<DiscordContextType>({
  user: null,
  isReady: false,
  isActivity: false,
});

export function DiscordProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isActivity, setIsActivity] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const activity = isDiscordActivity();
        setIsActivity(activity);

        const sdk = getDiscordSdk();

        // Not in Discord → skip SDK entirely
        if (!sdk || !activity) {
          setIsReady(true);
          return;
        }

        await sdk.ready();

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
    <DiscordContext.Provider value={{ user, isReady, isActivity }}>
      {children}
    </DiscordContext.Provider>
  );
}

export function useDiscord() {
  return useContext(DiscordContext);
}
