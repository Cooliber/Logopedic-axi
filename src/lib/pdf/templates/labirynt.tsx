import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import {
  CuttingLine,
  FooterBar,
  PageHeader,
  PersonalizationBar,
  XPTracker,
} from "./shared";

const c = kidPalette.szum; // labirynt - szumiacy vibe but generic, use szum greens

type Props = { name?: string; date?: string; eko?: boolean };

const PATH_WORDS: Array<{ w: string; pos: "P" | "S" | "K"; correct: boolean }> = [
  { w: "SOWA", pos: "P", correct: true },
  { w: "SOK", pos: "P", correct: true },
  { w: "SZAFA", pos: "P", correct: false },
  { w: "SER", pos: "P", correct: true },
  { w: "ZUPA", pos: "P", correct: true },
  { w: "CZAPKA", pos: "P", correct: false },
  { w: "CYTRYNA", pos: "P", correct: true },
  { w: "KOC", pos: "K", correct: true },
];

export function LabiryntTemplate({ name, date, eko }: Props = {}) {
  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#F0FDF4" }}>
      <PageHeader title="LABIRYNT GLOSKI" subtitle="Prowadz palcem - mow gloske na kazdym polu" icon="L" color={c.primary} badge="GRA 1" heroLetter="L" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="flex gap-3 mb-3">
        <div tw="flex-1 rounded-[16px] bg-white p-4 flex gap-3 items-center" style={{ border: `2px solid ${c.border}` }}>
          <div tw="h-10 w-10 rounded-full flex items-center justify-center text-white text-[14px] font-black shrink-0" style={{ backgroundColor: c.primary }}>1</div>
          <div tw="flex flex-col">
            <span tw="text-[11px] font-black text-[#1A1A2E]">Jak sie bawimy?</span>
            <span tw="text-[9px] font-semibold text-[#4B5563] leading-[1.4]">START - s-s-s - idz tylko po polach z gloska s/z/c/dz. Omijaj pulapki sz/cz. Mow kazde slowo 2x.</span>
          </div>
        </div>
        <XPTracker stars={3} mission="LABIRYNT" level="1" />
      </div>

      {/* MAZE GRID — 6x4 stylized, path thick dashed */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex items-center justify-between mb-2">
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">LABIRYNT - prowadz palcem od START do META</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: c.primary }}>5-7 MIN</span>
        </div>

        <div tw="flex items-stretch gap-3">
          {/* left legend */}
          <div tw="w-[88px] flex flex-col gap-2 shrink-0">
            <div tw="rounded-[12px] bg-[#ECFDF5] p-2 flex flex-col items-center gap-1" style={{ border: `1.5px solid ${c.border}` }}>
              <span tw="text-[8px] font-black text-[#065F46]">START</span>
              <span tw="h-7 w-7 rounded-full bg-white flex items-center justify-center text-[10px] font-black" style={{ border: `2px solid ${c.primary}`, color: c.primary }}>A</span>
            </div>
            <div tw="rounded-[12px] bg-white p-2" style={{ border: `1.5px solid #E5E7EB` }}>
              <span tw="text-[7px] font-black text-[#6B7280]">LEGENDA</span>
              <div tw="flex items-center gap-1.5 mt-1">
                <span tw="h-3 w-3 rounded-[4px]" style={{ backgroundColor: c.primary }} />
                <span tw="text-[7px] font-bold text-[#1A1A2E]">dobra droga s/z</span>
              </div>
              <div tw="flex items-center gap-1.5 mt-1">
                <span tw="h-3 w-3 rounded-[4px] bg-white" style={{ border: `1.5px solid #EF4444` }} />
                <span tw="text-[7px] font-bold text-[#1A1A2E]">pulapka sz/cz</span>
              </div>
            </div>
            <div tw="rounded-[12px] bg-[#1A1A2E] p-2 flex flex-col items-center">
              <span tw="text-[7px] font-black text-white/60">META</span>
              <span tw="text-[9px] font-black text-white">+10 XP</span>
            </div>
          </div>

          {/* maze cells */}
          <div tw="flex-1 grid grid-cols-4 gap-2">
            {PATH_WORDS.map((it, idx) => {
              const isTrap = !it.correct;
              const src = wordToDataUri(it.w);
              return (
                <div
                  key={it.w + idx}
                  tw="rounded-[14px] bg-white p-2 flex flex-col items-center gap-1 relative"
                  style={{
                    border: `2px ${isTrap ? "solid #FECACA" : `solid ${c.border}`}`,
                    backgroundColor: isTrap ? "#FEF2F2" : "white",
                    minHeight: "168px",
                  }}
                >
                  <span tw="absolute left-1 top-1 h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-black text-white" style={{ backgroundColor: isTrap ? "#EF4444" : c.primary }}>{idx + 1}</span>
                  {src ? (
                    <img src={src} tw="h-[64px] w-[64px] rounded-[12px] mt-1" style={{ border: `1.5px solid #E5E7EB` }} />
                  ) : (
                    <span tw="h-[64px] w-[64px] rounded-[12px] bg-white flex items-center justify-center text-[12px] font-black" style={{ border: `1.5px solid #E5E7EB`, color: c.primary }}>{it.w.charAt(0)}</span>
                  )}
                  <span tw="text-[9px] font-black text-[#1A1A2E] text-center leading-none">{it.w}</span>
                  <span tw="h-3.5 w-3.5 rounded-full flex items-center justify-center text-[6px] font-black" style={{ backgroundColor: isTrap ? "#FECACA" : c.light, color: isTrap ? "#991B1B" : c.dark, border: `1px solid ${isTrap ? "#FECACA" : c.border}` }}>{isTrap ? "X" : it.pos}</span>
                  {/* dashed connector */}
                  {idx < PATH_WORDS.length - 1 && idx % 4 !== 3 && (
                    <span tw="absolute -right-1 top-1/2 h-[6px] w-[6px] rounded-full" style={{ backgroundColor: c.border }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div tw="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#F9FAFB] px-3 py-1.5" style={{ border: "1.5px dashed #E5E7EB" }}>
          <span tw="text-[7px] font-bold text-[#6B7280]">Wskazowka: jesli dotkniesz pulapki - wroc o 1 pole i powiedz gloske w izolacji s-s-s 3x</span>
        </div>
      </div>

      {/* bottom reward */}
      <div tw="rounded-[16px] bg-white p-3 flex gap-3" style={{ border: `2px solid ${c.border}` }}>
        <div tw="flex-1 rounded-[12px] bg-[#F9FAFB] p-3 flex flex-col items-center" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[8px] font-black tracking-widest text-[#6B7280]">SAMOOCENA</span>
          <div tw="flex gap-2 mt-1">
            {["SUPER", "OK", "JESZCZE"].map((l) => (
              <span key={l} tw="flex-1 rounded-[10px] bg-white py-1 text-center text-[7px] font-black" style={{ border: `1.5px solid ${c.border}` }}>{l}</span>
            ))}
          </div>
        </div>
        <div tw="flex-1 rounded-[12px] bg-white p-3 flex flex-col gap-1" style={{ border: `1.5px solid #E5E7EB` }}>
          <CuttingLine />
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">NAGRODA - wytnij gwiazdke po dotarciu do META</span>
          <div tw="flex gap-1.5 mt-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} tw="flex-1 h-[28px] rounded-[10px] bg-[#FFFBEB] flex items-center justify-center text-[10px] font-black" style={{ border: `2px dashed ${c.primary}`, color: c.primary }}>*</span>
            ))}
          </div>
        </div>
      </div>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">- - - KONIEC STRONY 1 - przewroc kartke - - -</span>
      </div>

      <div tw="rounded-[20px] bg-white p-5 flex flex-col gap-3" style={{ border: "2.5px dashed #E5E7EB" }}>
        <span tw="text-[11px] font-black tracking-widest text-[#1A1A2E]">STRONA 2 - dodatkowe wyzwanie</span>
        <span tw="text-[9px] font-semibold text-[#4B5563] text-center leading-[1.5]">Pokaz karte doroslemu. Opowiedz kazde slowo 2x. Narysuj swoj wariant gry ponizej.</span>
        <div tw="h-[200px] rounded-[16px] bg-[#F9FAFB] flex items-center justify-center" style={{ border: "2px dashed #E5E7EB" }}>
          <span tw="text-[9px] font-bold text-[#9CA3AF]">Miejsce na rysunek / notatki terapeuty</span>
        </div>
        <div tw="flex gap-2">
          <div tw="flex-1 rounded-[12px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}>
            <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">WYNIK</span>
            <div tw="flex gap-1 mt-1">
              <span tw="flex-1 h-2 rounded-full bg-[#22C55E]" />
              <span tw="flex-1 h-2 rounded-full bg-[#E5E7EB]" />
            </div>
            <span tw="text-[7px] font-bold text-[#6B7280]">Zaliczone ___ / 8</span>
          </div>
          <div tw="flex-1 rounded-[12px] bg-[#1A1A2E] p-3 flex items-center justify-center">
            <span tw="text-[9px] font-black text-white">+10 XP za strone 2</span>
          </div>
        </div>
      </div>

      <FooterBar text="Labirynt gloski - s z c dz - ruch palca + glos - A4 laminuj" color={c.dark} />
    </div>
  );
}
