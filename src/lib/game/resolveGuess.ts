import { getDailyPuzzle } from "./dailyStore";
import { getProgress, updateProgress } from "./progress";
import { submitGuessAtomic } from "./submitGuessAtomic";

type ResolveGuessInput = {
  userId: string;
  guess: string;
  date: string;
};

export async function resolveGuess({ userId, guess, date }: ResolveGuessInput) {
  const puzzle = await getDailyPuzzle(date);

  const progress = await getProgress(userId, date);

  // --------------------------------------------------
  // detect real submission
  // --------------------------------------------------

  const normalizedGuess = guess.trim().toUpperCase();

  const isSubmission = normalizedGuess.length > 0;

  const correct = normalizedGuess === puzzle.answer.trim().toUpperCase();

  // --------------------------------------------------
  // attempts only increase on real submissions
  // --------------------------------------------------

  const attempts = isSubmission ? progress.attempts + 1 : progress.attempts;

  const solved = correct || progress.solved;

  const updatedProgress = {
    attempts,
    solved,
    memory: progress.memory,
  };

  // --------------------------------------------------
  // save ONLY if user actually guessed
  // --------------------------------------------------

  if (isSubmission) {
    await updateProgress(userId, date, updatedProgress);
  }

  // --------------------------------------------------
  // leaderboard/streak updates ONLY on submissions
  // --------------------------------------------------

  let stats = {};

  if (isSubmission) {
    stats = await submitGuessAtomic({
      userId,
      date,
      correct,
      attempts,
    });
  }

  // --------------------------------------------------
  // signal state
  // --------------------------------------------------

  const signalState = solved
    ? "DECODED"
    : attempts > 4
      ? "CRITICAL"
      : attempts > 2
        ? "DISTORTED"
        : "STABLE";

  return {
    correct,
    solved,
    attempts,

    answer: solved ? puzzle.answer : undefined,

    encrypted: puzzle.encrypted,
    cipher: puzzle.cipher,
    difficulty: puzzle.difficulty,

    signalState,

    ...stats,
  };
}
