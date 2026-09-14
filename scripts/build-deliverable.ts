// Bun script: buduje pakiet deliverable dla logopedy — deliverable/DARMOWE + deliverable/PAKIET_PREMIUM
// Uzywa takumi-pdf + googleFonts + HF PNG dataURI. Wymaga network (fonts) + public/anim/words/*.png
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { render } from "takumi-pdf";
import { googleFonts } from "@takumi-rs/helpers";
import QRCode from "qrcode";
import { parseThemedSlug } from "../src/lib/pdf/themes/catalog";
import { vocabulary } from "../src/lib/pdf/themes/vocabulary";
import { resolveWordImages } from "../src/lib/pdf/serverImages";

const outRoot = join(process.cwd(), "deliverable");

const FREE_SLUGS = ["syczacy-hawaje", "rotacyzm-hawaje", "planszowka", "naklejki", "dyplom"];
const PREMIUM_SLUGS = ["syczacy-halloween", "rotacyzm-halloween", "syczacy-minecraft", "rotacyzm-minecraft", "katalog"];

async function renderSlug(
  slug: string,
  outDir: string,
  fonts: unknown,
  variants: Array<{ suffix: string; props: Record<string, unknown> }>,
  templates: Record<string, { component: (p?: Record<string, unknown>) => unknown; title: string }>,
): Promise<string[]> {
  const tpl = templates[slug];
  const files: string[] = [];
  for (const v of variants) {
    const el = tpl.component(v.props);
    const pdf = await render(el as never, { size: "a4", margin: 0, fonts: fonts as never });
    const filename = `logopedia-${slug}${v.suffix}.pdf`;
    await writeFile(join(outDir, filename), pdf);
    files.push(filename);
    if (pdf.length < 50_000) console.warn(`  ! ${slug}${v.suffix} PDF <50KB (${pdf.length}B) — możliwy brak obrazków`);
    console.log(`  ${slug}${v.suffix}: ${pdf.length}B`);
  }
  return files;
}

async function main() {
  console.log("Budowa pakietu deliverable...");
  const { templates } = await import("../src/lib/pdf/templates/index");
  const fonts = await googleFonts(["Nunito", "Baloo 2", "Inter"]);
  console.log(`Fonts: ${(fonts as unknown[]).length} subsets`);

  const freeDir = join(outRoot, "DARMOWE");
  const premiumDir = join(outRoot, "PAKIET_PREMIUM");
  await mkdir(freeDir, { recursive: true });
  await mkdir(premiumDir, { recursive: true });

  const qr = await QRCode.toDataURL("https://sklep.logopedia.pl", { width: 200, margin: 1 });

  const makeVariants = (slug: string, personalizacja: boolean): Array<{ suffix: string; props: Record<string, unknown> }> => {
    const base: Record<string, unknown> = {};
    if (slug === "katalog") base.qr = qr;
    // Obrazki HF dla tematycznych
    const themed = parseThemedSlug(slug);
    if (themed) {
      const words = vocabulary.wordsFor(themed.theme, themed.szereg).map((w) => w.w);
      const imgs = resolveWordImages(words);
      if (Object.keys(imgs).length > 0) base.images = imgs;
    }
    const out: Array<{ suffix: string; props: Record<string, unknown> }> = [
      { suffix: "", props: { ...base } },
      { suffix: "-eko", props: { ...base, eko: true } },
    ];
    if (personalizacja) out.push({ suffix: "-ania", props: { ...base, name: "Ania", date: "2026-09-14" } });
    return out;
  };

  console.log("\n=== DARMOWE ===");
  for (const slug of FREE_SLUGS) {
    await renderSlug(slug, freeDir, fonts, makeVariants(slug, slug === "syczacy-hawaje"), templates as never);
  }

  console.log("\n=== PAKIET PREMIUM ===");
  for (const slug of PREMIUM_SLUGS) {
    await renderSlug(slug, premiumDir, fonts, makeVariants(slug, false), templates as never);
  }

  const readme = `# Pakiet logopedyczny — Hawaje, Halloween, Minecraft
Wygenerowano: ${new Date().toISOString().slice(0, 10)}

## DARMOWE/ (do pobrania)
- **karta-syczacy-hawaje** — szereg syczący (s, z, c, dz) w klimacie Hawajów
- **karta-rotacyzm-hawaje** — R w klimacie Hawajów
- **planszowka** — gra do druku (grywalizacja)
- **naklejki** — 48 żetonów do wycięcia
- **dyplom** — nagroda na koniec

## PAKIET_PREMIUM/ (do kupienia — katalog z QR w środku)
- Halloween: syczacy + rotacyzm
- Minecraft: syczacy + rotacyzm
- katalog.pdf — oferta z kodem QR do sklepu

## Jak używać na lekcji (1 karta = 1 sesja 8-10 min)
1. **Strefa 1** — słuchaj i mów (dorosły pokazuje, dziecko powtarza).
2. **Strefa 2** — 8 słów: powiedz 3×, pokoloruj, postaw pieczątkę za każdą próbę.
3. **Strefa 3** — pary minimalne (wskaż, kropkuj) + ruch 5×.
4. **Strefa 4** — zdania x3 + własne zdanie/rysunek dziecka.
5. **Pętla nagrody** — 8 słów = XP = naklejka. Samoocena na końcu.

Wskazówka: karty zalaminuj — pisaki suchościeralne + pieczątki wielokrotnego użytku.
`;
  await writeFile(join(outRoot, "README.md"), readme);
  console.log(`\nREADME: ${join(outRoot, "README.md")}`);
  console.log("Gotowe.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
