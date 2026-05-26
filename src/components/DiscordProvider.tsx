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

        if (!sdk) {
          console.log("Not in browser");
          return;
        }

        await sdk.ready();

        // 🔥 REAL CHECK (important)
        const isActivity = Boolean(
          new URLSearchParams(window.location.search).get("frame_id"),
        );

        if (!isActivity) {
          console.log("Running in normal web mode (not Activity)");
          return;
        }

        console.log("CipherLine running inside Discord Activity");
      } catch (err) {
        console.log("Discord init failed", err);
      }
    }

    init();
  }, []);

  return <>{children}</>;
}
