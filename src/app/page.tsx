import { GalleryWithFilters } from "@/components/pdf/GalleryWithFilters";
import { DoodleCrown, DoodleStar, DoodleTrophy } from "@/lib/pdf/icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      {/* Header dodle */}
      <header className="sticky top-0 z-10 border-b-[3px] border-black bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF006E] text-white shadow" style={{ border: "2px solid rgba(0,0,0,0.08)" }}>
              <DoodleCrown className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-[18px] font-black leading-none tracking-tight text-[#1A1A2E]">LOGOPEDIA • KARTY PRACY</h1>
              <p className="text-[11px] font-bold tracking-widest text-[#6B7280]">DODLE • KOLOR • GRYWALIZACJA • PDF DO DRUKU</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="rounded-full bg-[#FEF9C3] px-3 py-1.5 text-xs font-black text-[#713F12]" style={{ border: "2px solid #FDE68A" }}>
              105 szablonów (21 bazowych + 68 tematycznych + 16 zagadek) • A4 • EKO • zagadki logopedyczne
            </span>
            <a href="/pobierz" className="rounded-full bg-[#1A1A2E] px-4 py-1.5 text-xs font-black text-white">
              Katalog PDF ↓
            </a>
            <span className="rounded-full bg-black px-4 py-1.5 text-xs font-black text-white">pdfcn • Takumi</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_12px_32px_rgba(0,0,0,0.08)]" style={{ border: "3px solid #1A1A2E" }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FF006E] px-4 py-1.5 text-xs font-black text-white">
              <DoodleStar className="h-4 w-4 text-white" /> NOWOŚĆ • KARTY LOGOPEDYCZNE DLA DZIECI
            </div>
            <h2 className="mt-4 text-[34px] font-black leading-[0.95] tracking-tight text-[#1A1A2E]">
              Kolorowe <span className="rounded-[12px] bg-[#FACC15] px-2">dodle</span> zamiast
              <br />
              nudnych tabel
            </h2>
            <p className="mt-4 max-w-[520px] text-[14px] font-semibold leading-relaxed text-[#4B5563]">
              Szeregi <b>syczący • szumiący • ciszący • rotacyzm</b>, płynność wypowiedzi, gry planszowe do druku,
              dialog i oddech. Każda karta z elementami grywalizacji: XP, ⭐, naklejki, tory i misje.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { l: "Syczący", c: "#FACC15" },
                { l: "Szumiący", c: "#2D6A4F", tx: "white" },
                { l: "Ciszący", c: "#8B5CF6", tx: "white" },
                { l: "R", c: "#FF7B25", tx: "white" },
                { l: "Płynność", c: "#00B4D8", tx: "white" },
                { l: "Planszówka", c: "#FF006E", tx: "white" },
                { l: "Dialog", c: "#7B2CBF", tx: "white" },
                { l: "Oddech", c: "#E63946", tx: "white" },
                { l: "Dyplom", c: "#F59E0B", tx: "white" },
                { l: "Naklejki", c: "#06D6A0", tx: "white" },
              ].map((b) => (
                <span
                  key={b.l}
                  className="rounded-full px-3 py-1.5 text-xs font-black"
                  style={{ backgroundColor: b.c, color: b.tx ?? "#713F12", border: "2px solid rgba(0,0,0,0.08)" }}
                >
                  {b.l}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href="#karty"
                className="rounded-full bg-[#1A1A2E] px-6 py-3 text-sm font-black text-white shadow hover:brightness-110"
              >
                Zobacz 105 kart ↓
              </a>
              <a
                href="/kreator"
                className="rounded-full bg-[#FF006E] px-6 py-3 text-sm font-black text-white shadow hover:brightness-110"
              >
                Kreator →
              </a>
              <a
                href="/api/pdf/katalog"
                target="_blank"
                className="hidden rounded-full bg-white px-6 py-3 text-sm font-black text-[#1A1A2E] shadow md:block"
                style={{ border: "2.5px solid #1A1A2E" }}
              >
                Katalog PDF
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[22px] bg-[#1A1A2E] p-6 text-white">
              <h3 className="text-sm font-black uppercase tracking-widest text-white/60">Jak to działa?</h3>
              <ol className="mt-3 flex flex-col gap-2 text-sm font-bold leading-relaxed">
                <li className="flex gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-black">1</span>
                  Wybierz kartę → podgląd w przeglądarce
                </li>
                <li className="flex gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-black">2</span>
                  Pobierz PDF (A4, kolor + wersja eko)
                </li>
                <li className="flex gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-black">3</span>
                  Drukuj, laminuj, wytnij naklejki i graj!
                </li>
              </ol>
              <div className="mt-4 rounded-[14px] bg-white/10 p-3 text-xs font-bold leading-relaxed text-white/80" style={{ border: "1.5px dashed rgba(255,255,255,0.2)" }}>
                Stack: Next.js 16 + pdfcn (Takumi) • Tailwind 4 • WASM PDF • Zero headless browser
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[18px] bg-[#06D6A0] p-4 text-white" style={{ border: "3px solid rgba(0,0,0,0.1)" }}>
                <DoodleTrophy className="h-7 w-7 text-white" />
                <div className="mt-1 text-sm font-black leading-tight">Grywalizacja</div>
                <div className="flex items-center gap-1 text-xs font-bold opacity-80">
                  XP <DoodleStar className="h-3 w-3" /> misje • tory
                </div>
              </div>
              <div className="rounded-[18px] bg-[#FFBE0B] p-4 text-[#7C2D12]" style={{ border: "3px solid rgba(0,0,0,0.08)" }}>
                <DoodleStar className="h-7 w-7" />
                <div className="mt-1 text-sm font-black leading-tight">Druk A4/A3</div>
                <div className="text-xs font-bold opacity-70">Kolor + EKO • laminuj</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="karty" className="mx-auto max-w-[1280px] px-6 pb-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="text-[22px] font-black tracking-tight text-[#1A1A2E]">Wszystkie karty pracy</h3>
            <p className="text-sm font-semibold text-[#6B7280]">105 szablonów (21 bazowych + 68 tematycznych — 17 tematów × 4 szeregi + 5 gier + 16 zagadek) • filtr po kategorii + temacie • personalizuj • EKO • HF obrazy</p>
          </div>
          <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-black shadow md:block" style={{ border: "2px solid #E5E7EB" }}>
            Dodle • rounded 22px • dashed • stickers • XP
          </span>
        </div>
        <GalleryWithFilters />
      </section>

      <footer className="border-t-[3px] border-black bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <span className="text-xs font-bold text-[#6B7280]">
            Logopedia Karty Pracy • Built with pdfcn + Takumi • Dodle visual • Polskie głoski
          </span>
          <span className="text-xs font-black text-[#FF006E]">hello@logopedia.pl • sklep.logopedia.pl</span>
        </div>
      </footer>
    </div>
  );
}
