import { kidPalette } from "../theme";
import { wordToDataUri } from "../icons";
import { FooterBar, PageHeader, PersonalizationBar, XPTracker } from "./shared";

const c = kidPalette.sycy;
type Props = { name?: string; date?: string; eko?: boolean };

const FRAMES: Array<{ n: number; w: string; caption: string }> = [
  { n: 1, w: "SOWA", caption: "Sowa Sonia budzi sie." },
  { n: 2, w: "SOK", caption: "Pije sok z cytryny." },
  { n: 3, w: "ZAMEK", caption: "Leci nad zamkiem." },
  { n: 4, w: "DZWON", caption: "Dzwon dzwoni - sss!" },
];

export function HistoryjkaTemplate({ name, date, eko }: Props = {}) {
  return (
    <div tw="flex flex-col p-5 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFFBEB" }}>
      <PageHeader title="HISTORYJKA OBRAZKOWA" subtitle="Uloz 4 kadry - opowiedz - s z c dz w kazdym zdaniu" icon="H" color={c.primary} badge="GRA 5" heroLetter="H" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="rounded-[16px] bg-white p-3 mb-3 flex gap-3 items-center" style={{ border: `2px solid ${c.border}` }}>
        <span tw="h-8 w-8 rounded-full flex items-center justify-center text-white text-[12px] font-black shrink-0" style={{ backgroundColor: c.primary }}>1</span>
        <span tw="text-[9px] font-semibold text-[#4B5563] flex-1 leading-[1.4]">Przyjrzyj sie 4 obrazkom. Uloz je w kolejnosci 1-2-3-4. Opowiedz historie glosno, uzywaj slow z gloska s/z/c/dz. Na koniec narysuj zakonczenie.</span>
        <XPTracker stars={3} mission="HISTORIA" level="5" />
      </div>

      <div tw="rounded-[20px] bg-white p-4 mb-3" style={{ border: `2.5px solid ${c.border}` }}>
        <div tw="flex items-center justify-between mb-3">
          <span tw="text-[9px] font-black tracking-widest text-[#1A1A2E]">4 KADRY - ponumeruj 1-4 - opowiedz</span>
          <span tw="text-[7px] font-black px-2 py-1 rounded-full bg-[#FFFBEB] text-[#713F12]" style={{ border: `1.5px solid #FDE68A` }}>mow pelnymi zdaniami</span>
        </div>
        <div tw="grid grid-cols-4 gap-3">
          {FRAMES.map((f) => {
            const src = wordToDataUri(f.w);
            return (
              <div key={f.n} tw="rounded-[16px] bg-white p-3 flex flex-col gap-2" style={{ border: `2px solid #E5E7EB`, minHeight: "168px" }}>
                <div tw="flex items-center justify-between">
                  <span tw="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: c.primary }}>{f.n}</span>
                  <span tw="h-6 w-6 rounded-full bg-white" style={{ border: `1.5px dashed #E5E7EB` }} />
                </div>
                {src ? <img src={src} tw="h-[96px] w-[96px] rounded-[14px] self-center" style={{ border: `2px solid #E5E7EB` }} /> : <span tw="h-[96px] w-[96px] rounded-[14px] bg-white flex items-center justify-center text-[16px] font-black self-center" style={{ border: `2px solid #E5E7EB`, color: c.primary }}>{f.w[0]}</span>}
                <span tw="text-[9px] font-bold text-[#1A1A2E] text-center leading-tight">{f.caption}</span>
                <div tw="rounded-[10px] bg-[#FFFBEB] p-2 mt-1" style={{ border: `1.5px dashed #FDE68A` }}>
                  <span tw="text-[7px] font-bold text-[#713F12]">Powiedz: ___</span>
                  <div tw="h-[14px] bg-white rounded-[6px] mt-1" style={{ border: `1px solid #FDE68A` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div tw="mt-3 flex items-center justify-center gap-2">
          <span tw="h-2 w-2 rounded-full" style={{ backgroundColor: c.primary }} />
          <span tw="flex-1 h-[1px]" style={{ borderTop: `1.5px dashed ${c.border}` }} />
          <span tw="text-[7px] font-black tracking-widest text-[#6B7280]">KOLEJNOSC 1 - 2 - 3 - 4</span>
          <span tw="flex-1 h-[1px]" style={{ borderTop: `1.5px dashed ${c.border}` }} />
          <span tw="h-2 w-2 rounded-full bg-white" style={{ border: `1.5px solid ${c.primary}` }} />
        </div>
      </div>

      <div tw="flex gap-3 mb-3">
        <div tw="flex-1 rounded-[16px] bg-[#FFFBEB] p-3 flex flex-col gap-2" style={{ border: `2px dashed #FDE68A` }}>
          <span tw="text-[8px] font-black tracking-widest text-[#713F12]">TWOJE ZAKONCZENIE</span>
          <div tw="flex-1 rounded-[12px] bg-white p-2" style={{ border: `1.5px solid #E5E7EB`, minHeight: "64px" }}>
            <span tw="text-[7px] font-bold text-[#9CA3AF]">Narysuj co bylo dalej - 1 obrazek</span>
            <div tw="mt-2 h-[40px] rounded-[8px] bg-[#F9FAFB]" style={{ border: `1.5px dashed #E5E7EB` }} />
          </div>
        </div>
        <div tw="flex-1 rounded-[16px] bg-white p-3 flex flex-col gap-2" style={{ border: `2px solid #E5E7EB` }}>
          <span tw="text-[8px] font-black tracking-widest text-[#6B7280]">NAGRAJ / OCEN</span>
          <div tw="flex gap-2">
            {["SUPER", "OK", "JESZCZE"].map((l) => (
              <span key={l} tw="flex-1 rounded-[10px] bg-white py-2 text-center text-[7px] font-black" style={{ border: `1.5px solid ${c.border}` }}>{l}</span>
            ))}
          </div>
          <span tw="text-[7px] font-bold text-[#9CA3AF] text-center">Opowiedziales 4 zdania? +10 XP</span>
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

      <FooterBar text="Historyjka obrazkowa - narracja + s z c dz - A4" color={c.dark} />
    </div>
  );
}
