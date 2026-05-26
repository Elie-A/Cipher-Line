import { redis } from "@/lib/game/redis";
import { leaderboardKey } from "@/lib/game/keys";

export async function GET() {
  const raw = await redis.zrange(leaderboardKey(), 0, 9, {
    rev: true,
    withScores: true,
  });

  const leaderboard = [];

  for (let i = 0; i < raw.length; i += 2) {
    leaderboard.push({
      userId: raw[i],
      score: raw[i + 1],
    });
  }

  return Response.json({ leaderboard });
}
