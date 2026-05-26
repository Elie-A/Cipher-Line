export function getToday(date?: string) {
  return date ?? new Date().toISOString().slice(0, 10);
}
