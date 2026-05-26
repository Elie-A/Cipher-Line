export type SignalState = "WEAK" | "STABLE" | "LOCKED" | "DECODED";

export function getSignalState(
  guess: string,
  answer: string,
  attempts: number,
  correct: boolean,
): SignalState {
  if (correct) return "DECODED";

  const distance = Math.abs(guess.length - answer.length);

  if (attempts >= 5) return "WEAK";

  if (distance >= 5) return "WEAK";

  if (distance >= 2) return "STABLE";

  return "STABLE";
}

export function signalLabel(state: SignalState) {
  switch (state) {
    case "DECODED":
      return "SIGNAL LOCKED: DECRYPTION COMPLETE";
    case "STABLE":
      return "SIGNAL STRENGTH: STABLE";
    case "WEAK":
      return "SIGNAL STRENGTH: WEAK";
    case "LOCKED":
      return "SIGNAL TERMINATED";
  }
}
