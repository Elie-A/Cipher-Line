import { useEffect, useState } from "react";
import { isDiscordActivity } from "./isDiscordActivity";

export function useActivityMode() {
  const [ready, setReady] = useState(false);
  const [isActivity, setIsActivity] = useState(false);

  useEffect(() => {
    const active = isDiscordActivity();
    setIsActivity(active);
    setReady(true);
  }, []);

  return {
    ready,
    isActivity,
    isWeb: ready && !isActivity,
  };
}
