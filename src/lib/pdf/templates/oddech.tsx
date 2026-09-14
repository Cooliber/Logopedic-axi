import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { CuttingLine, DottedCard, FooterBar, PageHeader, ParentTip, PersonalizationBar, SelfRating, StickerStrip, XPTracker } from "./shared";

const c = kidPalette.oddech;

export function OddechTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFF1F2" }}>
      <PageHeader title="ODDECH SMOKA" subtitle="Ćwiczenia oddechowo-fonacyjne • dmuchaj • mów • śpiewaj" icon="O" color={c.primary} badge="OGNIA" heroLetter="O" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="flex gap-3 mb-3">
        <div tw="flex-1 rounded-[14px] bg-white px-4 py-3 flex gap-3 items-center" style={{ border: "2.5px dashed #FECACA" }}>
          <img src={wordToDataUri("SMOK")!} tw="h-[36px] w-[36px] rounded-[8px] shrink-0" style={{ border: "1.5px solid #FECACA" }} />
          <div tw="flex flex-col">
            <span tw="text-[10px] font-black uppercase tracking-widest text-[#DC2626]">Zasada smoka</span>
            <span tw="text-[9px] font-bold text-[#1A1A2E] leading-[1.4]">Wdech nosem — brzuch jak balon. Wydech ustami — długo, równo, z głosem. Ramiona spokojne!</span>
          </div>
        </div>
        <XPTracker stars={5} mission="5 DNI × 5 MIN" level="SMOK" />
      </div>

      <div tw="grid grid-cols-4 gap-3 mb-3">
        {[
          { title: "ŚWIECZKA", icon: "ŚWIECA", task: "Dmuchaj\nlekko 5s", time: "5s", bg: "#FEF3C7" },
          { title: "PIÓRKO", icon: "PIÓRKO", task: "Unieś\npiórko", time: "3×", bg: "#DBEAFE" },
          { title: "SŁOMKA", icon: "SŁOMKA", task: "Bulgot w\nwodzie", time: "10s", bg: "#D1FAE5" },
          { title: "BALON", icon: "BALON", task: "Nadmuchaj\npoliczki", time: "5s+", bg: "#FCE7F3" },
        ].map((k) => (
          <div key={k.title} tw="rounded-[16px] bg-white p-3 flex flex-col items-center gap-1.5" style={{ border: "2px solid #FECACA" }}>
            <img src={wordToDataUri(k.icon)!} tw="h-[40px] w-[40px] rounded-[8px]" style={{ border: "1.5px solid #FECACA" }} />
            <span tw="text-[9px] font-black text-[#7F1D1D] text-center">{k.title}</span>
            <span tw="text-[8px] font-bold text-[#6B7280] text-center leading-tight">{k.task}</span>
            <span tw="text-[8px] font-black bg-white px-2 py-1 rounded-full" style={{ border: `1.5px solid ${k.bg}`, backgroundColor: k.bg }}>{k.time}</span>
          </div>
        ))}
      </div>

      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border="#FECACA" twExtra="flex-1">
          <span tw="text-[10px] font-black uppercase tracking-widest text-[#DC2626]">Tor oddechowy - palcem po sladzie</span>
          <div tw="mt-3 flex flex-col gap-2">
            <div tw="flex items-center gap-2">
              <span tw="h-6 w-6 rounded-full bg-[#06D6A0] flex items-center justify-center text-[9px] font-black text-white">W</span>
              <div tw="flex-1 h-[12px] rounded-full flex overflow-hidden" style={{ border: "2px solid #FECACA" }}>
                <div tw="flex-1" style={{ backgroundColor: "#06D6A0" }} />
                <div tw="flex-1 bg-white" />
                <div tw="flex-1" style={{ backgroundColor: "#06D6A0" }} />
              </div>
              <span tw="h-6 w-6 rounded-full bg-[#3B82F6] flex items-center justify-center text-[9px] font-black text-white">WY</span>
            </div>
            <div tw="flex gap-2">
              <span tw="flex-1 rounded-[10px] bg-[#ECFDF5] px-2 py-2 text-center text-[9px] font-black text-[#065F46]" style={{ border: "1.5px solid #6EE7B7" }}>
                WDECH 2s
              </span>
              <span tw="flex-1 rounded-[10px] bg-[#FEF3C7] px-2 py-2 text-center text-[9px] font-black text-[#92400E]" style={{ border: "1.5px solid #FDE68A" }}>
                PAUZA 1s
              </span>
              <span tw="flex-1 rounded-[10px] bg-[#DBEAFE] px-2 py-2 text-center text-[9px] font-black text-[#1E40AF]" style={{ border: "1.5px solid #93C5FD" }}>
                WYDECH 4s
              </span>
            </div>
            <span tw="text-[8px] font-bold text-[#6B7280]">Powtorz 5×. Na wydechu mow: sss... szsz... fff... Rowno i dlugo.</span>
            <ParentTip text="Dlon na brzuchu - ma rosnac przy wdechu. Swieczka: plomien ma drgac, nie gasnac." accent={c.primary} />
          </div>
        </DottedCard>

        <DottedCard bg="#ECFDF5" border="#6EE7B7" twExtra="flex-1">
          <span tw="text-[10px] font-black uppercase tracking-widest text-[#065F46]">Fonacja - dzwieczny wydech</span>
          <div tw="flex flex-col gap-2 mt-3">
            {[
              "Mmmmm... jak mis",
              "Zzzzz... jak pszczola",
              "Aaaa... jak lekarz",
              "Uuuu... jak wilk",
            ].map((t) => (
              <div key={t} tw="flex items-center gap-2 rounded-full bg-white px-3 py-2" style={{ border: "1.5px solid #6EE7B7" }}>
                <span tw="h-5 w-5 rounded-full bg-[#06D6A0] flex items-center justify-center text-[8px] font-black text-white">*</span>
                <span tw="text-[9px] font-bold text-[#065F46]">{t}</span>
                <span tw="ml-auto text-[8px] font-black text-[#06D6A0]">5s</span>
              </div>
            ))}
          </div>
          <span tw="text-[8px] font-bold text-[#065F46] mt-2">Cel: rowny, dlugi dzwiek bez szarpania. Nagraj i porownaj jutro.</span>
        </DottedCard>
      </div>

      <DottedCard bg="#FFFFFF" border={c.primary} twExtra="mb-3">
        <div tw="flex items-center justify-between">
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.primary }}>
            Tygodniowy tor smoka - koloruj codziennie
          </span>
          <span tw="text-[8px] font-black bg-[#FECACA] px-2 py-1 rounded-full text-[#7F1D1D]">5 dni x 5 min = SUKCES</span>
        </div>
        <div tw="grid grid-cols-7 gap-2 mt-3">
          {["PON", "WTO", "SRO", "CZW", "PIA", "SOB", "NIE"].map((d) => (
            <div key={d} tw="rounded-[12px] bg-[#FFF1F2] p-2 flex flex-col items-center gap-1.5" style={{ border: "1.5px solid #FECACA" }}>
              <span tw="text-[8px] font-black text-[#7F1D1D]">{d}</span>
              <div tw="h-[28px] w-[28px] rounded-full bg-white flex items-center justify-center" style={{ border: "2px dashed #FECACA" }}>
                <span tw="text-[10px] font-black text-[#FECACA]">+</span>
              </div>
              <div tw="flex gap-1">
                <span tw="h-1.5 w-1.5 rounded-full bg-white" style={{ border: "1px solid #FECACA" }} />
                <span tw="h-1.5 w-1.5 rounded-full bg-white" style={{ border: "1px solid #FECACA" }} />
                <span tw="h-1.5 w-1.5 rounded-full bg-white" style={{ border: "1px solid #FECACA" }} />
              </div>
            </div>
          ))}
        </div>
        <div tw="mt-3 flex gap-2">
          <span tw="flex-1 rounded-full bg-[#DC2626] px-3 py-2 text-center text-[9px] font-black text-white">Nagroda: naklejka smoka</span>
          <span tw="flex-1 rounded-full bg-white px-3 py-2 text-center text-[9px] font-bold text-[#6B7280]" style={{ border: "1.5px dashed #FECACA" }}>
            Podpis rodzica: ___________
          </span>
        </div>
      </DottedCard>

      <div tw="flex gap-3">
        <div tw="flex-1">
          <SelfRating accent={c.primary} />
        </div>
        <div tw="flex-1 rounded-[14px] bg-white p-3" style={{ border: "2px solid #FECACA" }}>
          <CuttingLine />
          <StickerStrip count={4} accent={c.primary} label="ODZNAKI SMOKA - wytnij" />
        </div>
      </div>

      <FooterBar text="Oddech Smoka • oddech + fonacja • piórko słomka balon • A4 • codziennie 5 min" color="#991B1B" />
    </div>
  );
}
