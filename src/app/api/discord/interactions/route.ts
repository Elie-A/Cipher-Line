import { resolveGuess } from "@/lib/game/resolveGuess";
import { getToday } from "@/lib/game/today";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // --------------------------------------------------
    // Discord PING verification
    // --------------------------------------------------

    if (body.type === 1) {
      return Response.json({ type: 1 });
    }

    // --------------------------------------------------
    // Slash command validation
    // --------------------------------------------------

    const command = body.data?.name;

    if (command !== "cipherline") {
      return Response.json({
        type: 4,
        data: {
          content: "Unknown signal.",
        },
      });
    }

    // --------------------------------------------------
    // User identity
    // --------------------------------------------------

    const userId = body.member?.user?.id;

    if (!userId) {
      return Response.json({
        type: 4,
        data: {
          content: "Signal source missing.",
        },
      });
    }

    // --------------------------------------------------
    // Resolve game state
    // --------------------------------------------------

    const date = getToday();

    // empty guess = fetch current state only
    const result = await resolveGuess({
      userId,
      guess: "",
      date,
    });

    // --------------------------------------------------
    // Build response
    // --------------------------------------------------

    return Response.json({
      type: 4,

      data: {
        content: `
📡 DAILY SIGNAL

difficulty: ${result.difficulty}
cipher: ${result.cipher}

status: ${result.signalState}

attempts: ${result.attempts}/6

encrypted:
${result.encrypted}

${
  result.solved
    ? `answer:
${result.answer}`
    : ""
}

play:
https://cipher-line.vercel.app
        `.trim(),
      },
    });
  } catch (err) {
    console.error("Interaction route error:", err);

    return Response.json({
      type: 4,
      data: {
        content: "Signal corruption detected.",
      },
    });
  }
}
