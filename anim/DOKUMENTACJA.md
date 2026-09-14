# DOKUMENTACJA — możliwości Hugging Face Inference Providers dla logopedia

> Stan na 2026-09-07, źródła: `huggingface.co/docs/inference-providers`, cenniki fal.ai / replicate / together, test live z tokenem `kalmarlogopedia`.

## 1. Architektura

```
anim/src/prompts.ts  → buildPrompt({subject, theme, style})
        ↓ prompt + negative_prompt
anim/src/hf-client.ts → InferenceClient.textToImage({model, provider, inputs, parameters})
        ↓ Blob
anim/assets/output/*.png + manifest.json
        ↓
src/lib/pdf/templates/themed.tsx → <img src={dataUri|url}>
```

HF **Inference Providers** to proxy: twój `HF_TOKEN` → `router.huggingface.co` → wybrany provider (fal-ai / replicate / together / nscale / hf-inference) → GPU → PNG bytes. Billing przez HF (bez marży) lub bezpośrednio u providera jeśli ustawisz własny klucz.

Stary `api-inference.huggingface.co` jest **deprecated** (410). Używaj wyłącznie SDK `@huggingface/inference`.

## 2. Modele — pełna lista zweryfikowana

| Model ID | Typ | Kroki | VRAM | Licencja | Koszt (fal/replicate) | Zastosowanie logopedia |
|----------|-----|-------|------|----------|----------------------|------------------------|
| `black-forest-labs/FLUX.1-schnell` | DiT 12B flow | 4 | 12GB (FP8) | Apache-2.0 **komercyjny OK** | **$0.003** | **default — drafts, batch 100+/d** |
| `black-forest-labs/FLUX.1-dev` | DiT 12B | 28 | 24GB | Non-commercial (via API OK) | $0.025 | final hero, tekst w obrazku |
| `black-forest-labs/FLUX.1-Krea-dev` / `FLUX.2-klein` | DiT | 28 | 13GB | Apache-2.0 | $0.025 | alternatywa dev |
| `stabilityai/stable-diffusion-xl-base-1.0` | U-Net 3.5B | 30 | 8GB | Open RAIL++M **komercyjny OK** | $0.003 | LoRA, cartoon, tag-style |
| `stabilityai/sdxl-turbo` | distilled | 4 | 8GB | Open RAIL++M | $0.003 | real-time, szybki |
| `stabilityai/stable-diffusion-2-1` | U-Net | 30 | 4GB | Open RAIL++M | $0.002 | fallback 512px |
| LoRA: `Norod78/once-upon-a-time-cartoon-style-flux-v3` | FLUX LoRA | 4-28 | — | — | — | bajkowy cartoon (future) |
| LoRA: `furaidosu/flux-cubist-cartoon` | FLUX LoRA | — | — | — | — | cubist cartoon (future) |

Wybór: `src/config.ts` → `MODELS`. Dla logopedia **schnell = 80%** zadań, **dev = 20% final**.

### FLUX vs SDXL — kiedy co

- **FLUX**: natural language (`"a cute owl with big eyes, watercolor"`), lepsze prompt adherence, tekst w obrazku działa, bez `negative_prompt` (ignorowany). Idealny dla hero images z opisem sceny.
- **SDXL**: tag-style (`"masterpiece, cute owl, big eyes, pastel, (white background:1.2)"`), wymaga `negative_prompt` (`blurry, deformed, text, watermark`), ogromny ekosystem 5000+ LoRA na Civitai (postacie, style). Idealny dla word icons gdy potrzebna spójna postać.

## 3. Providerzy — szczegóły techniczne

| Provider | Obsługuje text-to-image | Cold start | Billing | Free | Limit concurrent (default) |
|----------|-------------------------|------------|---------|------|---------------------------|
| `fal-ai` | ✅ (600+ modeli) | **1-3s** (warm pool) | per image / per MP | $10 | 25 |
| `replicate` | ✅ (30k+ modeli) | 8-15s | per GPU-second (A100 $0.0023/s) | $5 | 10 |
| `together` | ✅ | 2-4s | per image | $1 | 10 |
| `nscale` | ✅ (FLUX) | ~4s | per image | — | — |
| `hf-inference` | ✅ (SDXL, CPU) | zmienna | compute seconds | $0.10/mo | rate-limited |
| `auto` | failover | auto | auto | — | — |

Auto wybiera pierwszego dostępnego wg twojej kolejności: https://hf.co/settings/inference-providers

**Rekomendacja logopedia:**
- `schnell/dev + fal-ai` — najtaniej i najszybciej (nasz test: nscale auto ≈4.5s/1024).
- `sdxl + together` — najtaniej dla SDXL ($0.0033).
- Fallback chain w kodzie: `auto` (fal-ai → nscale → replicate).

Cennik szczegółowy (lipiec 2026):
- fal.ai: Schnell $0.003, Dev $0.025, Pro $0.05, SDXL $0.003
- replicate: Schnell $0.003, Dev $0.03, SDXL $0.005
- HF PRO: $9/mo → $2 kredyty + 20× więcej included

## 4. API — specyfikacja

```
POST https://router.huggingface.co/hf-inference/models/{modelId}
Headers: Authorization: Bearer hf_..., Content-Type: application/json
Body: {
  inputs: string,          // prompt (required)
  parameters: {
    negative_prompt?: string,
    width?: 512-1024,
    height?: 512-1024,
    num_inference_steps?: number,
    guidance_scale?: number,  // FLUX 3.5, SDXL 7
    seed?: number,
    scheduler?: string
  }
}
Response: raw image bytes (PNG/JPEG) lub JSON {error}
```

JS SDK (zalecane):
```ts
import { InferenceClient } from "@huggingface/inference";
const client = new InferenceClient(process.env.HF_TOKEN);
const blob = await client.textToImage({
  model: "black-forest-labs/FLUX.1-schnell",
  provider: "fal-ai", // lub undefined → auto
  inputs: "cute doodle owl, pastel, white background",
  parameters: { width: 1024, height: 1024, num_inference_steps: 4, guidance_scale: 3.5 }
});
const buf = Buffer.from(await blob.arrayBuffer());
```

## 5. Style i prompt engineering

5 stylów w `src/prompts.ts` → `STYLE_PRESETS`:

| Styl | Prompt suffix | Negative | Gdy używać |
|------|---------------|----------|------------|
| `doodle` | hand-drawn, thick black outline, pastel, white bg, children's book, kawaii | photorealistic, dark, scary, text... | **default 80%** |
| `kawaii` | chibi, big eyes, sticker, pastel | realistic, horror, dark | jedzenie, ubrania, zwierzaki |
| `watercolor` | soft washes, white paper, brush strokes | photorealistic, plastic, glossy | las, ogród, pogoda |
| `flat` | vector minimal, geometric, clean | photorealistic, shadows, 3d | miasto, pojazdy, sport |
| `clay` | plasticine, rounded, toy-like | scary, photorealistic human | dinozaury, kosmos |

**Zasady promptów:**
- FLUX: zdania (`"a cute smiling shark swimming over coral, not scary"`). SDXL: tagi + wagi (`"(cute shark:1.3), coral, pastel"`).
- Zawsze: `cute, for children, friendly, white background`. Nigdy: `text, letters, watermark, scary`.
- Theme hint z `THEME_STYLE_HINT` (np. kosmos → `space, rockets, planets, stars, deep navy and purple`).
- Negatyw: `SAFE_NEGATIVE` = `no text, no letters, no words, no watermark, no scary...` — FLUX ignoruje, ale zabezpiecza SDXL.

Przykład hero-kosmos:
```
a cute friendly rocket with big eyes flying among smiling planets and stars for children,
in a space, rockets, planets, stars, deep navy and purple setting,
doodle style, hand-drawn, thick black outline, pastel colors, white background,
simple shapes, children's book illustration, kawaii, friendly, no shadows
```

## 6. Przepływ batch i koszty

```
bun run src/batch.ts [--dry] [--limit N] [--model schnell|dev|sdxl] [--style doodle] [--provider fal-ai]
```

- `--dry` — tylko podgląd promptów + manifest bez API (bez kosztu).
- `--limit` — ile z PILOT_PROMPTS (16) wygenerować.
- Idempotent: pomija pliki >50KB, więc ponów po usunięciu wadliwego.
- Rate limit: 1200ms między requestami, 429 → 10s backoff.
- Manifest: `assets/manifest.json` + `assets/output/*.png`.

Koszty (nasz test 2026-09-07):
- 8 hero × 1024 schnell via nscale = 4.3-4.8s każdy, średnio 460ms? faktycznie 4500ms, ~$0.024.
- 1 test 512 schnell = 4.6s, $0.003.
- Free tier $0.10 starcza na ~33 schnell lub 4 dev. Po wyczerpaniu: dokup kredyty (https://huggingface.co/settings/billing) lub PRO ($9 → $2 credits).

Szacunki pełne:
- 63 slugi × schnell = $0.19
- 63 slugi × dev = $1.58
- 63 × 2 style schnell = $0.38

## 7. Integracja z PDF (Takumi)

1. PNG 1024 → `public/anim/{theme}/{word}.png` lub `src/lib/pdf/assets/`.
2. W szablonie Takumi: `import img from "@/public/anim/kosmos/rocket.png"` lub dataURI `fs.readFileSync(...).toString("base64")`.
3. Komponent: `<img src={dataUri} tw="w-[180px] h-[180px] rounded-[12px]" />` — Takumi `<img>` wspiera url i dataURI.
4. EKO: `ekoBg("#FFFFFF", eko)` — prompt już ma white bg, więc EKO bez zmian.
5. Rozmiar w PDF: 1024→180px daje 300dpi na 1.5" — idealne do laminowania.

## 8. Troubleshooting (z testów live)

| Błąd | Znaczenie | Fix |
|------|-----------|-----|
| `401` | zły token | nowy fine-grained z `inference.serverless.write` |
| `410 deprecated` | stary endpoint | użyj `@huggingface/inference`, nie `api-inference.huggingface.co` |
| `429` | rate limit | zwiększ DELAY_MS, `--limit 2` |
| `503 model is loading` | cold start | poczekaj 30-60s |
| `depleted credits` | koniec free $0.10 | billing → kup kredyty lub PRO |
| `Could not resolve host` | offline/DNS | sprawdź `fetch https://router.huggingface.co/v1/models` |
| obraz scary/photoreal | prompt za krótki | dodaj `cute, friendly, for children, pastel` |

## 9. Następne kroki (łącznie z INSTRUKCJE.md)

- Sesja 3: dom/ubrania/pogoda/muzyka — dodaj 8 hero do `PILOT_PROMPTS`, style kawaii/watercolor, batch schnell.
- Słowa: `promptForWord()` dla brakujących `wordSvg` w `wordPools.ts` (min 12 słów P/S/K per temat).
- LoRA: przetestuj `Norod78/once-upon-a-time-cartoon-style-flux-v3` dla bajkowego stylu (wymaga provider fal-ai z LoRA support).
- Optymalizacja: migracja manifestu do `src/lib/pdf/assets/manifest.json` i automatyczne podpięcie do `wordToDataUri()`.

## 10. Źródła

- https://huggingface.co/docs/inference-providers/en/index
- https://huggingface.co/docs/inference-providers/en/tasks/text-to-image
- https://huggingface.co/docs/huggingface.js/en/inference/README
- https://huggingface.co/black-forest-labs/FLUX.1-schnell
- https://huggingface.co/docs/inference-providers/en/pricing
- https://fal.ai/docs/documentation/model-apis/pricing + https://www.teamday.ai/blog/ai-api-pricing-comparison-2026
