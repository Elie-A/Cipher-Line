import { useActivityMode } from "@/lib/discord/useActivityMode";
import { useDiscordUser } from "@/lib/discord/useDiscordUser";

export function useGameMode() {
  const { isActivity, isWeb } = useActivityMode();
  const { userId, isLoggedIn } = useDiscordUser();

  return {
    mode: isActivity ? "discord" : "web",
    isDiscord: isActivity,
    isWeb,
    userId: userId ?? "guest",
    isAuthenticated: isLoggedIn,
  };
}
