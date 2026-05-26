"use client";

import { useEffect } from "react";
import { discordSdk } from "@/lib/discord/sdk";
import { setAuth } from "@/lib/discord/auth";

export default function DiscordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    async function init() {
      try {
        await discordSdk.ready();

        const auth = await discordSdk.commands.authenticate({
          access_token: null,
        });

        setAuth(auth);
      } catch {
        // normal web mode
      }
    }

    init();
  }, []);

  return <>{children}</>;
}
