export function getDailyDifficulty(date: string) {
  let hash = 0;

  for (let i = 0; i < date.length; i++) {
    hash = (hash * 31 + date.charCodeAt(i)) >>> 0;
  }

  const levels = ["EASY", "MEDIUM", "HARD", "BOSS"];

  return levels[hash % levels.length];
}
