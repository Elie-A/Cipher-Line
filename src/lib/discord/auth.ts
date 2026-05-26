type DiscordAuth = {
  user: {
    id: string;
    username?: string;
  };
};

let cachedAuth: DiscordAuth | null = null;

export function setAuth(auth: DiscordAuth) {
  cachedAuth = auth;
}

export function getAuth(): DiscordAuth | null {
  return cachedAuth;
}
