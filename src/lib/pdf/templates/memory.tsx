import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { CuttingLine, FooterBar, PageHeader, PersonalizationBar, XPTracker } from "./shared";

const c = kidPalette.r; // warm for memory

type Props = { name?: string; date?: string; eko?: boolean };

const PAIRS: Array<{ w: string; pos: "P" | "S" | "K" }> = [
  { w: "SOWA", pos: "P" }, { w: "SER", pos: "P" }, { w: "SOK", pos: "P" }, { w: "ZUPA", pos: "P" },
  { w: "ZAMEK", pos: "P" }, { w: "CYTRYNA", pos: "P" }, { w: "KOC", pos: "K" }, { w: "DZWON", pos: "P" },
  { w: "SOWA", pos: "P" }, { w: "SER", pos: "P" }, { w: "SOK", pos: "P" }, { w: "ZUPA", pos: "P" },
];

export function MemoryTemplate({ name, date, eko }: Props = {}) {
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFF7ED" }}>
      <PageHeader title="MEMORY GLOSKI" subtitle="Dopasuj pare - obrazek + slowo - wytnij i graj" icon="M" color={c.primary} badge="GRA 2" heroLetter="M" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="flex gap-3 mb-3">
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex gap-3 items-center" style={{ border: `2px solid ${c.border}` }}>
          <span tw="h-8 w-8 rounded-full flex items-center justify-center text-white text-[12px] font-black shrink-0" style={{ backgroundColor: c.primary }}>!</span>
          <div tw="flex flex-col">
            <span tw="text-[11px] font-black text-[#1A1A2E]">Jak grac?</span>
            <span tw="text-[9px] font-semibold text-[#4B5563] leading-[1.4]">Wytnij karty ponizej. Poloz obrazkami w dol. Odkrywaj 2 na raz - jesli para ma ta sama gloske s/z/c/dz - zabierasz. Mow kazde slowo glosno.</span>
          </div>
        </div>
        <XPTracker stars={3} mission="6 PAR" level="2" />
      </div>

      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex items-center justify-between mb-2">
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">12 KART - wytnij wzdluz linii</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: c.primary }}>2x 6 par</span>
        </div>

        <div tw="grid grid-cols-4 gap-2.5">
          {PAIRS.map((it, idx) => {
            const src = wordToDataUri(it.w);
            const isSecondHalf = idx >= 6;
            return (
              <div key={it.w + idx} tw="rounded-[14px] bg-white p-2.5 flex flex-col items-center gap-1.5 relative" style={{ border: `2px solid #E5E7EB`, minHeight: "154px" }}>
                <span tw="absolute left-1.5 top-1.5 h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-black text-white" style={{ backgroundColor: isSecondHalf ? "#1A1A2E" : c.primary }}>{idx + 1}</span>
                {src ? <img src={src} tw="h-[84px] w-[84px] rounded-[14px] bg-white" /> : <span tw="h-[84px] w-[84px] rounded-[14px] bg-white flex items-center justify-center text-[14px] font-black" style={{ border: `2px solid #E5E7EB`, color: c.primary }}>{it.w.charAt(0)}</span>}
                <span tw="text-[10px] font-black text-[#1A1A2E] text-center leading-none">{it.w}</span>
                <span tw="text-[7px] font-black px-1.5 py-0.5 rounded-full" style={{ backgroundColor: c.light, color: c.dark, border: `1px solid ${c.border}` }}>{it.pos}</span>
                {isSecondHalf && <span tw="absolute right-1.5 bottom-1.5 h-2 w-2 rounded-full" style={{ backgroundColor: c.primary }} />}
              </div>
            );
          })}
        </div>
        <div tw="mt-2">
          <CuttingLine />
        </div>
        <span tw="text-[7px] font-bold text-[#9CA3AF] text-center">Linie ciecia - nozyczki doroslego - zaokraglij rogi po cieciu dla bezpieczenstwa</span>
      </div>

      <div tw="rounded-[16px] bg-white p-3 flex gap-3" style={{ border: `2px solid ${c.border}` }}>
        <div tw="flex-1 rounded-[12px] bg-[#FFF7ED] p-3 flex flex-col gap-1" style={{ border: `1.5px solid ${c.border}` }}>
          <span tw="text-[8px] font-black tracking-widest text-[#9A3412]">WARIANT TRUDNIEJSZY</span>
          <span tw="text-[8px] font-semibold text-[#4B5563] leading-[1.4]">Odwroc 3 karty naraz. Znajdz 3 slowa z gloska w tej samej pozycji P/S/K.</span>
        </div>
        <div tw="flex-1 rounded-[12px] bg-white p-3 flex flex-col items-center" style={{ border: `1.5px solid #E5E7EB` }}>
          <span tw="text-[8px] font-black tracking-widest text-[#6B7280]">WYGRANA</span>
          <span tw="text-[9px] font-black text-[#1A1A2E] mt-1">6 par = 6 naklejek + dyplom</span>
          <span tw="text-[7px] font-bold text-[#9CA3AF]">Zapisz wynik: ___ / 6</span>
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

      <FooterBar text="Memory gloski - s z c dz - ciecie + pamiec - A4 laminuj" color={c.dark} />
    </div>
  );
}
