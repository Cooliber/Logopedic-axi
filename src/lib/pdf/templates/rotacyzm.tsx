import { EngagingQuestTemplate } from "./engaging";

const WORDS: Array<{ w: string; pos: "P" | "S" | "K" }> = [
  { w: "RAKIETA", pos: "P" }, { w: "ROWER", pos: "P" }, { w: "RYBA", pos: "P" }, { w: "RÓŻA", pos: "P" },
  { w: "KROWA", pos: "S" }, { w: "TRAMWAJ", pos: "S" }, { w: "TORT", pos: "K" }, { w: "MUR", pos: "K" },
];

export function RotacyzmTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return <EngagingQuestTemplate szereg="rotacyzm" words={WORDS} name={name} date={date} eko={eko} title="RYCZĄCY LEW" subtitle="R — język drży" />;
}
