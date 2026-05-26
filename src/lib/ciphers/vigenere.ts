import { Cipher } from "./types";

export const vigenere: Cipher = {
  id: "vigenere",

  encrypt(text, key = "key") {
    return process(text, key, true);
  },

  decrypt(text, key = "key") {
    return process(text, key, false);
  },
};

function process(text: string, key: string, encrypt: boolean) {
  let ki = 0;

  return [...text]
    .map((c) => {
      const code = c.charCodeAt(0);

      if (isLetter(code)) {
        const base = code >= 97 ? 97 : 65;
        const shift = key.toLowerCase().charCodeAt(ki % key.length) - 97;

        ki++;

        const offset = encrypt ? shift : -shift;

        return String.fromCharCode(((code - base + offset + 26) % 26) + base);
      }

      return c;
    })
    .join("");
}

function isLetter(code: number) {
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}
