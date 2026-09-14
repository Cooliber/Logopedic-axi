import { notFound } from "next/navigation";
import { templates, type TemplateSlug } from "@/lib/pdf/templates";

export default async function PodgladPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  if (!(slug in templates)) return notFound();
  const tpl = templates[slug as TemplateSlug];
  const qs = new URLSearchParams(sp).toString();
  const pdfSrc = `/api/pdf/${slug}${qs ? `?${qs}` : ""}`;

  return (
    <div className="min-h-screen bg-[#FFF7ED] p-4 md:p-8">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-6 flex items-center gap-4">
          <a href="/" className="rounded-full bg-white px-4 py-2 text-sm font-black shadow" style={{ border: "2px solid #E5E7EB" }}>
            ← Wróć
          </a>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tpl.icon}</span>
            <div>
              <h1 className="text-xl font-black text-[#1A1A2E]">{tpl.title}</h1>
              <p className="text-xs font-bold text-[#6B7280]">{tpl.subtitle}</p>
            </div>
          </div>
          <a
            href={pdfSrc}
            target="_blank"
            className="ml-auto rounded-full px-6 py-3 text-sm font-black text-white shadow"
            style={{ backgroundColor: tpl.color }}
          >
            ⬇️ Pobierz PDF
          </a>
        </div>

        <div className="overflow-hidden rounded-[18px] border-[3px] border-zinc-900 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-zinc-900 px-4 py-2">
            <span className="text-xs font-black tracking-widest text-white/80">PODGLĄD PDF • A4</span>
            <span className="text-xs text-white/60">Drukuj • Laminuj • Wytnij</span>
          </div>
          <iframe src={pdfSrc} className="h-[1180px] w-full border-0" title={tpl.title} />
        </div>

        <div className="mt-4 rounded-[14px] bg-white p-4" style={{ border: "2px dashed #E5E7EB" }}>
          <p className="text-xs font-bold text-[#6B7280]">
            💡 Wskazówka: PDF generowany jest na żywo przez Takumi (pdfcn). Jeśli podgląd nie ładuje się, kliknij „Pobierz PDF”.
            Wszystkie karty zoptymalizowane pod druk kolorowy i eko (oszczędny tusz).
          </p>
        </div>
      </div>
    </div>
  );
}
