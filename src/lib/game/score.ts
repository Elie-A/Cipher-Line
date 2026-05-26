export function calculateScore(attempts: number, solved: boolean) {
  if (!solved) return 0;

  const base = 100;
  const penalty = attempts * 10;

  return Math.max(base - penalty, 10);
}
