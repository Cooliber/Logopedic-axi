import { kidPalette, type TemplateProps } from "../theme";
import { wordToDataUri } from "../icons";
import { DottedCard, FooterBar } from "./shared";

export function DyplomTemplate({ name, date, eko }: TemplateProps = {}) {
  const displayName = name || "__________________";
  const displayDate = date || new Date().toLocaleDateString("pl-PL");
  const bg = eko ? "#FFFFFF" : "#FFFBEB";
  const accent = "#F59E0B";

  const badges = [
    { title: "Syczące", sub: "s z c dz", color: kidPalette.sycy.primary, word: "SOWA" },
    { title: "Szumiące", sub: "sz ż cz dż", color: kidPalette.szum.primary, word: "SZKOLA" },
    { title: "Ciszące", sub: "ś ź ć dź", color: "#8B5CF6", word: "SLIMAK" },
    { title: "Rotacyzm", sub: "R", color: kidPalette.r.primary, word: "RAKIETA" },
    { title: "Płynność", sub: "oddech", color: kidPalette.plynnosc.primary, word: "MYSZ" },
    { title: "Dialog", sub: "mówienie", color: kidPalette.dialog.primary, word: "ZABA" },
  ];

  return (
    <div tw="flex flex-col p-6 w-full min-h-full items-center justify-center" style={{ backgroundColor: bg }}>
      <div tw="flex flex-col w-full rounded-[28px] bg-white p-7 items-center" style={{ border: `4px solid ${accent}`, boxShadow: "0 4px 0 rgba(0,0,0,0.08)" }}>
        <div tw="flex items-center gap-2 rounded-full px-5 py-2" style={{ backgroundColor: accent }}>
          <span tw="text-[11px] font-black text-white tracking-widest">SUPER LOGOPEDA *</span>
        </div>

        <span tw="text-[10px] font-black tracking-[0.3em] text-[#6B7280] mt-3">DYPLOM</span>
        <span tw="text-[26px] font-black text-[#1A1A2E] mt-1 text-center leading-none">DLA MISTRZA GŁOSEK</span>
        <div tw="h-[3px] w-[160px] rounded-full mt-3" style={{ backgroundColor: accent }} />

        <span tw="text-[11px] font-bold text-[#6B7280] mt-5">Niniejszy dyplom otrzymuje</span>

        <div tw="mt-3 w-full rounded-[18px] bg-[#FFFBEB] px-6 py-5 flex flex-col items-center" style={{ border: "2.5px dashed #FDE68A" }}>
          <span tw="text-[24px] font-black text-[#1A1A2E] text-center tracking-tight">{displayName}</span>
          <span tw="text-[10px] font-bold text-[#92400E] mt-1">za wspaniałą pracę i piękne mówienie</span>
          <div tw="flex gap-1.5 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} tw="h-3 w-3 rounded-full" style={{ backgroundColor: "#FACC15", border: "1.5px solid #EAB308" }} />
            ))}
          </div>
        </div>

        <div tw="grid grid-cols-3 gap-2.5 w-full mt-5">
          {badges.map((b) => {
            const icon = wordToDataUri(b.word);
            return (
              <div key={b.title} tw="rounded-[14px] bg-white p-2.5 flex flex-col items-center gap-1" style={{ border: `2px solid ${b.color}` }}>
                {icon ? <img src={icon} tw="h-8 w-8 rounded-[8px]" style={{ border: `1.5px solid ${b.color}` }} /> : <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-black text-white" style={{ backgroundColor: b.color }}>OK</span>}
                <span tw="text-[9px] font-black text-[#1A1A2E] mt-0.5">{b.title}</span>
                <span tw="text-[7px] font-bold text-[#6B7280]">{b.sub}</span>
                <span tw="text-[6px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: b.color }}>ZALICZONE</span>
              </div>
            );
          })}
        </div>

        <div tw="w-full rounded-[12px] bg-[#F9FAFB] px-4 py-2.5 mt-5 flex items-center justify-between" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[8px] font-bold text-[#6B7280]">Poziom trudności: P/S/K • Van Riper: UCHO-ZDANIE • Czas: 8-10 min / karta</span>
          <span tw="text-[8px] font-black text-[#1A1A2E]">* * *</span>
        </div>

        <div tw="flex w-full justify-between items-end mt-6">
          <div tw="flex flex-col items-center">
            <div tw="w-[140px] h-[1px] bg-[#1A1A2E]" />
            <span tw="text-[8px] font-bold text-[#6B7280] mt-1">podpis logopedy / rodzica</span>
          </div>
          <div tw="h-[64px] w-[64px] rounded-full bg-white flex items-center justify-center" style={{ border: `3px solid ${accent}` }}>
            <span tw="text-[22px] font-black" style={{ color: accent }}>*</span>
          </div>
          <div tw="flex flex-col items-center">
            <span tw="text-[10px] font-black text-[#1A1A2E]">{displayDate}</span>
            <div tw="w-[120px] h-[1px] bg-[#1A1A2E] mt-1" />
            <span tw="text-[8px] font-bold text-[#6B7280] mt-1">data</span>
          </div>
        </div>

        <span tw="text-[8px] font-bold text-[#6B7280] mt-3 text-center">Laminuj i powieś na ścianie — jesteś bohaterem mowy! • Drukuj w kolorze, wersja eko oszczędza tusz</span>
      </div>

      <FooterBar text="Dyplom Super Logopedy  personalizacja imienia + data  druk kolor  A4  nagroda" color={accent} />
    </div>
  );
}
