import { SignalState, signalLabel } from "./signal";

export function formatFeedback(state: SignalState) {
  return signalLabel(state);
}
