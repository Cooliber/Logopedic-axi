import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { cymaticMandalaFull } from "../cymaticPatterns";
import { CuttingLine, FooterBar, HierarchyBar, PageHeader, PersonalizationBar, SelfRating, StickerStrip } from "./shared";
const c = kidPalette.r;
export function RotacyzmTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  const words: Array<{ w: string; pos: "P" | "S" | "K" }> = [
    { w: "RAKIETA", pos: "P" }, { w: "ROWER", pos: "P" }, { w: "RYBA", pos: "P" }, { w: "RÓŻA", pos: "P" },
    { w: "KROWA", pos: "S" }, { w: "TRAMWAJ", pos: "S" }, { w: "TORT", pos: "K" }, { w: "MUR", pos: "K" },
  ];
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFF7ED" }}>
      <PageHeader title="RYCZĄCY LEW" subtitle="Rotacyzm — R — język do wałka, drży" icon="R" color={c.primary} badge="BOSS" heroLetter="R" />
      <PersonalizationBar name={name} date={date} color={c.primary} />
      <HierarchyBar accent={c.primary} active={3} />
      <div tw="rounded-[16px] bg-white p-3 mb-3 flex gap-3 items-center" style={{ border: `2.5px dashed ${c.secondary}` }}>
        <div tw="h-8 w-8 rounded-full flex items-center justify-center text-white text-[14px] font-black shrink-0" style={{ backgroundColor: c.secondary }}>!</div>
        <div tw="flex flex-col flex-1">
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.secondary }}>Zasada R</span>
          <span tw="text-[10px] font-bold text-[#1A1A2E] leading-tight">Język do wałka, dmuchaj trrr, potem rrr. Najpierw TRA/DRA.</span>
        </div>
        <div tw="flex gap-1.5 shrink-0">
          {["Most", "Drży", "Mów"].map((s, i) => (
            <span key={s} tw="rounded-full px-3 py-1 text-center text-[8px] font-black text-white" style={{ backgroundColor: i === 0 ? c.primary : i === 1 ? c.secondary : "#22C55E" }}>{i + 1}. {s}</span>
          ))}
        </div>
      </div>
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px dashed ${c.border}` }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[11px] font-black tracking-widest text-[#1A1A2E]">8 SŁÓW — pokoloruj gruby kontur</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: c.primary }}>P = początek • Ś/S = środek</span>
        </div>
        <div tw="grid grid-cols-2 gap-8">
          {words.map((it) => (
            <div key={it.w} tw="rounded-[18px] bg-white py-4 px-3 flex flex-col items-center gap-2" style={{ border: `2.5px solid #1A1A2E`, boxShadow: "0 3px 0 rgba(0,0,0,0.08)", minHeight: "192px" }}>
              <img src={wordToDataUri(it.w)!} tw="h-[118px] w-[118px] rounded-[14px] shrink-0" style={{ border: `2.5px solid ${c.primary}` }} />
              <span tw="text-[12px] font-black text-[#1A1A2E] text-center leading-none tracking-tight">{it.w}</span>
              <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : it.pos === "S" ? "#F59E0B" : "#EF4444" }}>{it.pos}</span>
              <div tw="flex gap-1.5 mt-1">
                <span tw="h-4 w-4 rounded-full bg-white" style={{ border: "1.8px solid #E5E7EB" }} />
                <span tw="h-4 w-4 rounded-full bg-white" style={{ border: "1.8px solid #E5E7EB" }} />
                <span tw="h-4 w-4 rounded-full bg-white" style={{ border: "1.8px solid #E5E7EB" }} />
                <span tw="h-4 w-4 rounded-full bg-white" style={{ border: "1.8px solid #E5E7EB" }} />
              </div>
              <div tw="w-[56px] h-[1px] mt-1" style={{ borderTop: "1.8px dashed #E5E7EB" }} />
            </div>
          ))}
        </div>
      </div>
      <div tw="rounded-[16px] bg-white p-3 flex items-center gap-3 mb-2" style={{ border: `2px solid ${c.primary}` }}>
        <span tw="h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-black text-white" style={{ backgroundColor: c.primary }}>*</span>
        <span tw="text-[10px] font-black text-[#1A1A2E] flex-1">Misja: 8 słów — Zdobądź naklejkę</span>
        <div tw="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} tw="h-4 w-4 rounded-full flex items-center justify-center text-[8px] font-black" style={{ backgroundColor: i === 0 ? "#22C55E" : "#E5E7EB", color: i === 0 ? "white" : "#9CA3AF" }}>{i + 1}</span>
          ))}
        </div>
        <span tw="text-[8px] font-black px-3 py-2 rounded-full text-white" style={{ backgroundColor: c.primary }}>+10 XP</span>
      </div>
      <div tw="flex items-center justify-center gap-2 my-1" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">— KONIEC STRONY 1 — przewróć kartkę —</span>
      </div>
      <div tw="rounded-[20px] bg-white p-4 mb-3 flex flex-col items-center gap-2" style={{ border: `2.5px dashed ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E]">MANDALA — skup uwagę 2 min</span>
        <span tw="text-[8px] font-bold text-[#6B7280] text-center">Koloruj od środka na zewnątrz — wybierz 2 kolory</span>
        <img src={cymaticMandalaFull({ letter: "R", accent: c.primary, series: "rotacyzm" })} tw="h-[220px] w-[220px] mt-1" />
      </div>
      <div tw="flex gap-4 mb-3">
        <div tw="flex-1 rounded-[16px] bg-white p-4 flex flex-col gap-2" style={{ border: `2.5px dashed ${c.border}` }}>
          <span tw="text-[10px] font-black tracking-widest text-[#7C2D12]">Sylaby — stukaj 3×</span>
          <div tw="grid grid-cols-3 gap-2 mt-1">
            {["RA", "RE", "RI", "RO", "RU", "RY"].map((s) => (
              <div key={s} tw="rounded-[12px] p-3 text-center" style={{ backgroundColor: "#FFF7ED", border: `1.5px dashed ${c.border}` }}>
                <span tw="text-[14px] font-black" style={{ color: c.dark }}>{s}</span>
              </div>
            ))}
          </div>
          <span tw="text-[7px] font-bold text-[#6B7280]">Jeśli R nie drga — wróć do TRA/DRA (most)</span>
        </div>
        <div tw="flex-1 rounded-[16px] bg-white p-4 flex flex-col gap-2" style={{ border: `2.5px dashed ${c.secondary}` }}>
          <span tw="text-[10px] font-black tracking-widest" style={{ color: c.secondary }}>Ruch + głos</span>
          {[
            "Tup jak lew + RYK",
            "Skok + ROWER — jedź",
            "Kółka ramion + RÓŻA — kręć",
          ].map((t, i) => (
            <div key={t} tw="rounded-[14px] bg-[#FFF7ED] px-3 py-3 flex items-center gap-2" style={{ border: "1.5px solid #FDBA74" }}>
              <span tw="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: c.primary }}>{i + 1}</span>
              <span tw="text-[9px] font-bold text-[#1A1A2E] flex-1">{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div tw="rounded-[16px] bg-white p-4 mb-3 flex gap-3 items-center" style={{ border: `2px solid ${c.border}` }}>
        <img src={wordToDataUri("RAKIETA")!} tw="h-[88px] w-[88px] rounded-[14px] shrink-0 bg-white" style={{ border: `2px solid ${c.border}` }} />
        <div tw="flex flex-col flex-1 gap-1">
          <span tw="text-[9px] font-black tracking-widest text-[#7C2D12]">Historyjka — przeczytaj razem</span>
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6]">Rysio rysuje różową rakietę. Krowa ryczy na ranczo. Tramwaj skręca w prawo.</span>
        </div>
        <img src={wordToDataUri("TORT")!} tw="h-[88px] w-[88px] rounded-[14px] shrink-0 bg-white" style={{ border: `2px solid ${c.border}` }} />
      </div>
      <div tw="flex gap-3">
        <div tw="flex-1"><SelfRating accent={c.primary} /></div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}><CuttingLine /><StickerStrip count={4} accent={c.primary} label="NAKLEJKI — wytnij" /></div>
      </div>
      <FooterBar text="Ryczący Lew — R — 2 strony A4 — laminuj" color={c.primary} />
    </div>
  );
}
