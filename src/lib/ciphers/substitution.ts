import { Cipher } from "./types";

const map: Record<string, string> = {
  a: "m",
  b: "n",
  c: "b",
  d: "v",
  e: "c",
  f: "x",
  g: "z",
  h: "l",
  i: "k",
  j: "j",
  k: "h",
  l: "g",
  m: "f",
  n: "d",
  o: "s",
  p: "a",
  q: "p",
  r: "o",
  s: "i",
  t: "u",
  u: "y",
  v: "t",
  w: "r",
  x: "e",
  y: "w",
  z: "q",
};

const reverseMap = Object.fromEntries(
  Object.entries(map).map(([k, v]) => [v, k]),
);

export const substitution: Cipher = {
  id: "substitution",

  encrypt(text) {
    return transform(text, map);
  },

  decrypt(text) {
    return transform(text, reverseMap);
  },
};

function transform(text: string, dict: Record<string, string>) {
  return [...text]
    .map((c) => {
      const lower = c.toLowerCase();
      const mapped = dict[lower];
      return mapped ?? c;
    })
    .join("");
}
