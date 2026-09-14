import { templateList } from "@/lib/pdf/templates";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

function fileExists(p: string) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

export default function PobierzPage() {
  const pdfDir = path.join(process.cwd(), "public/pdfs");
  const hasStatic = fileExists(pdfDir);

  let manifest: Array<{ slug: string; title: string; files: string[] }> | null = null;
  try {
    manifest = JSON.parse(fs.readFileSync(path.join(pdfDir, "manifest.json"), "utf-8"));
  } catch {}

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <header className="sticky top-0 z-10 border-b-[3px] border-black bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A2E] text-xl">⬇</div>
            <div>
              <h1 className="text-[18px] font-black leading-none tracking-tight text-[#1A1A2E]">KATALOG PDF</h1>
              <p className="text-[11px] font-bold tracking-widest text-[#6B7280]">Pliki do pobrania • A4 • kolor + eko</p>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-[#FEF9C3] px-3 py-1.5 text-xs font-black text-[#713F12] md:block" style={{ border: "2px solid #FDE68A" }}>
              {templateList.length} szablonów × 4 warianty = {templateList.length * 4} plików
            </span>
            <a href="/kreator" className="rounded-full bg-[#FF006E] px-4 py-2 text-xs font-black text-white">
              Kreator →
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-6 py-8">
        {!hasStatic && (
          <div className="mb-6 rounded-[16px] bg-[#FEF9C3] p-4" style={{ border: "2.5px dashed #FDE68A" }}>
            <p className="text-sm font-bold text-[#713F12]">
              Pliki statyczne nie wygenerowane. Uruchom <code className="rounded bg-black px-1.5 py-0.5 text-white">bun run generate:pdfs</code> by
              wygenerować <code>public/pdfs/*.pdf</code>. Póki co pliki generowane są na żywo przez API.
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {templateList.map((t) => {
            const variants = [
              { label: "Kolor", suffix: "", eko: false },
              { label: "EKO", suffix: "-eko", eko: true },
              { label: "Ania — kolor", suffix: "-ania", eko: false, name: "Ania" },
              { label: "Ania — EKO", suffix: "-ania-eko", eko: true, name: "Ania" },
            ];

            return (
              <div key={t.slug} className="flex flex-col rounded-[22px] bg-white p-5 shadow" style={{ border: `3px solid ${t.color}` }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: t.color }}>
                    {t.icon}
                  </div>
                  <div>
                    <div className="text-[15px] font-black leading-none text-[#1A1A2E]">{t.title}</div>
                    <div className="text-xs font-bold text-[#6B7280]">{t.subtitle}</div>
                  </div>
                  <span className="ml-auto rounded-full bg-[#F3F4F6] px-2 py-1 text-[10px] font-black">{t.category}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {variants.map((v) => {
                    const staticHref = `/pdfs/logopedia-${t.slug}${v.suffix}.pdf`;
                    const apiHref = `/api/pdf/${t.slug}${v.name ? `?name=${v.name}` : ""}${v.eko ? (v.name ? "&eko=1" : "?eko=1") : ""}`;
                    const href = hasStatic ? staticHref : apiHref;

                    return (
                      <a
                        key={v.suffix}
                        href={href}
                        target="_blank"
                        className="flex flex-col rounded-[14px] bg-[#FFFBEB] p-3 text-center hover:brightness-95"
                        style={{ border: `2px solid ${t.color}30` }}
                      >
                        <span className="text-xs font-black text-[#1A1A2E]">{v.label}</span>
                        <span className="mt-1 text-[10px] font-bold text-[#6B7280]">logopedia-{t.slug}{v.suffix}.pdf</span>
                        <span className="mt-2 rounded-full bg-white px-2 py-1 text-[10px] font-black" style={{ border: `1.5px solid ${t.color}`, color: t.color }}>
                          Pobierz
                        </span>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-3 flex gap-2">
                  <a href={`/podglad/${t.slug}`} className="flex-1 rounded-full border-2 bg-white py-2 text-center text-xs font-black">
                    Podgląd
                  </a>
                  <a
                    href={`/api/pdf/${t.slug}${hasStatic ? "" : ""}`}
                    target="_blank"
                    className="flex-1 rounded-full bg-[#1A1A2E] py-2 text-center text-xs font-black text-white"
                  >
                    API live
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[18px] bg-[#1A1A2E] p-6 text-white">
          <h3 className="text-sm font-black uppercase tracking-widest text-white/60">Deploy</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-black">Vercel (1 klik)</div>
              <pre className="mt-2 overflow-auto rounded-[12px] bg-white/10 p-3 text-xs">vercel --prod{"\n"}# lub push na main (auto deploy)</pre>
              <p className="mt-2 text-xs text-white/60">`vercel.json` ustawia `maxDuration:30` + 1024MB dla font fetch + WASM.</p>
            </div>
            <div>
              <div className="text-sm font-black">VPS (Docker)</div>
              <pre className="mt-2 overflow-auto rounded-[12px] bg-white/10 p-3 text-xs">DOCKER_BUILD=1 docker compose up --build -d{"\n"}# http://SERVER:3000</pre>
              <p className="mt-2 text-xs text-white/60">Standalone build: `next.config.ts` output standalone. Healthcheck na `/api/pdf/syczacy`.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <code className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">bun run generate:pdfs</code>
            <span className="text-xs font-bold text-white/60">generuje public/pdfs/*.pdf + manifest.json (wymaga network dla Google Fonts)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
