import { redis } from "@/lib/game/redis";
import { generateDaily } from "./daily";

function key(date: string) {
  return `daily:puzzle:${date}`;
}

export async function getDailyPuzzle(date: string) {
  // 1. check cache
  const cached = await redis.get<any>(key(date));
  if (cached) return cached;

  // 2. generate once
  const puzzle = generateDaily(date);

  // 3. store forever (deterministic daily game)
  await redis.set(key(date), puzzle);

  return puzzle;
}
