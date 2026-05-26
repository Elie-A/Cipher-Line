import { generateDaily } from "@/lib/game/daily";

export async function GET() {
  const puzzle = generateDaily();

  return Response.json({
    encrypted: puzzle.encrypted,
    cipher: puzzle.cipherId,
    date: puzzle.date,
  });
}
