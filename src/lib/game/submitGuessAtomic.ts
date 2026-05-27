import { redis } from "./redis";
import { statsKey, leaderboardKey } from "./keys";
import type { UserStats } from "./types";

type Input = {
  userId: string;
  date: string;
  correct: boolean;
  attempts: number;
};

export async function submitGuessAtomic({
  userId,
  date,
  correct,
  attempts,
}: {
  userId: string;
  date: string;
  correct: boolean;
  attempts: number;
}) {
  if (!correct) {
    return {
      score: 0,
      rank: null,
    };
  }

  // consistent scoring
  const score = Math.max(1, 10 - attempts);

  await redis.zincrby("leaderboard:global", score, userId);

  const rank = await redis.zrevrank("leaderboard:global", userId);

  return {
    score,
    rank: rank !== null ? rank + 1 : null,
  };
}
