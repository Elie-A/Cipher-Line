export function getDailySeed(date: string) {
  if (!date || typeof date !== "string") {
    throw new Error("getDailySeed requires a YYYY-MM-DD string");
  }

  const yyyy = date.slice(0, 4);
  const mm = date.slice(5, 7);
  const dd = date.slice(8, 10);

  const str = `${yyyy}-${mm}-${dd}`;

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}
