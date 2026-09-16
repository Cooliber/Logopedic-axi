import { EngagingQuestTemplate } from "./engaging";

const WORDS: Array<{ w: string; pos: "P" | "S" | "K" }> = [
  { w: "SOWA", pos: "P" }, { w: "SOK", pos: "P" }, { w: "SER", pos: "P" }, { w: "ZUPA", pos: "P" },
  { w: "ZAMEK", pos: "P" }, { w: "CYTRYNA", pos: "P" }, { w: "KOC", pos: "K" }, { w: "DZWON", pos: "P" },
];

export function SyczacyTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return <EngagingQuestTemplate szereg="syczacy" words={WORDS} name={name} date={date} eko={eko} title="SYK SYCZĄCY" subtitle="s z c dz — syczy jak wąż" />;
}
