import { kidPalette } from "../theme";
import {
  vowelFormant,
  flowerOfLife,
  metatronsCube,
  concentricCircles,
} from "../cymaticPatterns";
import {
  PageHeader,
  PersonalizationBar,
  InstructionCard,
  FooterBar,
  DottedCard,
  SelfRating,
  XPTracker,
  WordBubble,
  HierarchyBar,
  StickerStrip,
  CuttingLine,
} from "./shared";

const c = { primary: "#A855F7", secondary: "#9333EA", accent: "#7C3AED", light: "#FAF5FF", dark: "#581C87", border: "#E9D5FF", paper: "#FAF5FF" };

const vowels = [
  { letter: "A", label: "Otwarte A", formant: "niskie F1, srednie F2", pattern: vowelFormant({ vowel: "A", stroke: c.primary, strokeWidth: 1.5 }), shape: "szerokie kola", example: "AMA" },
  { letter: "E", label: "Srednie E", formant: "srednie F1, wysokie F2", pattern: vowelFormant({ vowel: "E", stroke: c.primary, strokeWidth: 1.5 }), shape: "wezly", example: "EME" },
  { letter: "I", label: "Waskie I", formant: "niskie F1, bardzo wysokie F2", pattern: vowelFormant({ vowel: "I", stroke: c.primary, strokeWidth: 1.5 }), shape: "ciasne skupisko", example: "IMI" },
  { letter: "O", label: "Zaokraglone O", formant: "niskie F1, niskie F2", pattern: vowelFormant({ vowel: "O", stroke: c.primary, strokeWidth: 1.5 }), shape: "spirala", example: "OMO" },
  { letter: "U", label: "Glebokie U", formant: "bardzo niskie F1, niskie F2", pattern: vowelFormant({ vowel: "U", stroke: c.primary, strokeWidth: 1.5 }), shape: "szerokie pierscienie", example: "UMU" },
  { letter: "Y", label: "Zamkniete Y", formant: "niskie F1, srednie F2", pattern: vowelFormant({ vowel: "Y", stroke: c.primary, strokeWidth: 1.5 }), shape: "spiralny waski", example: "YMY" },
];

export function SacredVowelsTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : c.light }}>
      <PageHeader title="SWIETE SAMOGLOSKI" subtitle="Cymatyka samoglosek — geometria glosu" icon="O" color={c.primary} badge="3" heroLetter="O" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <HierarchyBar accent={c.primary} active={3} />

      {/* PAGE 1: Vowel Cymatic Map */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E]">MAPA SAMOGLOSEK — KSZTALT CZESTOTLIWOSCI</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: c.primary }}>6 samoglosek</span>
        </div>
        <div tw="grid grid-cols-3 gap-3">
          {vowels.map((v) => (
            <div key={v.letter} tw="rounded-[14px] bg-[#FAF5FF] p-3 flex flex-col items-center gap-1.5" style={{ border: `2px solid ${c.border}` }}>
              <img src={v.pattern} tw="h-[60px] w-[60px] rounded-[10px]" style={{ border: `1.5px solid ${c.border}` }} />
              <span tw="text-[14px] font-black" style={{ color: c.dark }}>{v.letter}</span>
              <span tw="text-[7px] font-bold text-[#6B7280] text-center">{v.shape}</span>
              <span tw="text-[6px] font-bold text-[#9CA3AF] text-center">{v.formant}</span>
            </div>
          ))}
        </div>
      </div>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">--- KONIEC STRONY 1 - przewroc kartke ---</span>
      </div>

      {/* PAGE 2: Exercises */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">CWICZENIE — ODDECH + SAMOGLOSKA</span>
        <span tw="text-[8px] font-bold text-[#6B7280] mb-3">Wdech nosem 4s. Wydech ustami na samogloske 8s. Koloruj wzor.</span>
        <div tw="grid grid-cols-3 gap-3">
          {vowels.slice(0, 3).map((v) => (
            <div key={v.letter} tw="flex flex-col gap-2 items-center">
              <div tw="h-[70px] w-full rounded-[12px] bg-white flex items-center justify-center" style={{ border: `2.5px dashed ${c.border}` }}>
                <span tw="text-[8px] font-bold text-[#D1D5DB]">Rysuj {v.letter}</span>
              </div>
              <span tw="text-[9px] font-black" style={{ color: c.dark }}>{v.letter} — {v.label}</span>
              <span tw="text-[7px] font-bold text-[#6B7280]">Przyklad: {v.example}</span>
            </div>
          ))}
        </div>
      </div>

      <DottedCard bg="#FFFFFF" border={c.border}>
        <span tw="text-[10px] font-black tracking-widest" style={{ color: c.dark }}>PARY MINIMALNE — Gloski vs Samogloski</span>
        <div tw="grid grid-cols-2 gap-2 mt-2">
          {[
            { a: "A", b: "O", q: "Otwarte vsZaokraglone" },
            { a: "E", b: "I", q: "Srednie vs Waskie" },
            { a: "U", b: "Y", q: "Glebokie vs Zamkniete" },
            { a: "A", b: "E", q: "Otwarte vs Srednie" },
          ].map((p) => (
            <div key={p.a + p.b} tw="rounded-full bg-[#FAF5FF] px-3 py-2 flex items-center gap-2" style={{ border: "1.5px solid #E9D5FF" }}>
              <span tw="text-[11px] font-black" style={{ color: c.dark }}>{p.a}</span>
              <span tw="text-[7px] font-bold text-[#6B7280]">VS</span>
              <span tw="text-[11px] font-black" style={{ color: c.accent }}>{p.b}</span>
              <span tw="text-[6px] font-bold text-[#9CA3AF] flex-1 text-right">{p.q}</span>
            </div>
          ))}
        </div>
      </DottedCard>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">--- KONIEC STRONY 2 - przewroc kartke ---</span>
      </div>

      {/* PAGE 3: Sacred Geometry + Closing */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <span tw="text-[10px] font-black tracking-widest text-[#1A1A2E] mb-2">SACRALNA GEOMETRIA — ZYCIE I KSZTALT</span>
        <div tw="flex gap-4 items-start">
          <img src={flowerOfLife({ stroke: c.primary, strokeWidth: 1 })} tw="h-[90px] w-[90px] shrink-0" />
          <div tw="flex flex-col gap-1.5 flex-1">
            <span tw="text-[9px] font-bold text-[#4B5563] leading-[1.5]">
              Kwiat Zycia zawiera wszystkie ksztalty geometryczne wszechswiata.
              Od dawna byl symbolem polaczenia miedzy zyciem a dzwiekiem.
              DNA od gory tworzy podobny wzorzec — fraktalna antena rezonujaca z srodowiskiem.
            </span>
            <span tw="text-[8px] font-bold text-[#6B7280] leading-[1.4]">
              Kiedy mowisz samogloske, twoje usta tworza otwore — jak katedra rezonansowa.
              Kazdy ksztalt ust = inny wzorzec cymatyczny = inny dzwiek.
            </span>
          </div>
        </div>
      </div>

      <div tw="flex gap-3 mb-3">
        <InstructionCard
          title="Zadanie domowe"
          text="Stoj przed lustrem. Mow A, E, I, O, U, Y. Patrz na usta — widzisz roznice? Narysuj ksztalty ust."
          accent={c.primary}
          steps={["Patrz", "Mow", "Rysuj"]}
          time="5 min"
        />
        <div tw="flex flex-col gap-2 shrink-0 w-[130px]">
          <XPTracker stars={5} mission="6 SAMOGLOSEK" level="3" />
          <SelfRating accent={c.primary} />
        </div>
      </div>

      <div tw="flex gap-3">
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}>
          <CuttingLine />
          <StickerStrip count={4} accent={c.primary} label="NAKLEJKI — wytnij" />
        </div>
      </div>

      <FooterBar text="Logopedia — swiete samogloski — cymatyka — geometria glosu — A4" color={c.dark} />
    </div>
  );
}
