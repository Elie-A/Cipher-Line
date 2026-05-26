import { generateDaily } from "@/lib/game/daily";
import { getProgress, updateProgress } from "@/lib/game/progress";
import { simulateSignalStep } from "@/lib/game/signalEngine";
import { computeInterference } from "@/lib/game/uiInterference";
import { getHint } from "@/lib/game/hints";
import { revealText } from "@/lib/game/progressiveReveal";
import { calculateScore } from "@/lib/game/score";
import { updateStreak } from "@/lib/game/streak";
import { sendToDiscord } from "@/lib/discord/send";

export type SignalMemory = {
  noise: number;
  corruption: number;
  instability: number;
};

export type SimInput = {
  userId: string;
  guess?: string;
  date?: string;
};

function normalizeDate(date?: string) {
  if (typeof date === "string" && date.length >= 10) {
    return date.slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}

export function safeMemory(memory: any): SignalMemory {
  return {
    noise: memory?.noise ?? 0,
    corruption: memory?.corruption ?? 0,
    instability: memory?.instability ?? 0,
  };
}

export async function runSimulation(input: SimInput) {
  const userId = input.userId;
  const guess = input.guess;

  const date = normalizeDate(input.date);

  const puzzle = generateDaily(date);
  const progress = await getProgress(userId, date);

  const memory: SignalMemory = safeMemory(progress.memory);

  // EMPTY INPUT
  if (!guess?.trim()) {
    return {
      correct: false,
      attempts: progress.attempts,
      attemptsLeft: 6 - progress.attempts,
      signalState: "WEAK",
      feedback: "EMPTY SIGNAL DETECTED",
      memory,
      revealed: revealText(puzzle.answer, 0),
    };
  }

  // ALREADY SOLVED
  if (progress.solved) {
    return {
      correct: true,
      attempts: progress.attempts,
      attemptsLeft: 6 - progress.attempts,
      signalState: "DECODED",
      feedback: "SIGNAL ALREADY DECODED",
      memory,
      revealed: revealText(puzzle.answer, 100),
    };
  }

  // MAX ATTEMPTS
  if (progress.attempts >= 6) {
    return {
      correct: false,
      attempts: progress.attempts,
      attemptsLeft: 0,
      signalState: "CRITICAL",
      feedback: "SIGNAL TERMINATED",
      memory,
      revealed: revealText(puzzle.answer, 10),
    };
  }

  const normalizedGuess = guess.trim().toUpperCase();
  const correct = normalizedGuess === puzzle.answer.toUpperCase();

  const updatedMemory: SignalMemory = { ...memory };

  // MEMORY EVOLUTION RULES
  if (!correct) {
    updatedMemory.noise += 1;
    updatedMemory.corruption += 1;
  } else {
    updatedMemory.noise = Math.max(0, updatedMemory.noise - 2);
    updatedMemory.instability += 1;
  }

  const updatedProgress = {
    attempts: progress.attempts + 1,
    solved: correct || progress.solved,
    memory: updatedMemory,
  };

  await updateProgress(userId, date, updatedProgress);

  const signal = simulateSignalStep({
    attempts: updatedProgress.attempts,
    correct,
    memory: updatedMemory,
  });

  const ui = computeInterference(updatedProgress.attempts, correct);

  const score = calculateScore(updatedProgress.attempts, correct);
  const streak = await updateStreak(userId, correct);

  const hint = getHint(
    puzzle.cipher,
    puzzle.answer,
    updatedProgress.attempts,
    signal.hintStrength,
  );

  if (correct) {
    await sendToDiscord(
      `🟢 Cipher solved | user:${userId} | streak:${streak} | score:${score}`,
    );
  }

  return {
    correct,
    attempts: updatedProgress.attempts,
    attemptsLeft: 6 - updatedProgress.attempts,
    score,
    streak,
    hint,
    memory: updatedMemory,

    ...signal,
    ...ui,

    revealed: revealText(puzzle.answer, signal.hintStrength),
  };
}
