// Bun script: generuje wszystkie PDF do public/pdfs (katalog do pobrania)
// Uzywa takumi-pdf (bun bundler) + googleFonts — wymaga network
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { render } from "takumi-pdf";
import { googleFonts } from "@takumi-rs/helpers";
import QRCode from "qrcode";
import { auditDesignSystem } from "../src/lib/pdf/design-system";

const outDir = join((import.meta as unknown as { dir: string }).dir ?? process.cwd(), "../public/pdfs");

async function main() {
  console.log("Generowanie PDF katalogu...");
  await mkdir(outDir, { recursive: true });

  const { templates } = await import("../src/lib/pdf/templates/index");
  const fonts = await googleFonts(["Nunito", "Baloo 2", "Inter"]);
  console.log(`Fonts: ${fonts.length} subsets`);

  const manifest: Array<{ slug: string; title: string; files: string[] }> = [];

  for (const [slug, tpl] of Object.entries(templates)) {
    const files: string[] = [];

    // warianty: kolor, eko, personalizowany
    const variants: Array<{ suffix: string; props: Record<string, unknown> }> = [
      { suffix: "", props: {} },
      { suffix: "-eko", props: { eko: true } },
      { suffix: "-ania", props: { name: "Ania", date: "2026-09-07" } },
      { suffix: "-ania-eko", props: { name: "Ania", date: "2026-09-07", eko: true } },
    ];

    // katalog ma QR
    if (slug === "katalog") {
      const qr = await QRCode.toDataURL("https://sklep.logopedia.pl", { width: 200, margin: 1 });
      for (const v of variants) v.props.qr = qr;
    }

    for (const v of variants) {
      const el = (tpl.component as (p?: Record<string, unknown>) => unknown)(v.props);
      const pdf = await render(el as never, { size: "a4", margin: 0, fonts: fonts as never });
      const filename = `logopedia-${slug}${v.suffix}.pdf`;
      await writeFile(join(outDir, filename), pdf);
      files.push(filename);
      const audits = auditDesignSystem({
        wordsCount: 8,
        imagesCount: 12,
        hasPersonalization: true,
        hasHierarchy: !["katalog", "dyplom", "naklejki"].includes(slug),
        hasXP: true,
        hasSelfRating: true,
        hasCuttingLine: true,
      });
      const errs = audits.filter((a) => a.level === "error");
      const warns = audits.filter((a) => a.level === "warn");
      if (errs.length > 0) console.warn(`  ! ${slug}${v.suffix} AUDIT ERR: ${errs.map((e) => e.message).join(" | ")}`);
      else if (warns.length > 0) console.warn(`  ~ ${slug}${v.suffix} audit warn: ${warns.map((e) => e.message).join(" | ")}`);
      if (pdf.length < 50_000) console.warn(`  ! ${slug}${v.suffix} PDF <50KB (${pdf.length} bytes) — possible missing images/content`);
      console.log(`  ${slug}${v.suffix}: ${pdf.length} bytes -> ${filename}`);
    }

    manifest.push({ slug, title: (tpl as { title: string }).title, files });
  }

  await writeFile(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nManifest: ${outDir}/manifest.json`);
  console.log(`Gotowe: ${Object.keys(templates).length} szablonow x 4 warianty = ${Object.keys(templates).length * 4} plikow`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
