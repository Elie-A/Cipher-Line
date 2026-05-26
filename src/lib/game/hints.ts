import { SignalMemory } from "./signalMemory";

export function getHint(
  cipher: string,
  answer: string,
  attempts: number,
  hintStrength: number,
) {
  if (hintStrength > 80) return "no hint needed yet";

  if (hintStrength > 50) {
    return `pattern detected: ${cipher}`;
  }

  if (hintStrength > 25) {
    return `partial signal: ${answer.slice(0, 2)}...`;
  }

  return `signal fragment: ${answer[0]}_ _ _ _`;
}
