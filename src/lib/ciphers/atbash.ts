import { Cipher } from "./types";

export const atbash: Cipher = {
  id: "atbash",

  encrypt: transform,
  decrypt: transform,
};

function transform(text: string) {
  return [...text]
    .map((c) => {
      const code = c.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return String.fromCharCode(90 - (code - 65));
      }

      if (code >= 97 && code <= 122) {
        return String.fromCharCode(122 - (code - 97));
      }

      return c;
    })
    .join("");
}
