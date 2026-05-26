import { generateDaily } from "@/lib/game/daily";
import { getProgress, updateProgress } from "@/lib/game/progress";
import { getSignalState, signalLabel } from "@/lib/game/signal";
import { updateStreak } from "@/lib/game/streak";
import { calculateScore } from "@/lib/game/score";
import { sendToDiscord } from "@/lib/discord/send";

export async function POST(req: Request) {
  const { userId, guess } = await req.json();

  if (!guess || !guess.trim()) {
    return Response.json({
      correct: false,
      attemptsLeft: 6,
      attempts: 0,
      feedback: "EMPTY SIGNAL DETECTED",
      signalState: "WEAK",
      score: 0,
      streak: 0,
    });
  }

  const puzzle = generateDaily();
  const date = puzzle.date;

  const progress = await getProgress(userId, date);

  // already solved
  if (progress.solved) {
    return Response.json({
      correct: true,
      attemptsLeft: 6 - progress.attempts,
      attempts: progress.attempts,
      feedback: "SIGNAL ALREADY DECODED",
      signalState: "DECODED",
      score: 0,
      streak: await updateStreak(userId, true),
    });
  }

  // max attempts
  if (progress.attempts >= 6) {
    return Response.json({
      correct: false,
      attemptsLeft: 0,
      attempts: progress.attempts,
      feedback: "SIGNAL TERMINATED",
      signalState: "WEAK",
      score: 0,
      streak: await updateStreak(userId, false),
    });
  }

  const correct = guess.trim().toUpperCase() === puzzle.answer.toUpperCase();

  const updated = {
    attempts: progress.attempts + 1,
    solved: correct,
  };

  await updateProgress(userId, date, updated);

  const signalState = getSignalState(
    guess,
    puzzle.answer,
    updated.attempts,
    correct,
  );

  const feedback = signalLabel(signalState);

  const score = calculateScore(updated.attempts, correct);

  const streak = await updateStreak(userId, correct);

  // discord broadcast
  if (correct) {
    await sendToDiscord(
      `🟢 Cipher solved | user:${userId} | streak:${streak} | score:${score}`,
    );
  }

  return Response.json({
    correct,
    attemptsLeft: 6 - updated.attempts,
    attempts: updated.attempts,
    feedback,
    signalState,
    score,
    streak,
  });
}
