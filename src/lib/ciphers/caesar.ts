import { Cipher } from "./types";

export const caesar: Cipher = {
  id: "caesar",

  encrypt(text, shift = 3) {
    return transform(text, shift);
  },

  decrypt(text, shift = 3) {
    return transform(text, -shift);
  },
};

function transform(text: string, shift: number) {
  return [...text]
    .map((c) => {
      const code = c.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
      }

      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
      }

      return c;
    })
    .join("");
}
