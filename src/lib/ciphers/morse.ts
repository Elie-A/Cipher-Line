import { Cipher } from "./types";

const MORSE: Record<string, string> = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  " ": "/",
};

export const morse: Cipher = {
  id: "morse",

  encrypt(text) {
    return text
      .toLowerCase()
      .split("")
      .map((c) => MORSE[c] || "")
      .join(" ");
  },

  decrypt(text) {
    const reverse = Object.fromEntries(
      Object.entries(MORSE).map(([k, v]) => [v, k]),
    );

    return text
      .split(" ")
      .map((code) => reverse[code] || "")
      .join("");
  },
};
