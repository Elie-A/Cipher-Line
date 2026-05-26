export type UIInterference = {
  shift: number; // pixel jitter
  blur: number; // readability loss
  opacity: number; // signal clarity
  tension: number; // layout instability
};

export function computeInterference(
  attempts: number,
  correct: boolean,
): UIInterference {
  const base = Math.min(attempts, 6);

  const failurePressure = base / 6;

  if (correct) {
    return {
      shift: 0,
      blur: 0,
      opacity: 1,
      tension: 0,
    };
  }

  return {
    shift: failurePressure * 2, // subtle movement
    blur: failurePressure * 0.6, // slight degradation
    opacity: 1 - failurePressure * 0.2,
    tension: failurePressure, // drives animation intensity
  };
}
