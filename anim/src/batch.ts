// anim/src/batch.ts — initial batch + generyczny runner dla logopedia
// Uruchom: bun run src/batch.ts [--dry] [--limit 4] [--model schnell|dev|sdxl] [--style doodle]

import * as fs from "node:fs";
import * as path from "node:path";
import "dotenv/config";
import { generateImage } from "./hf-client.js";
import { buildPrompt, PILOT_PROMPTS, type KidStyle } from "./prompts.js";
import { MODELS, DEFAULTS } from "./config.js";

const args = process.argv.slice(2);
const isDry = args.includes("--dry");
const limitIdx = args.indexOf("--limit");
const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1] ?? "0", 10) : 0;
const modelIdx = args.indexOf("--model");
const modelKey = (modelIdx !== -1 ? args[modelIdx + 1] : "schnell") as keyof typeof MODELS;
const styleIdx = args.indexOf("--style");
const styleOverride = (styleIdx !== -1 ? args[styleIdx + 1] : null) as KidStyle | null;
const providerIdx = args.indexOf("--provider");
const providerOverride = providerIdx !== -1 ? args[providerIdx + 1] : null;

const modelCfg = MODELS[modelKey] ?? MODELS.schnell;
const modelId = (modelCfg as any).id ?? DEFAULTS.model;

// rate limit: HF free tier ~ ~100 req/min, ale providerzy mają własne limity.
// fal-ai: 25 concurrent, replicate: 10. Dajemy 1.2s odstępu by nie dostać 429.
const DELAY_MS = 1200;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type ManifestEntry = {
  id: string;
  prompt: string;
  negative_prompt: string;
  model: string;
  provider: string;
  width: number;
  height: number;
  seed?: number;
  file: string;
  bytes?: number;
  latencyMs?: number;
  error?: string;
  createdAt: string;
};

async function main() {
  const prompts = limit > 0 ? PILOT_PROMPTS.slice(0, limit) : PILOT_PROMPTS;
  console.log(`anim batch | model=${modelId} provider=${providerOverride ?? DEFAULTS.provider} dry=${isDry} count=${prompts.length}`);
  console.log(`Output: anim/assets/output/`);

  const manifestPath = path.resolve("assets/manifest.json");
  const existing: ManifestEntry[] = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf-8"))
    : [];

  const results: ManifestEntry[] = [];

  for (let i = 0; i < prompts.length; i++) {
    const p = prompts[i];
    const style = styleOverride ?? p.style ?? "doodle";
    const { prompt, negative_prompt } = buildPrompt({
      subject: (p as any).subject,
      theme: (p as any).theme,
      style: style as KidStyle,
    });

    const fileName = `${p.id}__${style}__${modelKey}.png`;
    const outPath = path.resolve(`assets/output/${fileName}`);

    console.log(`\n[${i + 1}/${prompts.length}] ${p.id}`);
    console.log(`  prompt: ${prompt.slice(0, 120)}...`);
    console.log(`  -> ${fileName}`);

    if (isDry) {
      results.push({
        id: p.id, prompt, negative_prompt, model: modelId,
        provider: providerOverride ?? DEFAULTS.provider,
        width: DEFAULTS.width, height: DEFAULTS.height,
        file: fileName, createdAt: new Date().toISOString(),
      });
      continue;
    }

    // skip jeśli plik już istnieje i >50KB (idempotent)
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 50_000) {
      console.log("  SKIP — już istnieje");
      results.push({
        id: p.id, prompt, negative_prompt, model: modelId,
        provider: providerOverride ?? DEFAULTS.provider,
        width: DEFAULTS.width, height: DEFAULTS.height,
        file: fileName, bytes: fs.statSync(outPath).size,
        createdAt: new Date().toISOString(),
      });
      continue;
    }

    const isSchnell = modelKey === "schnell";
    const res = await generateImage(
      {
        prompt,
        negative_prompt,
        model: modelId,
        provider: (providerOverride as any) ?? undefined,
        width: DEFAULTS.width,
        height: DEFAULTS.height,
        num_inference_steps: isSchnell ? 4 : (modelCfg as any).steps ?? 28,
        guidance_scale: isSchnell ? 3.5 : 7,
      },
      outPath,
    );

    const entry: ManifestEntry = {
      id: p.id, prompt, negative_prompt, model: modelId,
      provider: res.provider, width: DEFAULTS.width, height: DEFAULTS.height,
      file: fileName, bytes: res.bytes, latencyMs: res.latencyMs,
      error: res.error, createdAt: new Date().toISOString(),
    };
    results.push(entry);

    if (res.ok) {
      console.log(`  OK ${res.bytes} bytes in ${res.latencyMs}ms`);
    } else {
      console.log(`  FAIL: ${res.error?.slice(0, 200)}`);
    }

    // 429 handling
    if (res.error?.includes("429") || res.error?.includes("Too Many")) {
      console.log("  Rate limited — czekam 10s");
      await sleep(10_000);
    } else if (i < prompts.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  // merge manifest (upsert by id+file) — dry nie nadpisuje istniejących bytes
  const merged = [...existing];
  for (const r of results) {
    const idx = merged.findIndex((m) => m.file === r.file);
    if (idx >= 0) {
      if (isDry && merged[idx].bytes) continue; // zachowaj poprzedni OK przy dry
      merged[idx] = r;
    } else merged.push(r);
  }
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(merged, null, 2));
  console.log(`\nManifest zapisany: ${manifestPath} (${merged.length} wpisów)`);

  const ok = results.filter((r) => !r.error && r.bytes && r.bytes > 10_000).length;
  // dry run nie liczy się jako FAIL — tam bytes undefined celowo
  const realFails = isDry ? 0 : results.length - ok;
  const fail = isDry ? 0 : realFails;
  console.log(`\nPodsumowanie: OK ${ok}/${results.length}, FAIL ${fail}${isDry ? " (dry — generowanie pominięte)" : ""}`);
  if (fail > 0) {
    const creditFail = results.some((r) => r.error?.includes("depleted") || r.error?.includes("credits"));
    if (creditFail) console.log("Wskazówka: wyczerpano darmowe kredyty HF ($0.10). Dokup kredyty: https://huggingface.co/settings/billing lub przełącz provider na fal-ai z własnym kluczem FAL_KEY, lub subskrybuj PRO ($2 → 20× więcej).");
    else console.log("Wskazówki: sprawdź HF_TOKEN, provider, model warm status, limity. Ponów z --limit 2.");
  }
  // koszt szacunkowy
  const costPer = (modelCfg as any).costPerImageUSD ?? 0.003;
  console.log(`Szacunkowy koszt batch: ~$${(results.length * costPer).toFixed(3)} (model ${modelKey})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
