import { generateDaily } from "@/lib/game/daily";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const date =
    url.searchParams.get("date") ?? new Date().toISOString().slice(0, 10);

  const puzzle = generateDaily(date);

  return Response.json({
    date: puzzle.date,
    cipher: puzzle.cipher,
    difficulty: puzzle.difficulty,
    encrypted: puzzle.encrypted,
    answer: puzzle.answer,
  });
}
