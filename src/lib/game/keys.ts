export const progressKey = (userId: string, date: string) =>
  `progress:${userId}:${date}`;

export const statsKey = (userId: string) => `stats:${userId}`;

export const leaderboardKey = () => `leaderboard:global`;
