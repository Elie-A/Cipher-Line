import { DiscordSDK } from "@discord/embedded-app-sdk";

export const discordSdk = new DiscordSDK(
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
);
