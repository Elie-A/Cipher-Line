import { pickCipher } from "./engine";

const PHRASES = [
  "HELLO WORLD",
  "TRUST NO ONE",
  "CIPHERLINE ACTIVE",
  "DECODE THE SIGNAL",
];

function today() {
  return new Date().toISOString().split("T")[0];
}

export function generateDaily() {
  const cipher = pickCipher();
  const answer = PHRASES[Math.floor(Math.random() * PHRASES.length)];

  const encrypted = cipher.encrypt(answer);

  return {
    date: today(),
    cipherId: cipher.id,
    encrypted,
    answer,
  };
}
