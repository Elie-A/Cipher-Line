export type SignalMemory = {
  noise: number;
  corruption: number;
  instability: number;
};

export type SignalState = {
  attempts: number;
  correct: boolean;
  memory: SignalMemory;
};

export type SignalOutput = {
  signalState: "STABLE" | "DISTORTED" | "CRITICAL" | "DECODED";
  feedback: string;
  hintStrength: number;
  noiseLevel: number;
};

export function simulateSignalStep(state: SignalState): SignalOutput {
  const { attempts, correct, memory } = state;

  let noiseLevel = memory.noise + memory.corruption + Math.floor(attempts / 2);

  noiseLevel = Math.min(noiseLevel, 6);

  let signalState: SignalOutput["signalState"] = "STABLE";

  if (correct) signalState = "DECODED";
  else if (noiseLevel <= 2) signalState = "STABLE";
  else if (noiseLevel <= 4) signalState = "DISTORTED";
  else signalState = "CRITICAL";

  let hintStrength = 100 - noiseLevel * 15;

  if (memory.instability > 3) {
    hintStrength -= 10;
  }

  hintStrength = Math.max(10, Math.min(100, hintStrength));

  const feedbackMap: Record<string, string> = {
    STABLE: "signal holding",
    DISTORTED: "interference increasing",
    CRITICAL: "signal collapse imminent",
    DECODED: "transmission restored",
  };

  return {
    signalState,
    feedback: feedbackMap[signalState],
    hintStrength,
    noiseLevel,
  };
}
