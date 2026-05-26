import { DiscordSDK } from "@discord/embedded-app-sdk";

let discordSdk: DiscordSDK | null = null;

export function getDiscordSdk() {
  if (typeof window === "undefined") return null;

  if (!discordSdk) {
    discordSdk = new DiscordSDK(process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
  }

  return discordSdk;
}
