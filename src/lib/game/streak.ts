import { kv } from "@vercel/kv";

export async function getStreak(userId: string) {
  return (await kv.get<number>(`streak:${userId}`)) || 0;
}

export async function updateStreak(userId: string, solved: boolean) {
  const current = await getStreak(userId);

  const next = solved ? current + 1 : 0;

  await kv.set(`streak:${userId}`, next);

  return next;
}
