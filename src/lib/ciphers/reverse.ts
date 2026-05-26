import { Cipher } from "./types";

export const reverse: Cipher = {
  id: "reverse",

  encrypt(text) {
    return [...text].reverse().join("");
  },

  decrypt(text) {
    return [...text].reverse().join("");
  },
};
