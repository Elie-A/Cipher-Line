"use client";

import { DiscordProvider } from "@/lib/discord/DiscordContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DiscordProvider>{children}</DiscordProvider>;
}
