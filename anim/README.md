# anim — generator obrazków dla dzieci (Hugging Face Inference Providers)

Pipeline do generowania ilustracji potrzebnych do kart logopedycznych via **Hugging Face Inference Providers** (router + SDK `@huggingface/inference`). Zoptymalizowany pod styl **dodle** (pastel, doodle, biała kartka), zgodny z paletą `src/lib/pdf/theme.ts` i tematami `src/lib/pdf/themes/catalog.ts`.

## Co dostajesz

- **Gotowy klient HF** (`src/hf-client.ts`) — 1 funkcja `generateImage()`, obsługa Blob → PNG, retry na 429/503.
- **Prompt builder** (`src/prompts.ts`) — 5 stylów (`doodle`/`kawaii`/`watercolor`/`flat`/`clay`), helper `buildPrompt()` + `promptForWord()` + pilot 16 promptów.
- **Batch runner** (`src/batch.ts`) — idempotentny, rate-limited, manifest, szacowanie kosztów, `--dry` i `--limit`.
- **Single CLI** (`src/generate.ts`) — 1 obrazek z `--subject`/`--prompt`.
- **Dokumentacja** — ten README + `INSTRUKCJE.md` (iteracje) + `src/config.ts` (modele).

## Dostępne możliwości (2026-09, zweryfikowane websearch)

### Modele

| ID | Kroki | Licencja | Koszt/obraz | Użycie |
|----|-------|----------|-------------|--------|
| `black-forest-labs/FLUX.1-schnell` | 4 | Apache-2.0 (komercyjny OK) | **$0.003** | **default — szybko, tanio, drafty** |
| `black-forest-labs/FLUX.1-dev` | 28 | Non-commercial (via API płatne = OK) | $0.025 | final hero, najlepsza jakość + tekst |
| `stabilityai/stable-diffusion-xl-base-1.0` | 30 | Open RAIL++M (komercyjny OK) | $0.003 | LoRA, anime, tag-style |

Szczegóły: `src/config.ts` → `MODELS`. Koszty wg fal.ai / replicate (lipiec 2026): Schnell $0.003, Dev $0.025, Pro $0.05 — HF nie dolicza marży.

### Providerzy (text-to-image)

| Provider | Latencja | Billing | Kiedy |
|----------|----------|---------|-------|
| `fal-ai` | 1-3s cold | per image | FLUX najszybciej i najtaniej |
| `replicate` | 8-15s cold | per GPU-second | najlepsza dokumentacja, fallback |
| `together` | 2-4s | per image | SDXL najtaniej ($0.0033) |
| `hf-inference` | zmienna | compute sec | free tier, CPU |
| `auto` | failover | auto | **default — nie musisz wybierać** |

Konfiguracja preferencji: https://hf.co/settings/inference-providers

### Parametry

| Parametr | Opis | Default (schnell) | Default (dev/sdxl) |
|----------|------|-------------------|-------------------|
| `inputs` / `prompt` | natural language (FLUX) lub tagi (SDXL) | — | — |
| `negative_prompt` | co wykluczyć (tylko SDXL, FLUX ignoruje) | safe kid filter | safe |
| `width`/`height` | px, 512-1024 | 1024 | 1024 |
| `num_inference_steps` | kroki denoising | 4 | 28-30 |
| `guidance_scale` | zgodność z promptem | 3.5 | 7 |
| `seed` | reproducible | random | random |
| `scheduler` | override (rzadko) | default | default |

Wszystko opisane w https://huggingface.co/docs/inference-providers/en/tasks/text-to-image

### Style dla dzieci

- `doodle` — **default**: thick black outline, pastel, white bg, children's book, kawaii. Pasuje do `DottedCard` w PDF.
- `kawaii` — chibi, big eyes (jedzenie, zwierzaki)
- `watercolor` — soft washes (las, ogród)
- `flat` — vector minimal (miasto, pojazdy)
- `clay` — plasticine toy (dinozaury, kosmos)

Każdy styl ma własny `negative_prompt` anty-horror + `SAFE_NEGATIVE` (no text/watermark/scary).

## Szybki start

```bash
cd anim
bun install
# token z https://huggingface.co/settings/tokens/new?ownUserPermissions=inference.serverless.write
echo 'HF_TOKEN=hf_...' > .env

# 1. test API
bun run src/hf-client.ts --test

# 2. podgląd bez API
bun run src/batch.ts --dry --limit 4

# 3. wygeneruj 4
bun run src/batch.ts --limit 4 --model schnell

# 4. pojedynczy
bun run src/generate.ts --subject "cute owl with big eyes" --theme las --style doodle --out assets/output/owl.png

# 5. manifest
bun run src/manifest.ts
```

Output: `assets/output/*.png` + `assets/manifest.json` (id, prompt, bytes, latency, error).

## Konfiguracja

`.env`:
```
HF_TOKEN=hf_REDACTED_TOKEN
HF_PROVIDER=auto
```

Przełącznik env jest czytany w `hf-client.ts::getClient()`. Model/provider można też nadpisać flagami CLI (`--model dev --provider fal-ai`).

## Integracja z logopedia

- **Tematy**: `src/lib/pdf/themes/catalog.ts` (14 tematów, 8 pilot). Pilot prompty mapują 1:1 na `hero-*` + słowa z `wordPools.ts`.
- **Słowa**: `promptForWord("SOWA", "las", "syczacy")` generuje fallback gdy brak `wordSvg` w `src/lib/pdf/icons.tsx`.
- **PDF**: wygenerowane PNG → `<img src={dataUri|url}>` w `src/lib/pdf/templates/*.tsx`. Rozmiar docelowy 1024 → skaluj w szablonie do 180px, białe tło już w prompcie (EKO ok).
- **Galeria web**: `src/components/pdf/GalleryWithFilters.tsx` — można podpiąć jako thumbnail.

## Koszty

- Pilot 16 × schnell = **~$0.05**
- Pełne 56 tematycznych × schnell = ~$0.17
- Hero final 16 × dev = ~$0.40

Free tier HF: $0.10 (free user), $2.00 (PRO) miesięcznie na start.

## API key — bezpieczeństwo

Token fine-grained `kalmarlogopedia` (hf_GbA...) ma `inference.serverless.write`. **Nie commituj `.env`**. `.gitignore` już go wyklucza. Do produkcji użyj `HF_TOKEN` z Vercel env lub `process.env.HF_TOKEN`.

Jeśli token wycieknie: https://huggingface.co/settings/tokens → Revoke + nowy.

## Struktura

```
anim/
  src/
    config.ts      # modele, providerzy, THEME_STYLE_HINT
    prompts.ts      # STYLE_PRESETS, buildPrompt, PILOT_PROMPTS
    hf-client.ts    # generateImage() + --test
    batch.ts        # batch runner + manifest
    generate.ts     # single CLI
    manifest.ts     # podgląd manifestu
  assets/
    output/         # PNG + .gitkeep
    manifest.json   # rejestr
  INSTRUKCJE.md    # iteracje krok po kroku
  README.md         # ten plik
  AGENTS.md         # kontrakt DOX
```

## Troubleshooting → patrz INSTRUKCJE.md §7

Najczęstsze: `401` (token), `429` (zwiększ DELAY_MS), `503 loading` (cold start 30s), `410 deprecated` (użyj SDK, nie api-inference.huggingface.co).
