import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const token = process.env.DISCORD_TOKEN!;
const clientId = process.env.DISCORD_CLIENT_ID!;
const guildId = process.env.DISCORD_GUILD_ID!;

const command = {
  name: "cipherline",
  description: "Decode the daily signal",
};

async function main() {
  const res = await fetch(
    `https://discord.com/api/v10/applications/${clientId}/guilds/${guildId}/commands`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    },
  );

  const data = await res.json();
  console.log(data);
}

main();
