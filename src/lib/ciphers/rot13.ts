import { Cipher } from "./types";

export const rot13: Cipher = {
  id: "rot13",

  encrypt: transform,
  decrypt: transform,
};

function transform(text: string) {
  return [...text].map((c) => shift(c, 13)).join("");
}

function shift(c: string, shift: number) {
  const code = c.charCodeAt(0);

  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
  }

  if (code >= 97 && code <= 122) {
    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
  }

  return c;
}
