import * as fs from "node:fs";
import * as path from "node:path";
import { render } from "takumi-pdf";
import { googleFonts } from "@takumi-rs/helpers";

const outDir = "/tmp/logopedia-pakiet";
fs.mkdirSync(outDir, { recursive: true });

// Wybrane slugi do pakietu deliverable — syczący + rotacyzm + tematyczne Hawaje/Auta/Halloween/Minecraft + zwierzaki
const slugs: string[] = [
  "syczacy",
  "rotacyzm",
  "syczacy-pojazdy", // auta / hotwheels
  "rotacyzm-pojazdy",
  "syczacy-hawaje",
  "rotacyzm-hawaje",
  "syczacy-halloween",
  "rotacyzm-minecraft",
  "syczacy-zwierzaki", // kotki/misie/króliczki
  "rotacyzm-zwierzaki",
  "planszowka",
  "dyplom",
];

let fonts: unknown = undefined;
try {
  fonts = await googleFonts(["Nunito", "Baloo 2", "Inter"]);
  console.log(`Fonts loaded: ${(fonts as unknown[]).length} subsets`);
} catch (e) {
  console.warn("Fonts fallback (offline):", String(e).slice(0, 200));
  fonts = undefined;
}

const mod = await import("../src/lib/pdf/templates/index.js");
const templates = (mod as any).templates as Record<string, any>;

for (const slug of slugs) {
  const tpl = templates[slug];
  if (!tpl) {
    console.warn(`skip unknown ${slug}`);
    continue;
  }
  const props: Record<string, unknown> = { name: "Ania", date: "2026-09-14", eko: false };
  const element = tpl.component(props as any);
  try {
    const pdf = await render(element as never, { size: "a4", margin: 0, fonts: fonts as never });
    const bytes = pdf as Uint8Array;
    const outPath = path.join(outDir, `logopedia-${slug}.pdf`);
    fs.writeFileSync(outPath, bytes);
    console.log(`OK ${slug}: ${bytes.length} bytes -> ${outPath} ${bytes.length > 50_000 ? "PASS" : "FAIL (<50KB)"}`);
  } catch (e) {
    console.error(`FAIL ${slug}:`, e);
  }
}

// eko variants for syczacy/rotacyzm
for (const slug of ["syczacy", "rotacyzm"]) {
  const tpl = templates[slug];
  const props: Record<string, unknown> = { name: "Ania", date: "2026-09-14", eko: true };
  const element = tpl.component(props as any);
  const pdf = await render(element as never, { size: "a4", margin: 0, fonts: fonts as never });
  const bytes = pdf as Uint8Array;
  const outPath = path.join(outDir, `logopedia-${slug}-eko.pdf`);
  fs.writeFileSync(outPath, bytes);
  console.log(`OK ${slug}-eko: ${bytes.length} bytes`);
}

// manifest for package
const files = fs.readdirSync(outDir).map((f) => {
  const st = fs.statSync(path.join(outDir, f));
  return { file: f, bytes: st.size };
});
fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(files, null, 2));
console.log(`\nPakiet gotowy: ${outDir} (${files.length} plików)`);
console.log(files.map((f) => `${f.file}: ${(f.bytes / 1024).toFixed(1)} KB`).join("\n"));

// also copy hero PNGs evidence
const heroSrcDir = path.resolve("public/anim/hero");
const heroDstDir = path.join(outDir, "hero");
fs.mkdirSync(heroDstDir, { recursive: true });
for (const f of fs.readdirSync(heroSrcDir)) {
  if (f.includes("hawaje") || f.includes("halloween") || f.includes("minecraft") || f.includes("pojazdy") || f.includes("kosmos") || f.includes("zwierzaki")) {
    fs.copyFileSync(path.join(heroSrcDir, f), path.join(heroDstDir, f));
  }
}
console.log(`Hero PNG skopiowane do ${heroDstDir}`);
