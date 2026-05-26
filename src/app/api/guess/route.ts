import { getProgress, updateProgress } from "@/lib/game/progress";

export async function POST(req: Request) {
  const { userId, guess } = await req.json();

  const date = new Date().toISOString().slice(0, 10);

  const progress = await getProgress(userId, date);

  const res = await fetch(new URL(`/api/daily?date=${date}`, req.url));
  const puzzle = await res.json();

  const correct = guess?.trim().toUpperCase() === puzzle.answer.toUpperCase();

  // 🧠 SAFE DEFAULT MEMORY (prevents undefined crashes)
  const memory = progress.memory ?? {
    noise: 0,
    corruption: 0,
    instability: 0,
  };

  // 🔥 CLEAN STATE UPDATE (NO MANUAL REBUILDING)
  const updated = {
    ...progress, // includes attempts, solved, memory
    attempts: progress.attempts + 1,
    solved: correct || progress.solved,
    memory: {
      ...memory,
    },
  };

  await updateProgress(userId, date, updated);

  return Response.json({
    correct,
    solved: updated.solved,
    attempts: updated.attempts,
    answer: updated.solved ? puzzle.answer : undefined,
    encrypted: puzzle.encrypted,
  });
}
