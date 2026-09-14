import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { FooterBar, PageHeader, PersonalizationBar, XPTracker } from "./shared";

const c = kidPalette.cisz;
type Props = { name?: string; date?: string; eko?: boolean };

const ITEMS: Array<{ w: string; pos: "P" | "S" | "K"; code: string }> = [
  { w: "SOWA", pos: "P", code: "zielony" },
  { w: "SOK", pos: "P", code: "zielony" },
  { w: "ZUPA", pos: "P", code: "zielony" },
  { w: "CYTRYNA", pos: "P", code: "zielony" },
  { w: "KOC", pos: "K", code: "czerwony" },
  { w: "NOS", pos: "K", code: "czerwony" },
  { w: "LAS", pos: "K", code: "czerwony" },
  { w: "OSIKA", pos: "S", code: "zolty" },
];

export function KodowanieTemplate({ name, date, eko }: Props = {}) {
  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#F5F3FF" }}>
      <PageHeader title="KODOWANIE KOLOREM" subtitle="Pokoloruj wg pozycji gloski - P/S/K" icon="K" color={c.primary} badge="GRA 4" heroLetter="K" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="flex gap-3 mb-3">
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex items-center gap-3" style={{ border: `2px solid ${c.border}` }}>
          <span tw="h-8 w-8 rounded-full flex items-center justify-center text-white text-[12px] font-black shrink-0" style={{ backgroundColor: c.primary }}>!</span>
          <span tw="text-[9px] font-semibold text-[#4B5563] leading-[1.4]">Legenda ponizej mowi jakim kolorem pokolorowac. P = poczatek (zielony), S = srodek (zolty), K = koniec (czerwony). Mow pozycje glosno.</span>
        </div>
        <XPTracker stars={3} mission="8 KOLOROW" level="4" />
      </div>

      <div tw="rounded-[16px] bg-white p-3 mb-3 flex items-center gap-2" style={{ border: `2px solid ${c.border}` }}>
        <span tw="text-[8px] font-black tracking-widest text-[#6B7280]">LEGENDA KODU</span>
        <div tw="flex gap-2 flex-1 justify-center">
          <span tw="flex-1 rounded-full px-3 py-2 text-center text-[8px] font-black text-white" style={{ backgroundColor: "#22C55E" }}>P - zielony</span>
          <span tw="flex-1 rounded-full px-3 py-2 text-center text-[8px] font-black text-[#713F12]" style={{ backgroundColor: "#FACC15" }}>S - zolty</span>
          <span tw="flex-1 rounded-full px-3 py-2 text-center text-[8px] font-black text-white" style={{ backgroundColor: "#EF4444" }}>K - czerwony</span>
        </div>
        <span tw="text-[7px] font-bold text-[#9CA3AF]">kredki/mazak</span>
      </div>

      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex items-center justify-between mb-2">
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">8 SLOW - pokoloruj kontur wg kodu</span>
          <span tw="text-[7px] font-black text-[#6B7280]">pokoloruj caly obrazek, nie tylko ramke</span>
        </div>
        <div tw="grid grid-cols-4 gap-3">
          {ITEMS.map((it) => {
            const src = wordToDataUri(it.w);
            const col = it.pos === "P" ? "#22C55E" : it.pos === "S" ? "#FACC15" : "#EF4444";
            return (
              <div key={it.w} tw="rounded-[16px] bg-white p-3 flex flex-col items-center gap-1.5" style={{ border: `2.5px dashed ${col}`, minHeight: "132px" }}>
                {src ? <img src={src} tw="h-[56px] w-[56px] rounded-[12px] bg-white" style={{ border: `2px solid ${col}` }} /> : <span tw="h-[56px] w-[56px] rounded-[12px] bg-white flex items-center justify-center text-[16px] font-black" style={{ border: `2px solid ${col}`, color: col }}>{it.w[0]}</span>}
                <span tw="text-[10px] font-black text-[#1A1A2E]">{it.w}</span>
                <span tw="text-[7px] font-black px-2 py-1 rounded-full text-white" style={{ backgroundColor: col }}>{it.pos} - {it.code}</span>
                <span tw="h-2 w-6 rounded-full bg-white mt-1" style={{ border: `1.5px solid ${col}` }} />
              </div>
            );
          })}
        </div>
      </div>

      <div tw="rounded-[16px] p-3 flex gap-3" style={{ backgroundColor: c.light, border: `2px solid ${c.border}` }}>
        <div tw="flex-1 rounded-[12px] bg-white p-3 flex flex-col gap-1" style={{ border: `1.5px solid #E5E7EB` }}>
          <span tw="text-[8px] font-black tracking-widest text-[#4C1D95]">SPRAWDZ</span>
          <span tw="text-[8px] font-semibold text-[#4B5563]">Policz: ile zielonych? ___  ile zoltych? ___  ile czerwonych? ___</span>
          <div tw="flex gap-1 mt-1">
            <span tw="flex-1 h-2 rounded-full" style={{ backgroundColor: "#22C55E" }} />
            <span tw="flex-1 h-2 rounded-full" style={{ backgroundColor: "#FACC15" }} />
            <span tw="flex-1 h-2 rounded-full" style={{ backgroundColor: "#EF4444" }} />
          </div>
        </div>
        <div tw="w-[140px] rounded-[12px] bg-[#1A1A2E] p-3 flex flex-col items-center justify-center gap-1 shrink-0">
          <span tw="text-[8px] font-black tracking-widest text-white/60">NAGRODA</span>
          <span tw="text-[10px] font-black text-white">8 kolorow = XP</span>
        </div>
      </div>

      <FooterBar text="Kodowanie kolorem - P/S/K - uwaga + kolor - A4" color={c.dark} />
    </div>
  );
}
