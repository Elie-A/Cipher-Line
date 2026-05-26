"use client";

import { useEffect } from "react";
import { getDiscordSdk } from "@/lib/discord/sdk";

export default function DiscordProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    async function init() {
      try {
        const sdk = getDiscordSdk();

        if (!sdk) return;

        await sdk.ready();

        console.log("CipherLine running inside Discord Activity");
      } catch (err) {
        console.log("Not in Discord Activity mode");
      }
    }

    init();
  }, []);

  return <>{children}</>;
}
