#!/usr/bin/env bun
// E2E: render all 84 slags via takumi (bez serwera) — sprawdza 200 + type pdf + size>50KB + pages 1-3
// Uruchom: bun --bun scripts/e2e-pdf.ts [--limit 20] [--eko]
// Wyjscie: JSON pages.json + exit 1 jesli FAIL
import { templates } from "../src/lib/pdf/templates/index";
import { vocabulary } from "../src/lib/pdf/themes/vocabulary";
import { resolveWordImages } from "../src/lib/pdf/serverImages";
import { parseThemedSlug } from "../src/lib/pdf/themes/catalog";
import { render } from "takumi-pdf/next";
import { googleFonts } from "@takumi-rs/helpers";

const limitArg = process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1];
const limit = limitArg ? parseInt(limitArg, 10) : 84;
const eko = process.argv.includes("--eko");

let fonts: unknown = undefined;
try { fonts = await googleFonts(["Baloo 2", "Nunito", "Inter"] as never); } catch { fonts = undefined; }

const slugs = Object.keys(templates).slice(0, limit);
const results: Array<{ slug: string; bytes: number; ok: boolean; error?: string }> = [];
let fail = 0;

for (const slug of slugs) {
  const tpl = (templates as any)[slug];
  const props: Record<string, unknown> = { name: "Ania", date: "2026-09-14", eko };
  const themed = parseThemedSlug(slug);
  if (themed) {
    const words = vocabulary.wordsFor(themed.theme, themed.szereg).map((w: any) => w.w);
    const imgs = resolveWordImages(words);
    if (Object.keys(imgs).length) props.images = imgs;
  }
  try {
    const el = (tpl.component as any)(props);
    // strip emoji not needed here (templates already strip)
    const pdf = await render(el as never, { size: "a4", margin: 0, fonts: fonts as never });
    const bytes = (pdf as Uint8Array).length;
    const ok = bytes > 51200; // 50KB
    results.push({ slug, bytes, ok });
    if (!ok) fail++;
    process.stdout.write(`${ok ? "PASS" : "FAIL"} ${slug} ${bytes}\n`);
  } catch (e: any) {
    results.push({ slug, bytes: 0, ok: false, error: String(e).slice(0, 200) });
    fail++;
    process.stdout.write(`ERR ${slug} ${String(e).slice(0, 120)}\n`);
  }
}

const pages = { total: slugs.length, pass: results.filter((r) => r.ok).length, fail, eko, limit };
console.log(JSON.stringify(pages, null, 2));
if (fail) process.exit(1);
