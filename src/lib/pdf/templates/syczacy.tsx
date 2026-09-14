import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { cymaticMandalaFull } from "../cymaticPatterns";
import { profileFromProbe, type Profile } from "../neuro/profile";
import { CuttingLine, FooterBar, HierarchyBar, PageHeader, PersonalizationBar, SelfRating, StickerStrip } from "./shared";
const c = kidPalette.sycy;
export function SyczacyTemplate({ name, date, eko, profile }: { name?: string; date?: string; eko?: boolean; profile?: Profile } = {}) {
  const words: Array<{ w: string; pos: "P" | "S" | "K" }> = [
    { w: "SOWA", pos: "P" }, { w: "SOK", pos: "P" }, { w: "SER", pos: "P" }, { w: "ZUPA", pos: "P" },
    { w: "ZAMEK", pos: "P" }, { w: "CYTRYNA", pos: "P" }, { w: "KOC", pos: "K" }, { w: "DZWON", pos: "P" },
  ];
  const displayWords = words.slice(0, profile?.wordsCount ?? 8);
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFFBEB" }}>
      <PageHeader title="SYK SYCZĄCY" subtitle="Szereg syczący — s z c dz — syczy jak wąż" icon="S" color={c.primary} badge="1" heroLetter="S" />
      <PersonalizationBar name={name} date={date} color={c.primary} />
      <HierarchyBar accent={c.primary} active={3} />
      <div tw="rounded-[16px] bg-white p-3 mb-3 flex gap-3 items-center" style={{ border: `2.5px dashed ${c.secondary}` }}>
        <div tw="h-8 w-8 rounded-full flex items-center justify-center text-white text-[14px] font-black shrink-0" style={{ backgroundColor: c.secondary }}>!</div>
        <div tw="flex flex-col flex-1">
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.secondary }}>Zasada syku</span>
          <span tw="text-[10px] font-bold text-[#1A1A2E] leading-tight">Język za zębami, syczy cicho s-s-s. Mów na wydechu.</span>
        </div>
        <div tw="flex gap-1.5 shrink-0">
          {["Słuchaj", "Sycz", "Mów"].map((s, i) => (
            <span key={s} tw="rounded-full px-3 py-1 text-center text-[8px] font-black text-white" style={{ backgroundColor: i === 0 ? c.primary : i === 1 ? c.secondary : "#22C55E" }}>{i + 1}. {s}</span>
          ))}
        </div>
      </div>

      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px dashed ${c.border}` }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[11px] font-black tracking-widest text-[#1A1A2E]">8 SŁÓW — pokoloruj gruby kontur</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: c.primary }}>P = początek • K = koniec</span>
        </div>
        {/* First 4 words */}
        <div tw="grid grid-cols-4 gap-8">
          {displayWords.slice(0, 4).map((it) => (
            <div key={it.w} tw="rounded-[18px] bg-white py-4 px-3 flex flex-col items-center gap-2" style={{ border: `1.8px dashed #E5E7EB`, minHeight: "192px", backgroundColor: "#FFFFFF" }}>
              {wordToDataUri(it.w) ? (
                <img src={wordToDataUri(it.w)!} tw="h-[132px] w-[132px] rounded-[14px] shrink-0" style={{ border: `1.5px solid #E5E7EB`, objectFit: "cover" as any }} />
              ) : (
                <span tw="h-[132px] w-[132px] rounded-[14px] bg-white flex items-center justify-center text-[24px] font-black shrink-0" style={{ border: `1.5px solid #E5E7EB`, color: c.primary }}>{it.w.charAt(0)}</span>
              )}
              <span tw="text-[12px] font-black text-[#1A1A2E] text-center leading-none tracking-tight">{it.w}</span>
              <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : "#EF4444" }}>{it.pos}</span>
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
        {/* Narrative break */}
        <div tw="flex items-center justify-center gap-2 my-3 py-2" style={{ backgroundColor: "#F9FAFB", borderRadius: "12px" }}>
          <span tw="text-[8px] font-black tracking-widest" style={{ color: c.primary }}>Teraz lecimy dalej! Skocz 3×</span>
        </div>
        {/* Last 4 words */}
        <div tw="grid grid-cols-4 gap-8">
          {displayWords.slice(4, 8).map((it) => (
            <div key={it.w} tw="rounded-[18px] bg-white py-4 px-3 flex flex-col items-center gap-2" style={{ border: `1.8px dashed #E5E7EB`, minHeight: "192px", backgroundColor: "#FFFFFF" }}>
              {wordToDataUri(it.w) ? (
                <img src={wordToDataUri(it.w)!} tw="h-[132px] w-[132px] rounded-[14px] shrink-0" style={{ border: `1.5px solid #E5E7EB`, objectFit: "cover" as any }} />
              ) : (
                <span tw="h-[132px] w-[132px] rounded-[14px] bg-white flex items-center justify-center text-[24px] font-black shrink-0" style={{ border: `1.5px solid #E5E7EB`, color: c.primary }}>{it.w.charAt(0)}</span>
              )}
              <span tw="text-[12px] font-black text-[#1A1A2E] text-center leading-none tracking-tight">{it.w}</span>
              <span tw="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : "#EF4444" }}>{it.pos}</span>
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
        <img src={cymaticMandalaFull({ letter: "S", accent: c.primary, series: "syczacy" })} tw="h-[220px] w-[220px] mt-1" />
      </div>

      <div tw="flex gap-4 mb-3">
        <div tw="flex-1 rounded-[16px] bg-white p-4 flex flex-col gap-2" style={{ border: `2.5px dashed ${c.border}` }}>
          <span tw="text-[10px] font-black tracking-widest text-[#713F12]">Słuchaj — które słowo?</span>
          <div tw="flex flex-col gap-2 mt-1">
            {[
              ["SOK", "SZOK"],
              ["CENA", "CZAPKA"],
              ["SUM", "SZUM"],
            ].map(([a, b]) => (
              <div key={a + b} tw="rounded-[14px] bg-white p-3 flex items-center gap-2" style={{ border: `2px solid ${c.border}` }}>
                <span tw="flex-1 text-center text-[11px] font-black text-[#1A1A2E]">{a}</span>
                <span tw="text-[8px] font-black text-[#9CA3AF]">VS</span>
                <span tw="flex-1 text-center text-[11px] font-black" style={{ color: c.dark }}>{b}</span>
                <span tw="h-6 w-6 rounded-full bg-white shrink-0" style={{ border: `2px solid ${c.primary}` }} />
              </div>
            ))}
          </div>
          <span tw="text-[7px] font-bold text-[#6B7280]">Dorosły mówi — dziecko wskazuje i kropkuje</span>
        </div>
        <div tw="flex-1 rounded-[16px] bg-white p-4 flex flex-col gap-2" style={{ border: `2.5px dashed ${c.secondary}` }}>
          <span tw="text-[10px] font-black tracking-widest" style={{ color: c.secondary }}>Ruch + głos</span>
          {[
            "Skok + SOWA — klaśnij",
            "Rzut + ZUPA — celuj",
            "Kółka ramion + CYTRYNA — kręć",
          ].map((t, i) => (
            <div key={t} tw="rounded-[14px] bg-[#FFFBEB] px-3 py-3 flex items-center gap-2" style={{ border: "1.5px solid #FDE68A" }}>
              <span tw="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: c.primary }}>{i + 1}</span>
              <span tw="text-[9px] font-bold text-[#1A1A2E] flex-1">{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div tw="rounded-[16px] bg-white p-4 mb-3 flex gap-3 items-center" style={{ border: `2px solid ${c.border}` }}>
        <img src={wordToDataUri("SOWA")!} tw="h-[88px] w-[88px] rounded-[14px] shrink-0 bg-white" style={{ border: `2px solid ${c.border}` }} />
        <div tw="flex flex-col flex-1 gap-1">
          <span tw="text-[9px] font-black tracking-widest text-[#713F12]">Historyjka — przeczytaj razem</span>
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6]">Sok z cytryny na stole. Zuzia zaszywa zamek. Dzwon dudni, dzik tupie. Sowa syczy: sss...</span>
        </div>
        <img src={wordToDataUri("CYTRYNA")!} tw="h-[88px] w-[88px] rounded-[14px] shrink-0 bg-white" style={{ border: `2px solid ${c.border}` }} />
      </div>

      <div tw="flex gap-3">
        <div tw="flex-1"><SelfRating accent={c.primary} /></div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}><CuttingLine /><StickerStrip count={4} accent={c.primary} label="NAKLEJKI — wytnij" /></div>
      </div>
      <FooterBar text="Syk Syczący — s z c dz — 2 strony A4 — laminuj" color={c.dark} />
    </div>
  );
}
