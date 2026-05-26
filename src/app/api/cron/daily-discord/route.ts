import { sendToDiscord } from "@/lib/discord/send";
import { generateDaily } from "@/lib/game/daily";

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const puzzle = generateDaily(today);

  await sendToDiscord(
    `📡 DAILY SIGNAL BROADCAST
date: ${today}
cipher: ${puzzle.cipher}
difficulty: ${puzzle.difficulty}
encrypted: ${puzzle.encrypted}`,
  );

  return Response.json({ ok: true });
}
