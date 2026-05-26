import { getDiscordSdk } from "./sdk";

export async function initDiscord() {
  try {
    const sdk = getDiscordSdk();

    if (!sdk) return null;

    await sdk.ready();

    const auth = await sdk.commands.authenticate({
      access_token: null,
    });

    console.log("Activity ready:", auth);

    return auth;
  } catch (err) {
    console.log("Not in Discord Activity", err);
    return null;
  }
}
