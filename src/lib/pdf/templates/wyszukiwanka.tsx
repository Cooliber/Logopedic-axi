import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { FooterBar, PageHeader, PersonalizationBar, XPTracker } from "./shared";

const c = kidPalette.sycy;
type Props = { name?: string; date?: string; eko?: boolean };

const WORDS = ["SOWA", "SOK", "SER", "ZUPA", "ZAMEK", "CYTRYNA", "KOC", "DZWON"];
const GRID: string[][] = [
  ["S", "O", "W", "A", "X", "C", "Y", "T", "R", "K"],
  ["Z", "U", "P", "A", "S", "E", "R", "O", "C", "Z"],
  ["C", "Y", "T", "R", "Y", "N", "A", "S", "O", "K"],
  ["K", "O", "C", "D", "Z", "W", "O", "N", "A", "M"],
  ["S", "O", "K", "Z", "A", "M", "E", "K", "S", "E"],
  ["Z", "A", "M", "E", "K", "S", "O", "W", "A", "R"],
  ["C", "E", "B", "U", "L", "A", "Z", "U", "P", "A"],
  ["D", "Z", "W", "O", "N", "K", "O", "C", "S", "O"],
  ["S", "E", "R", "X", "C", "Y", "T", "R", "Y", "N"],
  ["K", "A", "S", "Z", "A", "M", "E", "K", "D", "Z"],
];

export function WyszukiwankaTemplate({ name, date, eko }: Props = {}) {
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFFBEB" }}>
      <PageHeader title="WYSZUKIWANKA SLOW" subtitle="Znajdz 8 slow - zakresl - powiedz glosno" icon="W" color={c.primary} badge="GRA 3" heroLetter="W" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="flex gap-3 mb-3">
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex gap-2 items-center" style={{ border: `2px solid ${c.border}` }}>
          <span tw="h-8 w-8 rounded-full flex items-center justify-center text-white text-[12px] font-black shrink-0" style={{ backgroundColor: c.primary }}>1</span>
          <span tw="text-[9px] font-semibold text-[#4B5563] leading-[1.4] flex-1">Odszukaj slowa poziomo i pionowo. Kazde znalezione zakrestl kolorem i powiedz 3x z gloska s/z/c/dz. Na koniec pokoloruj obrazki ponizej.</span>
        </div>
        <XPTracker stars={3} mission="8 SLOW" level="3" />
      </div>

      <div tw="flex gap-3 mb-3">
        {/* GRID */}
        <div tw="flex-1 rounded-[16px] bg-white p-3" style={{ border: `2px solid ${c.border}` }}>
          <div tw="flex items-center justify-between mb-2">
            <span tw="text-[8px] font-black tracking-widest text-[#1A1A2E]">SIATKA LITER 10x10</span>
            <span tw="text-[7px] font-bold text-[#9CA3AF]">poziomo + pionowo</span>
          </div>
          <div tw="flex flex-col gap-0.5">
            {GRID.map((row, ri) => (
              <div key={ri} tw="flex gap-0.5">
                {row.map((ch, ci) => (
                  <span
                    key={ci}
                    tw="flex-1 h-[22px] flex items-center justify-center rounded-[6px] text-[9px] font-black"
                    style={{
                      backgroundColor: WORDS.some((w) => w.includes(ch)) ? "#FFFBEB" : "white",
                      border: `1px solid ${WORDS.some((w) => w.includes(ch)) ? "#FDE68A" : "#E5E7EB"}`,
                      color: "#1A1A2E",
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div tw="mt-2 flex gap-1.5 flex-wrap">
            {["poziomo", "pionowo", "od lewej", "od gory"].map((t) => (
              <span key={t} tw="text-[7px] font-bold px-2 py-1 rounded-full bg-white" style={{ border: `1px solid #E5E7EB`, color: "#6B7280" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* WORD BANK */}
        <div tw="w-[160px] rounded-[16px] bg-white p-3 flex flex-col gap-2 shrink-0" style={{ border: `2px solid ${c.border}` }}>
          <span tw="text-[8px] font-black tracking-widest text-[#1A1A2E]">BANK SLOW</span>
          <div tw="flex flex-col gap-1.5">
            {WORDS.map((w) => {
              const src = wordToDataUri(w);
              return (
                <div key={w} tw="flex items-center gap-2 rounded-full bg-[#FFFBEB] px-2 py-1.5" style={{ border: `1.5px solid #FDE68A` }}>
                  {src ? <img src={src} tw="h-8 w-8 rounded-[6px]" style={{ border: `1px solid #E5E7EB` }} /> : <span tw="h-8 w-8 rounded-[6px] bg-white flex items-center justify-center text-[8px] font-black" style={{ border: `1px solid #E5E7EB`, color: c.primary }}>{w[0]}</span>}
                  <span tw="text-[8px] font-black text-[#1A1A2E] flex-1">{w}</span>
                  <span tw="h-3 w-3 rounded-full bg-white" style={{ border: `1.5px solid ${c.primary}` }} />
                </div>
              );
            })}
          </div>
          <span tw="text-[7px] font-bold text-[#9CA3AF] text-center">Zakresl i odhacz</span>
        </div>
      </div>

      <div tw="rounded-[16px] bg-white p-3 flex items-center gap-2" style={{ border: `1.5px dashed #E5E7EB` }}>
        <span tw="h-6 w-6 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0" style={{ backgroundColor: c.primary }}>2</span>
        <span tw="text-[9px] font-bold text-[#1A1A2E] flex-1">Wyzwanie: znajdz wszystkie 8 w mniej niz 4 minuty - uruchom stoper!</span>
        <span tw="text-[7px] font-black px-3 py-1 rounded-full bg-[#1A1A2E] text-white">START TIMER</span>
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

      <FooterBar text="Wyszukiwanka - s z c dz - uwaga wzrokowa - A4" color={c.dark} />
    </div>
  );
}
