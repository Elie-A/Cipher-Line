// import { generateDaily } from "@/lib/game/daily";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json().catch(() => ({}));

//     // Discord PING
//     if (body?.type === 1) {
//       return Response.json({ type: 1 });
//     }

//     const command = body?.data?.name;

//     if (command === "cipherline") {
//       const date = new Date().toISOString().slice(0, 10);
//       const puzzle = generateDaily(date);

//       return Response.json({
//         type: 4,
//         data: {
//           content:
//             `📡 DAILY SIGNAL\n` +
//             `cipher: ${puzzle.cipher}\n` +
//             `difficulty: ${puzzle.difficulty}\n` +
//             `encrypted:\n${puzzle.encrypted}`,
//         },
//       });
//     }

//     // ALWAYS return valid Discord response
//     return Response.json({
//       type: 4,
//       data: { content: "Unknown signal." },
//     });
//   } catch (err) {
//     return Response.json({
//       type: 4,
//       data: { content: "Signal error." },
//     });
//   }
// }

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // 1. Discord PING verification
    if (body?.type === 1) {
      return Response.json({ type: 1 });
    }

    // 2. Slash command
    const command = body?.data?.name;

    if (command === "cipherline") {
      return Response.json({
        type: 4,
        data: {
          content: "cipherline online",
        },
      });
    }

    // 3. ALWAYS respond
    return Response.json({
      type: 4,
      data: { content: "ok" },
    });
  } catch (e) {
    // 4. NEVER crash
    return Response.json({
      type: 4,
      data: { content: "error" },
    });
  }
}
