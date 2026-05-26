import { REST, Routes } from "discord.js";

const token = process.env.DISCORD_TOKEN!;
const clientId = process.env.DISCORD_CLIENT_ID!;
const guildId = process.env.DISCORD_GUILD_ID!;

const commands = [
  {
    name: "cipherline",
    description: "Get today's encrypted signal",
  },
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commands,
  });

  console.log("Commands registered");
})();
