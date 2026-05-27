import { resolveGuess } from "@/lib/game/resolveGuess";
import { getToday } from "@/lib/game/today";

export async function POST(req: Request) {
  const { userId, guess } = await req.json();

  const date = getToday();

  const result = await resolveGuess({
    userId,
    guess,
    date,
  });

  return Response.json(result);
}
