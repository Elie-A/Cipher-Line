import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { generateDaily } from "@/lib/game/daily";

const token = process.env.DISCORD_TOKEN!;
const clientId = process.env.DISCORD_CLIENT_ID!;
const guildId = process.env.DISCORD_GUILD_ID!;

export function registerBot() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.once("ready", () => {
    console.log(`CipherLine bot online as ${client.user?.tag}`);
  });

  client.login(token);

  return client;
}
