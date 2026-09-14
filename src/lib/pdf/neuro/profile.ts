// Neuro profile — paper 2-min probe → poziom (bez sensorów, fuzzy jak Cognitia)
// Wejście: 4 minimal pairs + 1-min challenge count (z karty)
// Wyjście: level easy/standard + hideTimer + mouthVisual
export type Profile = { level: "easy" | "standard"; hideTimer: boolean; mouthVisual: boolean; wordsCount: 8 | 12 };

export type ProbeResult = {
  minimalPairsCorrect: number; // 0-4
  oneMinuteCount: number; // 0-30
  age: number; // 3-9
};

export function profileFromProbe(r: ProbeResult): Profile {
  const lowIC = r.minimalPairsCorrect <= 1;
  const lowWM = r.oneMinuteCount < 8;
  const young = r.age <= 5;
  const level: "easy" | "standard" = lowWM || young ? "easy" : "standard";
  return {
    level,
    hideTimer: lowIC, // de Mooij: visible timer → operant confusion dla low IC
    mouthVisual: lowIC || level === "easy",
    wordsCount: level === "easy" ? 8 : 12,
  };
}

// Fuzzy-like (Mamdani) — dla przyszłego digital z sensorami (BIFL)
export function fuzzyLevel(prob: ProbeResult): number {
  // 0..1 ciągły poziom trudności
  const ic = prob.minimalPairsCorrect / 4;
  const wm = Math.min(prob.oneMinuteCount / 15, 1);
  return 0.6 * ic + 0.4 * wm; // 0 easy, 1 standard
}
