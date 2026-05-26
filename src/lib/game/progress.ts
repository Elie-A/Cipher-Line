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
  memory: SignalMemory;
};

function createDefaultMemory(): SignalMemory {
  return {
    noise: 0,
    corruption: 0,
    instability: 0,
  };
}

function createDefaultProgress(): UserProgress {
  return {
    attempts: 0,
    solved: false,
    memory: createDefaultMemory(),
  };
}

function key(userId: string, date: string) {
  return `progress:${userId}:${date}`;
}

export async function getProgress(
  userId: string,
  date: string,
): Promise<UserProgress> {
  const data = await redis.get<UserProgress>(key(userId, date));

  return data ?? createDefaultProgress();
}

/**
 * Safe partial update system
 * Prevents missing memory/type errors
 */
export async function updateProgress(
  userId: string,
  date: string,
  patch: Partial<UserProgress>,
): Promise<UserProgress> {
  const current = await getProgress(userId, date);

  const updated: UserProgress = {
    attempts: patch.attempts ?? current.attempts,
    solved: patch.solved ?? current.solved,

    memory: {
      ...current.memory,
      ...(patch.memory ?? {}),
    },
  };

  await redis.set(key(userId, date), updated);

  return updated;
}
