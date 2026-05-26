import { cipherMap } from "../ciphers";

const easyPool = [
  { id: "caesar", weight: 20 },
  { id: "atbash", weight: 20 },
  { id: "rot13", weight: 15 },
  { id: "reverse", weight: 15 },
];

const mediumPool = [
  { id: "vigenere", weight: 25 },
  { id: "railFence", weight: 20 },
  { id: "scytale", weight: 20 },
  { id: "substitution", weight: 15 },
];

const hardPool = [{ id: "affine", weight: 25 }];

function getDifficulty() {
  const d = new Date().getDate();

  if (d % 7 === 0) return "hard";
  if (d % 3 === 0) return "medium";
  return "easy";
}

export function pickCipher() {
  const difficulty = getDifficulty();

  const pool =
    difficulty === "hard"
      ? hardPool
      : difficulty === "medium"
        ? mediumPool
        : easyPool;

  const total = pool.reduce((sum, c) => sum + c.weight, 0);

  let r = Math.random() * total;

  for (const c of pool) {
    r -= c.weight;
    if (r <= 0) return cipherMap[c.id];
  }

  return cipherMap.caesar;
}
