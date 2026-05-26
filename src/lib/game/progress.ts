import { kv } from "@vercel/kv";

export type UserProgress = {
  attempts: number;
  solved: boolean;
};

function key(userId: string, date: string) {
  return `progress:${userId}:${date}`;
}

export async function getProgress(userId: string, date: string) {
  const data = await kv.get<UserProgress>(key(userId, date));

  return (
    data || {
      attempts: 0,
      solved: false,
    }
  );
}

export async function updateProgress(
  userId: string,
  date: string,
  progress: UserProgress,
) {
  await kv.set(key(userId, date), progress);
}
