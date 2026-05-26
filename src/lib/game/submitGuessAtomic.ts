import { redis } from "./redis";
import { statsKey, leaderboardKey } from "./keys";
import type { UserStats } from "./types";

type Input = {
  userId: string;
  date: string;
  correct: boolean;
  attempts: number;
};

export async function submitGuessAtomic(input: Input) {
  const { userId, date, correct, attempts } = input;

  const result = await redis.eval(
    `
    local statsKey = KEYS[1]
    local leaderboardKey = KEYS[2]

    local correct = tonumber(ARGV[1])
    local attempts = tonumber(ARGV[2])
    local date = ARGV[3]
    local userId = ARGV[4]

    local stats = redis.call("GET", statsKey)

    if not stats then
      stats = cjson.encode({
        streak = 0,
        bestStreak = 0,
        totalSolved = 0,
        lastSolvedDate = ""
      })
    end

    stats = cjson.decode(stats)

    local score = 0

    if correct == 1 then
      stats.totalSolved = stats.totalSolved + 1

      if stats.lastSolvedDate ~= date then
        stats.streak = stats.streak + 1
      end

      if stats.streak > stats.bestStreak then
        stats.bestStreak = stats.streak
      end

      stats.lastSolvedDate = date

      score = (10 - attempts) * 10 + (stats.streak * 2)
    end

    redis.call("SET", statsKey, cjson.encode(stats))
    redis.call("ZADD", leaderboardKey, score, userId)

    return cjson.encode({
      streak = stats.streak,
      bestStreak = stats.bestStreak,
      totalSolved = stats.totalSolved,
      score = score
    })
    `,
    [statsKey(userId), leaderboardKey()],
    [correct ? 1 : 0, attempts, date, userId],
  );

  return JSON.parse(result as string);
}
