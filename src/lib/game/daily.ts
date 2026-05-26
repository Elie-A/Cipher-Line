import { getDailySeed } from "./seed";
import { mulberry32 } from "./random";
import { generatePhrase } from "./phrases";
import { getDailyDifficulty } from "./difficulty";

import { caesar } from "@/lib/ciphers/caesar";
import { atbash } from "@/lib/ciphers/atbash";
import { rot13 } from "@/lib/ciphers/rot13";
import { reverse } from "@/lib/ciphers/reverse";
import { vigenere } from "@/lib/ciphers/vigenere";

const EASY = [caesar, atbash, rot13, reverse];
const MEDIUM = [caesar, atbash, rot13, reverse, vigenere];
const HARD = [vigenere, caesar];
const BOSS = [vigenere];

function getPool(diff: string) {
  switch (diff) {
    case "EASY":
      return EASY;
    case "MEDIUM":
      return MEDIUM;
    case "HARD":
      return HARD;
    case "BOSS":
      return BOSS;
    default:
      return EASY;
  }
}

/**
 * IMPORTANT:
 * date is now REQUIRED so the system is deterministic
 */
export function generateDaily(date: string) {
  const seed = getDailySeed(date);
  const rand = mulberry32(seed);

  const difficulty = getDailyDifficulty(date);
  const pool = getPool(difficulty);

  const cipher = pool[Math.floor(rand() * pool.length)];
  const text = generatePhrase(rand);

  let encrypted = "";

  if (cipher.id === "vigenere") {
    const keys = ["KEY", "CODE", "SIGNAL", "LOCK"];
    const key = keys[Math.floor(rand() * keys.length)];

    encrypted = cipher.encrypt(text, key);

    return {
      date,
      cipher: cipher.id,
      difficulty,
      encrypted,
      answer: text,
      key,
    };
  }

  encrypted = cipher.encrypt(text);

  return {
    date,
    cipher: cipher.id,
    difficulty,
    encrypted,
    answer: text,
  };
}
