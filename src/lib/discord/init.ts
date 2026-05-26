import { discordSdk } from "./sdk";

export async function initDiscord() {
  try {
    await discordSdk.ready();

    const auth = await discordSdk.commands.authenticate({
      access_token: null, // handled by Discord Activity runtime
    });

    console.log("Discord auth success:", auth);

    return auth;
  } catch (err) {
    console.log("Not running inside Discord Activity", err);
    return null;
  }
}
