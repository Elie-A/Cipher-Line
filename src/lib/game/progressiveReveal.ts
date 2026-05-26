export function revealText(answer: string, hintStrength: number): string {
  const revealRatio = hintStrength / 100; // 0 → 1

  return answer
    .split("")
    .map((char) => {
      if (char === " ") return " ";

      const shouldReveal = Math.random() < revealRatio;

      if (shouldReveal) return char;

      return "_";
    })
    .join("");
}
