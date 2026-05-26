import { getDiscordSdk } from "./sdk";

export async function initDiscord() {
  try {
    const discordSdk = getDiscordSdk();

    if (!discordSdk) {
      console.log("Not in Discord environment");
      return null;
    }

    await discordSdk.ready();

    const auth = await discordSdk.commands.authenticate({
      access_token: null,
    });

    console.log("Discord auth success:", auth);

    return auth;
  } catch (err) {
    console.log("Discord init failed or not in Activity", err);
    return null;
  }
}
