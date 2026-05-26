import { generateDaily } from "@/lib/game/daily";

export async function POST(req: Request) {
  const body = await req.json();

  // Discord ping verification
  if (body.type === 1) {
    return Response.json({ type: 1 });
  }

  const command = body.data?.name;

  if (command === "cipherline") {
    const today = new Date().toISOString().slice(0, 10);
    const puzzle = generateDaily(today);

    return Response.json({
      type: 4,
      data: {
        content: `📡 DAILY SIGNAL
cipher: ${puzzle.cipher}
difficulty: ${puzzle.difficulty}
encrypted:
${puzzle.encrypted}`,
      },
    });
  }

  return Response.json({ type: 4, data: { content: "Unknown signal." } });
}
