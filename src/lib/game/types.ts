export type Difficulty = "easy" | "medium" | "hard";

export type DailyPuzzle = {
  date: string;
  cipherId: string;
  encrypted: string;
  answer: string;
  difficulty: Difficulty;
};

export type UserProgress = {
  attempts: number;
  solved: boolean;
};
