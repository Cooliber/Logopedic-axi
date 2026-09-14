# Purpose
- Generator obrazków dla dzieci via Hugging Face Inference Providers dla kart logopedycznych. Pipeline: prompt → HF API → PNG → manifest → PDF.
- Stack: `@huggingface/inference` + `dotenv` + `bun` (TS ESM). Output: `assets/output/*.png` + `assets/manifest.json`.

# Ownership
- Owner: logopedia / anim
- Scope: `anim/` — `src/config.ts`, `src/prompts.ts`, `src/hf-client.ts`, `src/batch.ts`, `src/generate.ts`, `assets/`
- Token: `HF_TOKEN=hf_REDACTED_TOKEN` (fine-grained kalmarlogopedia, inference.serverless.write). Nie commituj `.env`.

# Local Contracts
- Modele: `FLUX.1-schnell` (default, $0.003, Apache-2.0), `FLUX.1-dev` ($0.025), `SDXL` ($0.003). Wybór w `src/config.ts` + flagi CLI.
- Providerzy: `fal-ai` (FLUX), `replicate`, `together` (SDXL), `hf-inference`, `auto` (default failover).
- Prompty: natural language dla FLUX, tag-style dla SDXL. Style: `doodle` (default) / `kawaii` / `watercolor` / `flat` / `clay`. Każdy z `SAFE_NEGATIVE`.
- PDF: obrazy 1024×1024 white background → skaluj w szablonie do ~180px. Integracja via `public/anim/` lub dataURI.
- Manifest: `assets/manifest.json` — id, prompt, model, provider, bytes, latency, error. Idempotent batch (skip >50KB).
- Rate limit: `DELAY_MS=1200`, 429 → 10s backoff. Warm pool fal-ai 1-3s, replicate 8-15s.

# Work Guidance
- Dodaj prompt: `src/prompts.ts` → `PILOT_PROMPTS` lub `promptForWord(word, theme, szereg)`, potem `bun run src/batch.ts --dry`.
- Batch: `bun run src/batch.ts [--dry] [--limit N] [--model schnell|dev|sdxl] [--style doodle] [--provider fal-ai]`.
- Single: `bun run src/generate.ts --subject "..." --theme kosmos --out assets/output/x.png`.
- Test API: `bun run src/hf-client.ts --test` (whoami + 1 obrazek 512).
- Tematy NEXT (dom/ubrania/pogoda/muzyka): dopisz do `PILOT_PROMPTS`, batch 8 hero, review, kopia do `public/anim/`.

# Verification
- `bun run src/batch.ts --dry --limit 2` — prompty bez API muszą przejść.
- `bun run src/hf-client.ts --test` — whoami 200 + PNG >0 bytes.
- `assets/manifest.json` — każdy wpis ma `file` + (`bytes` lub `error`), brak `error` dla OK.
- `assets/output/*.png` — rozmiar >50KB dla 1024, >10KB dla 512.

# Child DOX Index
- `src/config.ts` — modele, providerzy, THEME_STYLE_HINT, DEFAULTS
- `src/prompts.ts` — style presets, buildPrompt, PILOT_PROMPTS, promptForWord
- `src/hf-client.ts` — InferenceClient wrapper, generateImage
- `src/batch.ts` — batch runner, manifest, koszty
- `src/generate.ts` — single CLI
- `INSTRUKCJE.md` — iteracje krok po kroku
