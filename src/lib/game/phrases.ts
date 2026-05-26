const subjects = [
  "signal",
  "message",
  "cipher",
  "transmission",
  "system",
  "node",
];

const verbs = [
  "is broken",
  "is hidden",
  "was intercepted",
  "has failed",
  "is unstable",
  "was encoded",
];

const objects = [
  "in the network",
  "under the surface",
  "beyond the grid",
  "inside the archive",
  "across the channel",
  "within the loop",
];

const imperatives = [
  "trust no one",
  "decode carefully",
  "follow the pattern",
  "observe the noise",
  "break the loop",
];

export function generatePhrase(rand: () => number) {
  const type = Math.floor(rand() * 2);

  if (type === 0) {
    const s = subjects[Math.floor(rand() * subjects.length)];
    const v = verbs[Math.floor(rand() * verbs.length)];
    const o = objects[Math.floor(rand() * objects.length)];

    return `${s.toUpperCase()} ${v.toUpperCase()} ${o.toUpperCase()}`;
  }

  return imperatives[Math.floor(rand() * imperatives.length)].toUpperCase();
}
