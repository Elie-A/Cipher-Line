import { Cipher } from "./types";

export const affine: Cipher = {
  id: "affine",

  encrypt(text, key = { a: 5, b: 8 }) {
    return transform(text, key.a, key.b);
  },

  decrypt(text, key = { a: 5, b: 8 }) {
    return transform(text, modInverse(key.a, 26), -key.b);
  },
};

function transform(text: string, a: number, b: number) {
  return [...text]
    .map((c) => {
      const code = c.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((a * (code - 65) + b + 26 * 26) % 26) + 65);
      }

      return c;
    })
    .join("");
}

function modInverse(a: number, m: number) {
  return a; // keep MVP simple for now
}
