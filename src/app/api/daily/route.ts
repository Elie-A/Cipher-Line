import { getDailyPuzzle } from "@/lib/game/dailyStore";
import { getToday } from "@/lib/game/today";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const date = getToday(url.searchParams.get("date") ?? undefined);

  const puzzle = await getDailyPuzzle(date);

  return Response.json({
    date: puzzle.date,
    cipher: puzzle.cipher,
    difficulty: puzzle.difficulty,
    encrypted: puzzle.encrypted,
    answer: puzzle.answer,
  });
}
