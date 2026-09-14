import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { CuttingLine, DottedCard, FooterBar, PageHeader, PersonalizationBar, StickerStrip } from "./shared";

const c = kidPalette.planszowka;

export function PlanszowkaTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  const fields = [
    "START",
    "SOWA",
    "SOK",
    "SZKOLA",
    "SZALIK",
    "ZABA",
    "ZELKI",
    "CZAPKA",
    "DZEM",
    "SLIMAK",
    "SNIEG",
    "CMA",
    "DZWIG",
    "RAKIETA",
    "ROWER",
    "RYBA",
    "ROZA",
    "KROWA",
    "DRZEWO",
    "TRAMWAJ",
    "TORT",
    "MUR",
    "SOWA",
    "ZEBRA",
    "ZUPA",
    "CEBULA",
    "DZIK",
    "DZWON",
    "SZAFA",
    "ZYRAFA",
    "CZEKO",
    "DZUNGLA",
    "LISC",
    "KOSC",
    "RYSIO",
    "META",
  ];

  // 3+1 palette §3.2 — primary/secondary/accent + dark, nie tęcza 6
  const colors = [c.primary, c.secondary, c.accent] as const;
  const fieldBg = (i: number, isStart: boolean, isMeta: boolean) => {
    if (isStart) return "#22C55E";
    if (isMeta) return c.primary;
    // co 3 pola rotacja 3 kolorów, jasne tło 12% opacity via light
    const idx = i % 3;
    return idx === 0 ? "#FFF0F5" : idx === 1 ? "#EFF6FF" : "#FFFBEB";
  };
  const fieldBorder = (i: number, isStart: boolean, isMeta: boolean) => {
    if (isStart) return "#16A34A";
    if (isMeta) return c.primary;
    return colors[i % 3];
  };

  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFF8F0" }}>
      <PageHeader title="PLANSZÓWKA GŁOSEK" subtitle="Gra do druku • s z c dz • sz ż cz dż • ś ź ć dź • r • 36 pól" icon="G" color={c.primary} badge="2-4 GRACZY" heroLetter="G" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="flex gap-3 mb-2">
        <div tw="flex-1 rounded-[14px] bg-white px-4 py-3 flex gap-3" style={{ border: `2.5px dashed ${c.border}` }}>
          <span tw="text-[9px] font-black uppercase tracking-widest" style={{ color: c.primary }}>Zasady</span>
          <span tw="text-[9px] font-bold text-[#1A1A2E] leading-[1.4]">
            Rzut kostka - idz tyle pol - powiedz slowo z pola glosno + zdanie. Pole kolorowe = zadanie specjalne. Pierwszy na mecie wygrywa!
          </span>
        </div>
        <div tw="rounded-[14px] bg-white px-4 py-3 flex flex-col items-center" style={{ border: `2px solid ${c.border}` }}>
          <span tw="text-[9px] font-black uppercase tracking-widest text-[#6B7280]">Potrzebujesz</span>
          <span tw="text-[9px] font-bold text-[#6B7280]">kostka  pionki  glos</span>
          <div tw="flex gap-1 mt-1">
            <span tw="h-3 w-3 rounded-full" style={{ backgroundColor: c.primary }} />
            <span tw="h-3 w-3 rounded-full" style={{ backgroundColor: c.secondary }} />
            <span tw="h-3 w-3 rounded-full" style={{ backgroundColor: c.accent }} />
            <span tw="h-3 w-3 rounded-full bg-white" style={{ border: `1.5px solid ${c.border}` }} />
          </div>
        </div>
      </div>

      <div tw="rounded-[18px] bg-white p-2.5 mb-3" style={{ border: "3px solid #1A1A2E" }}>
        <div tw="grid grid-cols-6 gap-1.5">
          {fields.map((f, i) => {
            const isStart = i === 0;
            const isMeta = i === 35;
            const bg = fieldBg(i, isStart, isMeta);
            const border = fieldBorder(i, isStart, isMeta);
            const icon = !isStart && !isMeta ? wordToDataUri(f) : null;
            return (
              <div
                key={i}
                tw="rounded-[10px] p-1 flex flex-col items-center justify-center gap-0.5 bg-white"
                style={{
                  backgroundColor: bg,
                  border: `2px solid ${border}`,
                  minHeight: "52px",
                }}
              >
                <span tw="text-[6px] font-black text-[#6B7280]">{i + 1}</span>
                {icon ? <img src={icon} tw="h-6 w-6 rounded-[4px]" style={{ border: `1px solid ${border}` }} /> : <span tw="text-[10px] font-black text-[#1A1A2E]">{isStart ? "START" : isMeta ? "META" : ""}</span>}
                <span tw="text-[6px] font-black text-center leading-none text-[#1A1A2E]">{f}</span>
                {!isStart && !isMeta && <span tw="text-[5px] font-bold text-[#6B7280]">x2</span>}
              </div>
            );
          })}
        </div>
        <div tw="flex gap-2 mt-2.5">
          {[
            { k: "Syczace", v: "s z c dz" },
            { k: "Szumiace", v: "sz ż cz dż" },
            { k: "Ciszace", v: "s z c dz" },
            { k: "R", v: "r" },
          ].map((l) => (
            <span key={l.k} tw="flex-1 rounded-full bg-[#F9FAFB] px-2 py-1 text-center text-[7px] font-black text-[#1A1A2E]" style={{ border: "1.5px solid #E5E7EB" }}>
              {l.k}: {l.v}
            </span>
          ))}
        </div>
      </div>

      <div tw="flex gap-3 mb-2">
        <DottedCard bg="#FFFFFF" border={c.border} twExtra="flex-1">
          <span tw="text-[9px] font-black uppercase tracking-widest" style={{ color: c.primary }}>Pola specjalne</span>
          <div tw="flex flex-col gap-1.5 mt-2">
            {[
              "Zolte - szepnij slowko",
              "Niebieskie - powiedz zdanie",
              "Fiolet - powtorz 3× szybko",
              "Cofnij o 2 pola jesli pomylisz",
            ].map((t) => (
              <div key={t} tw="rounded-full bg-white px-3 py-1.5" style={{ border: `1.5px solid ${c.border}` }}>
                <span tw="text-[8px] font-bold text-[#1A1A2E]">{t}</span>
              </div>
            ))}
          </div>
        </DottedCard>

        <DottedCard bg="#FFFFFF" border={c.border} twExtra="flex-1">
          <span tw="text-[9px] font-black uppercase tracking-widest" style={{ color: c.secondary }}>Dyplom / zetony - wytnij</span>
          <CuttingLine />
          <StickerStrip count={4} accent={c.secondary} label="" />
          <span tw="text-[7px] font-bold text-[#6B7280] mt-2 text-center">Wytnij zetony - nagroda za kazde okrazenie. 4 = dyplom!</span>
        </DottedCard>
      </div>

      <FooterBar text="Planszówka Głosek • druk A3 lub A4 • zalaminuj • pionki z guzików • wszystkie szeregi" color={eko ? "#FFFFFF" : "#1A1A2E"} />
    </div>
  );
}
