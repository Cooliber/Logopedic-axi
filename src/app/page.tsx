import { GalleryWithFilters } from "@/components/pdf/GalleryWithFilters";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      {/* Header premium — thin border, minimal */}
      <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1A2E] text-[12px] font-black tracking-widest text-white">LP</div>
            <div>
              <h1 className="text-[15px] font-black tracking-tight text-[#1A1A2E]">LOGOPEDIA • KARTY PRACY</h1>
              <p className="text-[10px] font-bold tracking-[0.14em] text-[#6B7280]">PREMIUM HQ • A4 300 DPI • EKO • LAMINUJ</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="rounded-full bg-[#1A1A2E] px-4 py-1.5 text-xs font-black text-white">20 kart HQ + 14 paczek</span>
            <a href="#paczki" className="rounded-full bg-white px-4 py-1.5 text-xs font-black text-[#1A1A2E]" style={{border:"1.5px solid #E5E7EB"}}>Paczki 29 PLN →</a>
            <a href="/kreator" className="rounded-full bg-[#FF006E] px-4 py-1.5 text-xs font-black text-white">Kreator</a>
          </div>
        </div>
      </header>

      {/* Hero editorial premium — whitespace, 1 headline */}
      <section className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[32px] bg-white p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]" style={{border:"1.5px solid #E5E7EB"}}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FEF9C3] px-3 py-1 text-[10px] font-black tracking-widest text-[#713F12]" style={{border:"1px solid #FDE68A"}}>NOWOŚĆ • PREMIUM HQ — RĘCZNIE KURATOROWANE ILUSTRACJE</div>
            <h2 className="mt-4 text-[38px] font-black leading-[0.95] tracking-tight text-[#1A1A2E]">
              Kartka A4<br/>
              <span className="rounded-[12px] bg-[#1A1A2E] px-2 text-white">przed dzieckiem</span><br/>
              ma być piękna.
            </h2>
            <p className="mt-4 max-w-[520px] text-[14px] font-medium leading-relaxed text-[#4B5563]">
              Koniec z generycznymi gridami. Każda karta: <b>1 duża ilustracja 5 cm, pastel HQ, 300 DPI, sprawdź z 40 cm</b>.
              Szeregi syczący/szumiący/ciszący/rotacyzm + gry. Paczki tematyczne jako skórki — ten sam layout premium, inne słowa.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-black">
              <span className="rounded-full bg-[#FACC15] px-3 py-1.5 text-[#713F12]" style={{border:"1.5px solid rgba(0,0,0,0.06)"}}>s z c dz</span>
              <span className="rounded-full bg-[#2D6A4F] px-3 py-1.5 text-white">sz ż cz dż</span>
              <span className="rounded-full bg-[#8B5CF6] px-3 py-1.5 text-white">ś ź ć dź</span>
              <span className="rounded-full bg-[#FF7B25] px-3 py-1.5 text-white">R rotacyzm</span>
              <span className="rounded-full bg-white px-3 py-1.5 text-[#1A1A2E]" style={{border:"1.5px solid #E5E7EB"}}>A4 • EKO • laminuj</span>
            </div>
            <div className="mt-7 flex gap-3">
              <a href="#paczki" className="rounded-full bg-[#1A1A2E] px-6 py-3 text-sm font-black text-white shadow hover:brightness-110">Zobacz paczki HQ ↓</a>
              <a href="/kreator" className="rounded-full bg-white px-6 py-3 text-sm font-black text-[#1A1A2E]" style={{border:"1.5px solid #1A1A2E"}}>Kreator personalizacji →</a>
            </div>
            <p className="mt-3 text-[11px] font-bold text-[#6B7280]">Darmowy STARTER 4 karty • PRO 76 PDF HQ 149 PLN • Paczka 29 PLN • ZIP + EKO + naklejki</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[24px] bg-[#1A1A2E] p-6 text-white">
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-white/60">Obietnica jakości</h3>
              <ul className="mt-3 space-y-2 text-sm font-bold leading-relaxed">
                <li className="flex gap-2"><span className="text-[#FACC15]">—</span> Ilustracja 600px, 65% kadru, izolowana, biały #FFFFFF, bez tekstu</li>
                <li className="flex gap-2"><span className="text-[#FACC15]">—</span> 100% manual approve dla 20 hero • CLIP &gt;0.28 dla paczek</li>
                <li className="flex gap-2"><span className="text-[#FACC15]">—</span> Print-test HP laser + atrament, czytelne z 40 cm</li>
                <li className="flex gap-2"><span className="text-[#FACC15]">—</span> Czcionki offline (Baloo 2), EKO białe tło oszczędza tusz</li>
              </ul>
              <div className="mt-4 rounded-[12px] bg-white/10 p-3 text-xs font-bold text-white/80" style={{border:"1px dashed rgba(255,255,255,0.2)"}}>
                Ezoteryka (cymatics) → osobny pack „Oddech i Wibracja” 39 PLN — nie w głównym katalogu.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[18px] bg-white p-4" style={{border:"1.5px solid #E5E7EB"}}>
                <div className="text-[11px] font-black tracking-widest text-[#6B7280]">DRUK</div>
                <div className="mt-1 text-sm font-black text-[#1A1A2E]">A4 300 DPI</div>
                <div className="text-xs font-bold text-[#6B7280]">4 karty 5.5×5.5 cm</div>
              </div>
              <div className="rounded-[18px] bg-[#FACC15] p-4">
                <div className="text-[11px] font-black tracking-widest text-[#713F12]">Kuracja</div>
                <div className="mt-1 text-sm font-black text-[#713F12]">200 hero HQ</div>
                <div className="text-xs font-bold text-[#713F12]/70">manual approve</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paczki premium — 4 hero paczki */}
      <section id="paczki" className="mx-auto max-w-[1280px] px-6">
        <div className="flex items-end justify-between">
          <h3 className="text-[22px] font-black tracking-tight text-[#1A1A2E]">Paczki premium HQ</h3>
          <span className="hidden text-xs font-bold text-[#6B7280] md:block">14 tematów • każda paczka 4 PDF (4 szeregi) • ZIP + EKO</span>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {id:"kosmos", label:"Kosmos", color:"#1E3A8A", price:"29 PLN", desc:"Rakiety, planety, gwiazdy"},
            {id:"zwierzaki", label:"Zwierzaki", color:"#15803D", price:"29 PLN", desc:"Zoo, farma, pupile"},
            {id:"pojazdy", label:"Pojazdy", color:"#BE123C", price:"29 PLN", desc:"Auta, pociągi, statki"},
            {id:"ocean", label:"Ocean", color:"#0369A1", price:"29 PLN", desc:"Morze, rafa, plaża"},
          ].map((p)=> (
            <div key={p.id} className="rounded-[22px] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]" style={{border:"1.5px solid #E5E7EB"}}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full" style={{backgroundColor:p.color}} />
                <div>
                  <div className="text-sm font-black text-[#1A1A2E]">{p.label}</div>
                  <div className="text-xs font-bold text-[#6B7280]">{p.desc}</div>
                </div>
                <span className="ml-auto rounded-full bg-[#1A1A2E] px-3 py-1 text-xs font-black text-white">{p.price}</span>
              </div>
              <div className="mt-4 rounded-[14px] bg-[#FFFBEB] p-3 text-xs font-bold text-[#6B7280]" style={{border:"1.5px dashed #E5E7EB"}}>
                4 PDF: syczacy-{p.id} • szumiacy-{p.id} • ciszacy-{p.id} • rotacyzm-{p.id}<br/>8 słów HQ + ilustracje 600px
              </div>
              <a href={`/#karty`} className="mt-4 flex w-full items-center justify-center rounded-full py-2.5 text-xs font-black text-white" style={{backgroundColor:p.color}}>Zobacz w katalogu →</a>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-[18px] bg-[#1A1A2E] p-5 text-white flex items-center justify-between">
            <div>
              <div className="text-sm font-black">STARTER — darmowy</div>
              <div className="text-xs font-bold text-white/70">4 karty HQ (1 na szereg) • lead magnet</div>
            </div>
            <a href="/api/pdf/syczacy" target="_blank" className="rounded-full bg-white px-4 py-2 text-xs font-black text-black">Pobierz</a>
          </div>
          <div className="rounded-[18px] bg-[#FACC15] p-5 flex items-center justify-between" style={{border:"1.5px solid rgba(0,0,0,0.06)"}}>
            <div>
              <div className="text-sm font-black text-[#713F12]">PRO 76 PDF HQ</div>
              <div className="text-xs font-bold text-[#713F12]/70">20 hero + 56 tematycznych • ZIP + EKO</div>
            </div>
            <span className="rounded-full bg-[#1A1A2E] px-4 py-2 text-xs font-black text-white">149 PLN</span>
          </div>
          <div className="rounded-[18px] bg-white p-5 flex items-center justify-between" style={{border:"1.5px solid #E5E7EB"}}>
            <div>
              <div className="text-sm font-black text-[#1A1A2E]">Bundle 4 paczki</div>
              <div className="text-xs font-bold text-[#6B7280]">Kosmos+Zwierzaki+Pojazdy+Ocean</div>
            </div>
            <span className="rounded-full bg-[#1A1A2E] px-4 py-2 text-xs font-black text-white">79 PLN</span>
          </div>
        </div>
      </section>

      {/* Gallery — 20 hero HQ */}
      <section id="karty" className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="mb-4">
          <h3 className="text-[22px] font-black tracking-tight text-[#1A1A2E]">Katalog HQ — 20 kart hero</h3>
          <p className="text-sm font-medium text-[#6B7280]">Najwyższa jakość • 5.5 cm karta • 600px ilustracja • 300 DPI • Reszta tematycznych jako paczki (filtr „tematyczne”)</p>
        </div>
        <GalleryWithFilters />
        <div className="mt-6 rounded-[18px] bg-white p-4 text-xs font-bold text-[#6B7280]" style={{border:"1.5px solid #E5E7EB"}}>
          Pack ezoteryczny „Oddech i Wibracja” (5 kart cymatics) — osobno, nie w głównym katalogu. Dostępny jako bundle 39 PLN dla zainteresowanych.
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <span className="text-xs font-bold text-[#6B7280]">Logopedia Premium HQ • Baloo 2 • Takumi WASM • 300 DPI • RODO • Print-test</span>
          <span className="text-xs font-black text-[#1A1A2E]">hello@logopedia.pl • 14 paczek • 20 hero HQ</span>
        </div>
      </footer>
    </div>
  );
}
