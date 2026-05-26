import { caesar } from "./caesar";
import { atbash } from "./atbash";
import { morse } from "./morse";
import { rot13 } from "./rot13";
import { reverse } from "./reverse";
import { vigenere } from "./vigenere";
import { railFence } from "./railFence";
import { scytale } from "./scytale";
import { affine } from "./affine";
import { substitution } from "./substitution";

export const cipherMap: Record<string, any> = {
  caesar,
  atbash,
  morse,
  rot13,
  reverse,
  vigenere,
  railFence,
  scytale,
  affine,
  substitution,
};
