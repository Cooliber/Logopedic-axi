import { kidPalette } from "../theme";
import { CuttingLine, DottedCard, FooterBar, PageHeader, PersonalizationBar, SelfRating, StickerStrip, XPTracker } from "./shared";

const c = kidPalette.dialog;

export function DialogTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FDF4FF" }}>
      <PageHeader title="MOC ROZMOWY" subtitle="Dlaczego warto rozmawiać • Jak zacząć dialog" icon="D" color={c.primary} badge="SUPER MOC" heroLetter="D" />
      <PersonalizationBar name={name} date={date} color={c.primary} />

      <div tw="rounded-[16px] bg-white p-4 mb-3" style={{ border: "2.5px solid #E9D5FF" }}>
        <div tw="flex items-center justify-between">
          <span tw="text-[11px] font-black text-[#3A0CA3]">Dlaczego warto rozmawiac?</span>
          <span tw="text-[8px] font-black bg-[#F3E8FF] px-2 py-1 rounded-full text-[#7B2CBF]">6 supermocy</span>
        </div>
        <div tw="grid grid-cols-3 gap-3 mt-3">
          {[
            { letter: "P", title: "Masz przyjaciol", desc: "Razem razniej,\npomagacie sobie" },
            { letter: "U", title: "Uczysz sie", desc: "Nowe slowa,\npomysly, swiat" },
            { letter: "C", title: "Czujesz lepiej", desc: "Gdy opowiesz,\nlzej na sercu" },
            { letter: "Z", title: "Wiecej zabawy", desc: "Gry, pomysly,\nplanowanie" },
            { letter: "R", title: "Rozwiazujesz", desc: "Gadasz zamiast\nklocic sie" },
            { letter: "W", title: "Jestes wazny", desc: "Twoj glos ma\nznaczenie" },
          ].map((b) => (
            <div key={b.title} tw="rounded-[14px] p-3 flex flex-col items-center gap-1" style={{ backgroundColor: "#F3E8FF", border: "1.5px solid #E9D5FF" }}>
              <span tw="h-7 w-7 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-[#7B2CBF]" style={{ border: "1.5px solid #E9D5FF" }}>
                {b.letter}
              </span>
              <span tw="text-[9px] font-black text-[#3A0CA3] text-center leading-tight">{b.title}</span>
              <span tw="text-[7px] font-bold text-[#6B7280] text-center leading-tight">{b.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border="#E9D5FF" twExtra="flex-1">
          <span tw="text-[10px] font-black uppercase tracking-widest text-[#7B2CBF]">Jak zaczac? - 4 startery</span>
          <span tw="text-[8px] font-bold text-[#6B7280]">Wybierz 1 i powiedz dzis do 1 osoby</span>
          <div tw="flex flex-col gap-2 mt-3">
            {[
              { q: "Czesc! Co lubisz robic?", when: "Na przerwie" },
              { q: "Moge sie pobawic z Toba?", when: "Na placu zabaw" },
              { q: "Pomoge Ci! Chcesz?", when: "Gdy ktos smutny" },
              { q: "Fajna zabawka! Gdzie ja masz?", when: "Ciekawi Cie" },
            ].map((s) => (
              <div key={s.q} tw="rounded-[12px] bg-[#FDF4FF] px-3 py-2.5 flex justify-between items-center" style={{ border: "1.5px solid #E9D5FF" }}>
                <span tw="text-[9px] font-black text-[#3A0CA3]">"{s.q}"</span>
                <span tw="text-[7px] font-black text-white bg-[#7B2CBF] px-2 py-1 rounded-full">{s.when}</span>
              </div>
            ))}
          </div>
          <div tw="mt-2 rounded-full bg-[#FFD166] px-3 py-1.5 flex items-center justify-center">
            <span tw="text-[8px] font-black text-[#7C2D12]">Wybierz 1 i powiedz dzis do 1 osoby - zaznacz ktory wybrales</span>
          </div>
        </DottedCard>

        <DottedCard bg="#FFFBEB" border="#FDE68A" twExtra="flex-[0.9]">
          <span tw="text-[10px] font-black uppercase tracking-widest text-[#92400E]">Mini-komiks - dokoncz</span>
          <div tw="flex flex-col gap-2 mt-3">
            <div tw="rounded-[12px] bg-white p-3" style={{ border: "1.5px solid #FDE68A" }}>
              <div tw="flex gap-2 items-start">
                <span tw="h-6 w-6 rounded-full bg-[#FDE68A] flex items-center justify-center text-[9px] font-black text-[#713F12]">A</span>
                <div tw="rounded-[12px] bg-[#FDE68A] px-3 py-2" style={{ borderRadius: "12px 12px 12px 2px" }}>
                  <span tw="text-[9px] font-bold text-[#713F12]">Czesc! Zagrasz ze mna w karty?</span>
                </div>
              </div>
              <div tw="flex gap-2 items-start mt-2 justify-end">
                <div tw="rounded-[12px] bg-white px-3 py-2" style={{ border: "1.5px dashed #FDE68A", borderRadius: "12px 12px 2px 12px" }}>
                  <span tw="text-[9px] font-bold text-[#6B7280]">Twoja odpowiedz: ....................</span>
                </div>
                <span tw="h-6 w-6 rounded-full bg-white flex items-center justify-center text-[9px] font-black text-[#713F12]" style={{ border: "1.5px solid #FDE68A" }}>B</span>
              </div>
            </div>
            <div tw="rounded-[10px] bg-white p-2 flex gap-2" style={{ border: "1.5px dashed #FDE68A" }}>
              <span tw="text-[8px] font-bold text-[#92400E]">Podpowiedz: Tak! / Jasne! / Chetnie, a w co gramy?</span>
            </div>
            <XPTracker stars={3} mission="ODEGRAJ Z KIMS" />
          </div>
        </DottedCard>
      </div>

      <DottedCard bg="#FFFFFF" border={c.primary} twExtra="mb-3">
        <div tw="flex items-center justify-between">
          <span tw="text-[10px] font-black uppercase tracking-widest" style={{ color: c.primary }}>
            Trening dialogu - role
          </span>
          <span tw="text-[8px] font-black bg-[#F3E8FF] px-2 py-1 rounded-full text-[#7B2CBF]">Para  2 minuty  zamiana rol</span>
        </div>
        <div tw="grid grid-cols-2 gap-3 mt-3">
          <div tw="rounded-[12px] bg-[#F3E8FF] p-3" style={{ border: "1.5px solid #E9D5FF" }}>
            <span tw="text-[9px] font-black text-[#3A0CA3]">Osoba A - pyta</span>
            <div tw="flex flex-col gap-1.5 mt-2">
              <span tw="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-[#1A1A2E]">Co robiles w weekend?</span>
              <span tw="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-[#1A1A2E]">A co najbardziej Ci sie podobalo?</span>
              <span tw="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-[#1A1A2E]">Super! Opowiedz wiecej.</span>
            </div>
          </div>
          <div tw="rounded-[12px] bg-[#FFFBEB] p-3" style={{ border: "1.5px solid #FDE68A" }}>
            <span tw="text-[9px] font-black text-[#92400E]">Osoba B - odpowiada + pyta</span>
            <div tw="flex flex-col gap-1.5 mt-2">
              <span tw="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-[#1A1A2E]">Bylem nad jeziorem... A Ty?</span>
              <span tw="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold text-[#1A1A2E]">Najfajniejsze byly kajaki!</span>
              <span tw="rounded-full bg-[#FFD166] px-3 py-1.5 text-[9px] font-black text-[#7C2D12]">Pamietaj: patrz w oczy  usmiech</span>
            </div>
          </div>
        </div>
        <div tw="mt-3 flex gap-2">
          <span tw="flex-1 rounded-full bg-[#7B2CBF] px-3 py-2 text-center text-[9px] font-black text-white">Zadanie domowe: 1 rozmowa dzis</span>
          <span tw="flex-1 rounded-full bg-white px-3 py-2 text-center text-[9px] font-bold text-[#6B7280]" style={{ border: "1.5px solid #E9D5FF" }}>
            Narysuj buzke jak sie czules
          </span>
        </div>
      </DottedCard>

      <div tw="flex gap-3">
        <div tw="flex-1">
          <SelfRating accent={c.primary} />
        </div>
        <div tw="flex-1 rounded-[14px] bg-white p-3" style={{ border: "2px solid #E9D5FF" }}>
          <CuttingLine />
          <StickerStrip count={3} accent={c.primary} label="ODZNAKA ROZMOWCY - wytnij" />
        </div>
      </div>

      <FooterBar text="Moc Rozmowy • umiejętności społeczne • startery dialogu • A4 • ćwiczenie w parach" color={c.primary} />
    </div>
  );
}
