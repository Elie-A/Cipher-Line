import { generateDaily } from "../src/lib/game/daily";

const today = new Date().toISOString().slice(0, 10);

const puzzle1 = generateDaily(today);
const puzzle2 = generateDaily(today);

console.log("PUZZLE 1:", puzzle1);
console.log("PUZZLE 2:", puzzle2);

console.log("CONSISTENT:", JSON.stringify(puzzle1) === JSON.stringify(puzzle2));
