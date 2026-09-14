import { kidPalette, type TemplateProps } from "../theme";
import { wordToDataUri } from "../icons";
import { FooterBar, PageHeader, PersonalizationBar } from "./shared";

export function NaklejkiTemplate({ name, eko }: TemplateProps = {}) {
  const bg = eko ? "#FFFFFF" : "#F0FDF4";
  const stickers: Array<{ label: string; color: string; sub: string; word: string }> = [
    { label: "BRAWO!", color: "#FACC15", sub: "super", word: "SOWA" },
    { label: "SUPER!", color: "#06D6A0", sub: "mowa", word: "ZABA" },
    { label: "MISTRZ R", color: "#FF7B25", sub: "rrrr", word: "RAKIETA" },
    { label: "SZUM!", color: "#2D6A4F", sub: "sz ż", word: "SZKOLA" },
    { label: "SYK!", color: "#FACC15", sub: "s z", word: "SOWA" },
    { label: "CISZA", color: "#8B5CF6", sub: "ś ć", word: "SLIMAK" },
    { label: "PŁYNNIE", color: "#00B4D8", sub: "wolno", word: "MYSZ" },
    { label: "ODDECH", color: "#E63946", sub: "dmucham", word: "ZRODLO" },
    { label: "DIALOG", color: "#7B2CBF", sub: "gadamy", word: "ZABA" },
    { label: "GWIAZDA", color: "#F59E0B", sub: "top", word: "CYTRYNA" },
    { label: "DYPLOM", color: "#1A1A2E", sub: "top", word: "TORT" },
    { label: "LEW", color: "#FF7B25", sub: "ryczy", word: "KROWA" },
  ];

  const all = Array.from({ length: 48 }, (_, i) => stickers[i % stickers.length]);

  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: bg }}>
      <PageHeader title="NAKLEJKI I ŻETONY" subtitle="Do wycięcia  48 szt  laminuj  nagradzaj każdy krok" icon="N" color={kidPalette.oddech.secondary} badge="48 SZT" heroLetter="N" />
      <PersonalizationBar name={name} date={undefined} color={kidPalette.oddech.secondary} />

      <div tw="rounded-[14px] bg-white px-4 py-2.5 mb-3 flex items-center gap-3" style={{ border: "2.5px dashed #6EE7B7" }}>
        <span tw="text-[9px] font-black uppercase tracking-widest text-[#065F46]">Jak używać</span>
        <span tw="text-[9px] font-bold text-[#1A1A2E] leading-[1.4] flex-1">Wytnij wzdłuż linii, laminuj. Za każde zadanie naklej 1 na torze w zeszycie. 4 naklejki = odznaka tygodnia.</span>
        <span tw="text-[7px] font-black bg-[#ECFDF5] px-2 py-1 rounded-full text-[#065F46]" style={{ border: "1.5px solid #6EE7B7" }}>250g + nożyczki</span>
      </div>

      <div tw="grid grid-cols-6 gap-2">
        {all.map((s, i) => {
          const icon = wordToDataUri(s.word);
          return (
            <div
              key={i}
              tw="rounded-[14px] bg-white p-2 flex flex-col items-center justify-center gap-1"
              style={{ border: `2px solid ${s.color}`, minHeight: "64px" }}
            >
              {icon ? <img src={icon} tw="h-7 w-7 rounded-[6px]" style={{ border: `1.2px solid ${s.color}` }} /> : <span tw="h-7 w-7 rounded-full flex items-center justify-center text-[9px] font-black text-white" style={{ backgroundColor: s.color }}>{String(i + 1).padStart(2, "0")}</span>}
              <span tw="text-[8px] font-black text-center leading-none text-[#1A1A2E]">{s.label}</span>
              <span tw="text-[6px] font-bold text-[#6B7280]">{s.sub} • {String(i + 1).padStart(2, "0")}</span>
            </div>
          );
        })}
      </div>

      <div tw="mt-3 flex gap-2">
        <div tw="flex-1 rounded-[12px] bg-white p-3 flex items-center gap-2" style={{ border: "2px solid #E5E7EB" }}>
          <span tw="h-7 w-7 rounded-full bg-[#FACC15] flex items-center justify-center text-[10px] font-black text-[#713F12]">*</span>
          <span tw="text-[8px] font-bold text-[#1A1A2E] leading-tight">Drukuj na naklejkach A4 65×65 lub zwykłym papierze 250g. Wytnij — dziecko samo wybiera nagrodę (autonomia - motywacja).</span>
        </div>
        <div tw="rounded-full bg-[#06D6A0] px-4 py-2 flex flex-col items-center justify-center">
          <span tw="text-[9px] font-black text-white leading-none">48 NAKLEJEK</span>
          <span tw="text-[7px] font-bold text-white/80">A4 • 300 DPI</span>
        </div>
      </div>

      <FooterBar text="Naklejki i Żetony  48 szt  A4  wycinaj  laminuj  nagradzaj każde zadanie" color="#065F46" />
    </div>
  );
}
