import { Cipher } from "./types";

export const railFence: Cipher = {
  id: "railFence",

  encrypt(text) {
    const rails = 3;
    const fence: string[][] = Array.from({ length: rails }, () => []);

    let row = 0;
    let dir = 1;

    for (const c of text) {
      fence[row].push(c);
      row += dir;

      if (row === 0 || row === rails - 1) dir *= -1;
    }

    return fence.flat().join("");
  },

  decrypt(text) {
    return text; // keep MVP simple for now
  },
};
