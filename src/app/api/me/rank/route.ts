import { redis } from "@/lib/game/redis";
import { leaderboardKey } from "@/lib/game/keys";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return Response.json({ error: "Missing userId" }, { status: 400 });
  }

  const key = leaderboardKey();

  // Get score
  const score = await redis.zscore(key, userId);

  if (score === null) {
    return Response.json({
      userId,
      rank: null,
      score: 0,
      total: 0,
      percentile: 0,
    });
  }

  // Rank (descending leaderboard)
  const rank = await redis.zrevrank(key, userId);

  // Total players in leaderboard
  const total = await redis.zcard(key);

  const safeRank = rank !== null ? rank + 1 : null;

  // Percentile (0 = top, 100 = bottom)
  const percentile =
    safeRank !== null && total > 0 ? Math.round((safeRank / total) * 100) : 0;

  return Response.json({
    userId,
    score,
    rank: safeRank,
    total,
    percentile,
  });
}
