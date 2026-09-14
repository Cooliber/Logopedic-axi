export type Profile = {
  wordsCount: 8 | 12;
  hideTimer: boolean;
  mouthVisual: boolean;
  difficulty: "easy" | "standard";
};

export function profileFromProbe(input: {
  minimalPairsCorrect: number; // 0-4
  oneMinuteCount: number;      // ile słów w 1 min
  age: number;                 // 3-8
}): Profile {
  const ic = input.minimalPairsCorrect / 4;
  const wm = Math.min(input.oneMinuteCount / 8, 1);

  if (ic < 0.5 || wm < 0.5 || input.age < 5) {
    return { wordsCount: 8, hideTimer: true, mouthVisual: true, difficulty: "easy" };
  }
  return { wordsCount: 12, hideTimer: false, mouthVisual: false, difficulty: "standard" };
}
