import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export type SignalMemory = {
  noise: number;
  corruption: number;
  instability: number;
};

export type UserProgress = {
  attempts: number;
  solved: boolean;
  memory: SignalMemory; // 🔥 ADD THIS
};

function key(userId: string, date: string) {
  return `progress:${userId}:${date}`;
}

export async function getProgress(userId: string, date: string) {
  const data = await redis.get<UserProgress>(key(userId, date));

  return (
    data || {
      attempts: 0,
      solved: false,
      memory: {
        noise: 0,
        corruption: 0,
        instability: 0,
      },
    }
  );
}

export async function updateProgress(
  userId: string,
  date: string,
  progress: UserProgress,
) {
  await redis.set(key(userId, date), progress);
}
