import { kidPalette } from "../theme";
import { DottedCard, FooterBar, PageHeader, PersonalizationBar } from "./shared";

export function KatalogTemplate({ name, date, eko }: { name?: string; date?: string; eko?: boolean } = {}) {
  const products = [
    { title: "Pakiet Syczacy", price: "39 zl", letter: "S", desc: "20 kart  s z c dz  gra + naklejki", color: kidPalette.sycy.primary },
    { title: "Pakiet Szumiacy", price: "39 zl", letter: "SZ", desc: "20 kart  sz ż cz dż  las + sortowanie", color: kidPalette.szum.primary },
    { title: "Pakiet Ciszacy", price: "39 zl", letter: "SI", desc: "20 kart  s z c dz  gory + labirynt", color: "#8B5CF6" },
    { title: "Pakiet R", price: "45 zl", letter: "R", desc: "24 karty  rotacyzm  lew Rysio + tory", color: kidPalette.r.primary },
    { title: "Płynna Rzeka", price: "29 zl", letter: "~", desc: "12 kart • płynność • oddech + tempo", color: kidPalette.plynnosc.primary },
    { title: "Planszowki XXL", price: "49 zl", letter: "G", desc: "6 plansz A3  wszystkie szeregi", color: kidPalette.planszowka.primary },
    { title: "Moc Rozmowy", price: "29 zl", letter: "D", desc: "10 kart • dialog • komiksy + role", color: kidPalette.dialog.primary },
    { title: "Oddech Smoka", price: "29 zl", letter: "O", desc: "12 kart • oddech/fonacja • tory + tabele", color: kidPalette.oddech.primary },
  ];

  return (
    <div tw="flex flex-col p-6 w-full min-h-full" style={{ backgroundColor: eko ? "#FFFFFF" : "#FFFBEB" }}>
      <PageHeader title="SKLEP LOGOPEDY" subtitle="Materiały do kupienia • PDF do druku • Licencja przedszkole/dom" icon="S" color="#FF006E" badge="NOWOŚĆ" heroLetter="S" />
      <PersonalizationBar name={name} date={date} color="#FF006E" />

      <div tw="rounded-[16px] bg-white px-4 py-3 mb-4 flex items-center gap-3" style={{ border: "2.5px dashed #FFB5D8" }}>
        <span tw="text-[10px] font-black uppercase tracking-widest text-[#FF006E]">Promocja</span>
        <span tw="text-[10px] font-bold text-[#1A1A2E]">Caly zestaw 8 pakietow - 249 zl zamiast 298 zl  Kod: MOWIMY10</span>
        <span tw="ml-auto rounded-full bg-[#FF006E] px-3 py-1 text-[9px] font-black text-white">-16%</span>
      </div>

      <div tw="grid grid-cols-2 gap-3 mb-4">
        {products.map((p) => (
          <div key={p.title} tw="rounded-[16px] bg-white p-4 flex gap-3" style={{ border: `2.5px solid ${p.color}30` }}>
            <div
              tw="h-12 w-12 rounded-[12px] flex items-center justify-center text-[16px] font-black text-white shrink-0"
              style={{ backgroundColor: p.color, border: "2px solid rgba(0,0,0,0.08)" }}
            >
              {p.letter}
            </div>
            <div tw="flex flex-col flex-1">
              <span tw="text-[11px] font-black text-[#1A1A2E] leading-none">{p.title}</span>
              <span tw="text-[8px] font-bold text-[#6B7280] mt-1 leading-tight">{p.desc}</span>
              <div tw="flex items-center gap-2 mt-2">
                <span tw="text-[13px] font-black" style={{ color: p.color }}>
                  {p.price}
                </span>
                <span tw="text-[7px] font-bold text-[#6B7280]">PDF  A4  gotowe do druku</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div tw="flex gap-3 mb-3">
        <DottedCard bg="#FFFFFF" border="#FFB5D8" twExtra="flex-1">
          <span tw="text-[10px] font-black uppercase tracking-widest text-[#FF006E]">Co zyskujesz?</span>
          <div tw="flex flex-col gap-1.5 mt-2">
            {["Gotowe do druku A4/A3", "Kolor + wersja eko (oszczedna)", "Naklejki, dyplomy, zetony do wyciecia", "Licencja: dom + placowka"].map((t) => (
              <div key={t} tw="flex gap-2 items-center">
                <span tw="h-5 w-5 rounded-full bg-[#FF006E] flex items-center justify-center text-[9px] text-white font-black">+</span>
                <span tw="text-[9px] font-bold text-[#1A1A2E]">{t}</span>
              </div>
            ))}
          </div>
        </DottedCard>

        <div tw="flex-1 rounded-[16px] bg-[#1A1A2E] p-4 flex flex-col gap-3">
          <span tw="text-[10px] font-black uppercase tracking-widest text-white">Zamow - sklep online</span>
          <div tw="rounded-[12px] bg-white p-3 flex flex-col gap-2 items-center">
            <span tw="text-[9px] font-black text-[#1A1A2E]">Kod QR - sklep</span>
            <div tw="h-[84px] w-[84px] rounded-[10px] bg-[#F3F4F6] flex items-center justify-center" style={{ border: "2px dashed #D1D5DB" }}>
              <span tw="text-[9px] font-black text-[#6B7280]">QR</span>
            </div>
            <span tw="text-[7px] font-bold text-[#6B7280]">sklep.logopedia.pl</span>
            <span tw="text-[7px] font-bold text-[#6B7280]">Wpisz kod MOWIMY10 przy zamowieniu</span>
          </div>
          <span tw="text-[8px] font-bold text-white/70">Platnosci: przelew / BLIK  -  Wysylka: PDF na maila w 5 min  -  Faktura VAT</span>
        </div>
      </div>

      <FooterBar text="Sklep Logopedy  Wszystkie materialy dodle  drukuj ile chcesz  kontakt: hello@logopedia.pl" color="#1A1A2E" />
    </div>
  );
}
