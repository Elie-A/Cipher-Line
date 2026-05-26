import { generateDaily } from "@/lib/game/daily";
import { getProgress, updateProgress } from "@/lib/game/progress";
import { submitGuessAtomic } from "@/lib/game/submitGuessAtomic";

export async function POST(req: Request) {
  const { userId, guess } = await req.json();

  const date = new Date().toISOString().slice(0, 10);
  const puzzle = generateDaily(date);

  const correct = guess?.trim().toUpperCase() === puzzle.answer.toUpperCase();

  const progress = await getProgress(userId, date);

  const updatedProgress = {
    attempts: progress.attempts + 1,
    solved: correct || progress.solved,
    memory: progress.memory,
  };

  // 1. save local progress (per day)
  await updateProgress(userId, date, updatedProgress);

  // 2. atomic stats + leaderboard update
  const stats = await submitGuessAtomic({
    userId,
    date,
    correct,
    attempts: updatedProgress.attempts,
  });

  return Response.json({
    correct,
    solved: updatedProgress.solved,
    attempts: updatedProgress.attempts,
    answer: updatedProgress.solved ? puzzle.answer : undefined,
    encrypted: puzzle.encrypted,

    // global system output
    ...stats,
  });
}
