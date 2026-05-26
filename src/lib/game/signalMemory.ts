export type SignalMemory = {
  noise: number;
  corruption: number;
  instability: number;
};

export function createSignalMemory(): SignalMemory {
  return {
    noise: 0,
    corruption: 0,
    instability: 0,
  };
}

export function evolveSignal(memory: SignalMemory, correct: boolean) {
  if (!correct) {
    memory.noise += 1;
    memory.corruption += 1;
  } else {
    memory.noise = Math.max(0, memory.noise - 2);
    memory.instability += 1;
  }

  return memory;
}
