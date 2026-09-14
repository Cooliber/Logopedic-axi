import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { cymaticMandalaSmall, cymaticMandalaFull } from "../cymaticPatterns";
import {
  CuttingLine,
  DottedCard,
  FooterBar,
  HierarchyBar,
  InstructionCard,
  PageHeader,
  ParentTip,
  PersonalizationBar,
  SelfRating,
  StickerStrip,
  XPTracker,
} from "./shared";

const c = kidPalette.sycy;

// Research-aligned v3: 8 słów, 20% bieli, signaling, Gestalt, spacing, mandala osobno
export function SyczacyTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  const words: Array<{ w: string; pos: "P" | "S" | "K" }> = [
    { w: "SOWA", pos: "P" },
    { w: "SOK", pos: "P" },
    { w: "SER", pos: "P" },
    { w: "ZUPA", pos: "P" },
    { w: "ZAMEK", pos: "P" },
    { w: "CYTRYNA", pos: "P" },
    { w: "KOC", pos: "K" },
    { w: "DZWON", pos: "P" },
  ];

  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFFBEB" }}>
      <PageHeader title="SYK SYCYLII" subtitle="Szereg syczacy - s z c dz - syczy jak waz" icon="S" color={c.primary} badge="1" heroLetter="S" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      {/* TEACCH Work System Header — co/ile/co potem (MonsterMath) */}
      <div tw="flex gap-2 mb-3">
        <div tw="flex-1 rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">CO ROBIE</span>
          <span tw="text-[8px] font-bold text-[#1A1A2E]">Sycze: s z c dz</span>
        </div>
        <div tw="flex-1 rounded-full bg-white px-3 py-1.5 flex items-center gap-1.5" style={{ border: "1.5px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">ILE</span>
          <span tw="text-[8px] font-bold text-[#1A1A2E]">8 slow - 8-10 min</span>
        </div>
        <div tw="flex-1 rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ backgroundColor: c.primary }}>
          <span tw="text-[7px] font-black tracking-widest text-white/80">PO TYM</span>
          <span tw="text-[8px] font-black text-white">Naklejka</span>
        </div>
      </div>

      <HierarchyBar accent={c.primary} active={3} />

      {/* HERO — contiguity: obraz tuż obok tekstu, ≤20 słów instrukcji */}
      <div tw="rounded-[20px] bg-white p-4 mb-3 flex gap-4 items-center" style={{ border: "2px solid #E5E7EB" }}>
        <img src={wordToDataUri("SOWA")!} tw="h-[112px] w-[112px] rounded-[16px] shrink-0" style={{ border: "2px solid #E5E7EB" }} />
        <div tw="flex flex-col gap-1.5 flex-1">
          <span tw="text-[11px] font-black text-[#1A1A2E]">Poznaj Sowe Sonie</span>
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6]" style={{ letterSpacing: "0.2px" }}>
            Sonia syczy cicho: <span style={{ color: c.dark, fontWeight: 900 }}>sss...</span> Je <span style={{ color: c.dark }}>ser</span> i <span style={{ color: c.dark }}>sok</span>, leci nad <span style={{ color: c.dark }}>zamkiem</span>.
            Wskaz palcem kazde s, z, c, dz. Mow na wydechu.
          </span>
        </div>
        <XPTracker stars={5} mission="8 SLOW" level="1" />
      </div>

      {/* INSTRUKCJA — signaling: kółeczko + 3 kroki call-out */}
      <div tw="flex gap-3 mb-3">
        <InstructionCard
          title="Jak sie bawimy?"
          text="Sluchaj, mow sss w izolacji, potem sa-so, slowa P/S/K, zdania."
          accent={c.secondary}
          steps={["Sluchaj", "Mow", "Koloruj"]}
          time="8-10 min"
        />
        <div tw="rounded-[14px] bg-white p-3 flex flex-col items-center justify-center gap-1.5 shrink-0 w-[120px]" style={{ border: "2px solid #E5E7EB" }}>
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">WODZENIE</span>
          <div tw="flex items-center gap-2">
            <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-black text-white" style={{ backgroundColor: c.primary }}>A</span>
            <div tw="w-[56px] h-[10px] rounded-full" style={{ border: `2px dashed ${c.primary}`, backgroundColor: "#FEF9C3" }} />
            <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-black text-white" style={{ backgroundColor: c.primary }}>B</span>
          </div>
          <span tw="text-[7px] font-bold text-[#6B7280] text-center">Sss... wodzenie</span>
        </div>
      </div>

      {/* SLOWA — 4x2 clean grid, Gestalt similarity + proximity, signaling P badge */}
      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: "2px solid #E5E7EB" }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">8 SLOW - pokoloruj kontur</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full text-[#713F12]" style={{ backgroundColor: "#FEF9C3", border: "1.5px solid #FDE68A" }}>P = poczatek - najlatwiej</span>
        </div>
        <div tw="grid grid-cols-4 gap-3">
          {words.map((it) => (
            <div key={it.w} tw="rounded-[16px] bg-white py-3 px-2 flex flex-col items-center gap-1.5" style={{ border: "2px solid #E5E7EB", minHeight: "172px" }}>
              <img src={wordToDataUri(it.w)!} tw="h-[112px] w-[112px] rounded-[14px]" style={{ border: `2px solid #E5E7EB` }} />
              <span tw="text-[11px] font-black text-[#1A1A2E] text-center tracking-tight" style={{ letterSpacing: "0.3px" }}>{it.w}</span>
              <span tw="h-4 w-4 rounded-full flex items-center justify-center text-[7px] font-black" style={{ backgroundColor: it.pos === "P" ? "#22C55E" : it.pos === "S" ? "#F59E0B" : "#EF4444", color: "white" }}>{it.pos}</span>
              <div tw="flex gap-1 mt-0.5">
                <span tw="h-2 w-2 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
                <span tw="h-2 w-2 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
                <span tw="h-2 w-2 rounded-full bg-white" style={{ border: "1.5px solid #E5E7EB" }} />
              </div>
              <div tw="w-[48px] h-[1px] mt-1" style={{ borderTop: "1.5px dashed #E5E7EB" }} />
            </div>
          ))}
        </div>
        <div tw="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#F9FAFB] px-3 py-1.5" style={{ border: "1.5px dashed #E5E7EB" }}>
          <span tw="text-[7px] font-bold text-[#6B7280]">Dashed = miejsce na pieczatkę / kropkę za poprawne powtórzenie</span>
          <span tw="h-2 w-2 rounded-full" style={{ backgroundColor: c.primary }} />
          <span tw="h-2 w-2 rounded-full bg-white" style={{ border: `1.5px solid ${c.primary}` }} />
        </div>
      </div>

      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">- - - KONIEC STRONY 1 - przewroc kartke - - -</span>
      </div>

      {/* MANDALA — cymatic pattern, osobny blok executive */}
      <div tw="rounded-[20px] bg-white p-4 mb-3 flex flex-col items-center gap-2" style={{ border: "2px solid #E5E7EB" }}>
        <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">MANDALA - pokoloruj po slowach</span>
        <span tw="text-[7px] font-bold text-[#6B7280] text-center">Skup uwage 2 min - koloruj od srodka na zewnatrz. To trenuje uwage (Cureus 2023).</span>
        <div tw="flex items-center justify-center mt-1">
          <img src={cymaticMandalaSmall({ letter: "S", accent: c.primary, series: "syczacy" })} tw="h-[112px] w-[112px]" />
        </div>
        <span tw="text-[7px] font-bold text-[#6B7280]">Wybierz 2 kolory - pokoloruj wzor</span>
      </div>

      {/* PARY MINIMALNE + RUCH — 2 kolumny, chunking po 2 */}
      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border="#FDE68A" twExtra="flex-1">
          <span tw="text-[9px] font-black tracking-widest text-[#713F12]">Sluchaj - ktore slowo?</span>
          <span tw="text-[8px] font-semibold text-[#6B7280]"> Dorosly mowi, dziecko wskazuje.</span>
          <div tw="flex flex-col gap-1.5 mt-2">
            {[
              { q: "SOK czy SZOK?", a: "SOK" },
              { q: "CENA czy CZENA?", a: "CENA" },
              { q: "SUM czy SZUM?", a: "SUM" },
            ].map((it) => {
              const aIsCena = it.a === "CENA";
              const aSrc = aIsCena ? null : wordToDataUri(it.a === "SUM" ? "SOWA" : it.a);
              return (
                <div key={it.q} tw="rounded-full bg-[#FFFBEB] px-3 py-2 flex items-center gap-2" style={{ border: "1.5px solid #FDE68A" }}>
                  <span tw="text-[9px] font-bold text-[#1A1A2E] flex-1">{it.q}</span>
                  <span tw="text-[7px] font-black px-2 py-1 rounded-full bg-white shrink-0" style={{ border: "1.5px solid #FDE68A" }}>- {it.a}</span>
                  {aSrc ? <img src={aSrc} tw="h-6 w-6 rounded-[5px] shrink-0" style={{ border: "1px solid #FDE68A" }} /> : <span tw="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[7px] font-black text-[#713F12] shrink-0" style={{ border: "1px solid #FDE68A" }}>{it.a.charAt(0)}</span>}
                </div>
              );
            })}
          </div>
        </DottedCard>

        <div tw="flex-1 rounded-[16px] bg-white p-3 flex flex-col gap-2" style={{ border: "2px solid #E5E7EB" }}>
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">Ruch + glos</span>
          <span tw="text-[8px] font-semibold text-[#6B7280]">Skok + SOWA - rzut + ZUPA - klask 3x + CYTRYNA</span>
          <div tw="flex gap-2 justify-center mt-1">
            <img src={wordToDataUri("SOWA")!} tw="h-[32px] w-[32px] rounded-[8px]" style={{ border: "1.5px solid #E5E7EB" }} />
            <img src={wordToDataUri("ZUPA")!} tw="h-[32px] w-[32px] rounded-[8px]" style={{ border: "1.5px solid #E5E7EB" }} />
            <img src={wordToDataUri("CYTRYNA")!} tw="h-[32px] w-[32px] rounded-[8px]" style={{ border: "1.5px solid #E5E7EB" }} />
          </div>
          <span tw="text-[7px] font-bold text-[#6B7280] text-center">Powtorz 5x - ruch kotwiczy pamiec</span>
          <div tw="rounded-full bg-[#FFFBEB] px-3 py-1.5 flex items-center justify-center mt-1" style={{ border: "1.5px dashed #FDE68A" }}>
            <span tw="text-[7px] font-black text-[#713F12]">Propriocepcja Van Ripera</span>
          </div>
        </div>
      </div>

      {/* HISTORYJKA — contiguity obraz przy tekscie */}
      <div tw="rounded-[16px] bg-white p-4 mb-3" style={{ border: "2px solid #E5E7EB" }}>
        <div tw="flex items-center justify-between">
          <span tw="text-[9px] font-black tracking-widest text-[#065F46]">Historyjka Soni - przeczytaj i opowiedz</span>
          <span tw="text-[7px] font-black bg-[#ECFDF5] px-2 py-1 rounded-full text-[#065F46]" style={{ border: "1.5px solid #6EE7B7" }}>wolno - stukaj rytm</span>
        </div>
        <div tw="flex gap-3 mt-3 items-center">
          <img src={wordToDataUri("CYTRYNA")!} tw="h-[80px] w-[80px] rounded-[12px] shrink-0 bg-white" />
          <span tw="text-[10px] font-semibold text-[#1A1A2E] leading-[1.6] flex-1" style={{ letterSpacing: "0.2px" }}>
            Sok z <b>cytryny</b> na <b>stole</b>. Zuzia zaszywa <b>zamek</b>. <b>Dzwon</b> dudni, <b>dzik</b> tupie. Sowa syczy: sss...
          </span>
          <img src={wordToDataUri("SOWA")!} tw="h-[80px] w-[80px] rounded-[12px] shrink-0 bg-white" />
        </div>
        <div tw="rounded-full bg-[#FFFBEB] px-3 py-1.5 flex items-center justify-between mt-3" style={{ border: "1.5px dashed #FDE68A" }}>
          <span tw="text-[7px] font-bold text-[#713F12]">Wyzwanie 1 min - ile razy bez pomylki?</span>
          <span tw="text-[7px] font-black text-white px-2 py-1 rounded-full" style={{ backgroundColor: c.primary }}>START</span>
        </div>
      </div>
      
      <div tw="flex items-center justify-center gap-2 my-2" style={{ breakAfter: "page" }}>
        <span tw="text-[7px] font-black tracking-widest text-[#9CA3AF]">- - - KONIEC STRONY 2 - przewroc kartke - - -</span>
      </div>

      <div tw="rounded-[20px] bg-white p-5 mb-3 flex flex-col items-center gap-3" style={{ border: "2.5px dashed #FDE68A" }}>
        <span tw="text-[11px] font-black tracking-widest text-[#1A1A2E]">MANDALA - skupienie po pracy</span>
        <span tw="text-[9px] font-semibold text-[#4B5563] text-center leading-[1.5]">Wybierz 2 kolory. Koloruj od srodka na zewnatrz. Oddychaj spokojnie: wdech nosem, wydech ustami s-s-s.</span>
        <div tw="flex items-center justify-center">
          <img src={cymaticMandalaFull({ letter: "S", accent: "#FACC15", series: "syczacy" })} tw="h-[180px] w-[180px]" />
        </div>
        <span tw="text-[7px] font-bold text-[#9CA3AF]">Po mandali: zamknij oczy, powiedz 3 slowa ktore pamietasz najlepiej.</span>
      </div>

      <div tw="flex gap-3">
        <div tw="flex-1">
          <SelfRating accent={c.primary} />
        </div>
        <div tw="flex-1 rounded-[14px] bg-white p-3 flex flex-col gap-1" style={{ border: "1.5px solid #E5E7EB" }}>
          <CuttingLine />
          <StickerStrip count={4} accent={c.primary} label="NAKLEJKI - wytnij" />
        </div>
      </div>

      <FooterBar text="Logopedia - szereg syczacy - Van Riper: ucho - sylaba - slowo P/S/K - zdanie - A4" color={c.dark} />
    </div>
  );
}
