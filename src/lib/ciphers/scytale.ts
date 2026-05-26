import { Cipher } from "./types";

export const scytale: Cipher = {
  id: "scytale",

  encrypt(text) {
    const width = 3;
    let result = "";

    for (let i = 0; i < width; i++) {
      for (let j = i; j < text.length; j += width) {
        result += text[j];
      }
    }

    return result;
  },

  decrypt(text) {
    return text; // MVP stub
  },
};
