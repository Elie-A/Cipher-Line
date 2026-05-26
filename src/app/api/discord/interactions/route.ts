import { runSimulation } from "@/lib/sim/core";
import { getToday } from "@/lib/game/today";
import { getDailyPuzzle } from "@/lib/game/dailyStore";

export async function POST(req: Request) {
  const body = await req.json();

  // Discord verification
  if (body.type === 1) {
    return Response.json({ type: 1 });
  }

  const command = body.data?.name;

  if (command !== "cipherline") {
    return Response.json({
      type: 4,
      data: {
        content: "Unknown signal.",
      },
    });
  }

  const userId = body.member?.user?.id;

  const date = getToday();

  const puzzle = await getDailyPuzzle(date);

  // no guess yet, just fetch state
  const result = await runSimulation({
    userId,
    guess: "",
    date,
  });

  return Response.json({
    type: 4,
    data: {
      content: `
📡 DAILY SIGNAL

difficulty: ${puzzle.difficulty}
cipher: ${puzzle.cipher}

status: ${result.signalState}

attempts: ${result.attempts}/6

encrypted:
${puzzle.encrypted}

hint:
${result.revealed || "signal fragment unavailable"}

play:
https://cipher-line.vercel.app
      `,
    },
  });
}
