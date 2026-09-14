# INSTRUKCJE — kolejne iteracje generowania

> Folder `anim/` to pipeline obrazków dla kart logopedycznych. Centralny plik: `src/batch.ts` + `src/prompts.ts`.

## 1. Szybki start (ponów po przerwie)

```bash
cd anim
bun install               # pierwszy raz
cp .env.example .env      # wstaw HF_TOKEN
# test tokena + 1 obrazek
bun run src/hf-client.ts --test
# dry-run: podgląd promptów bez API
bun run src/batch.ts --dry --limit 4
# prawdziwy batch (4 pierwsze)
bun run src/batch.ts --limit 4 --model schnell
# cały pilot (16 hero + word)
bun run src/batch.ts --model schnell
# wariant jakościowy (wolniej, drożej, lepiej)
bun run src/batch.ts --model dev --limit 4
```

## 2. Workflow iteracji

Każda iteracja = **temat × szereg × styl**. Kroki:

1. **Dodaj prompt** w `src/prompts.ts` → tablica `PILOT_PROMPTS` lub nowa `NEXT_PROMPTS`.
   ```ts
   { id: "word-XYZ", word: "XYZ", subject: "cute ...", theme: "kosmos", style: "doodle" }
   ```
2. **Dry run** — sprawdź czy prompt brzmi naturalnie (FLUX lubi zdania, SDXL tagi):
   ```bash
   bun run src/batch.ts --dry --limit 10
   ```
3. **Batch test** — 2-4 obrazki na nowym modelu:
   ```bash
   bun run src/batch.ts --limit 2 --model schnell --style doodle
   ```
4. **Review** — otwórz `assets/output/` i `assets/manifest.json`. Odrzuć: scary, deformed, text w środku, photorealistic.
5. **Regeneruj** — usuń wadliwy plik i ponów (skrypt pomija istniejące >50KB, więc usuń ręcznie):
   ```bash
   rm assets/output/word-SOWA__doodle__schnell.png
   bun run src/batch.ts --limit 4
   ```
6. **Commit** — dodaj udane do git LFS lub skopiuj do `public/anim/` dla PDF.

## 3. Strategie na brakujące tematy

| Sesja | Tematy | Co robić |
|-------|--------|----------|
| Sesja 1 (gotowe) | kosmos, zwierzaki, pojazdy, ocean | hero 4 + word 8 — już w PILOT_PROMPTS |
| Sesja 2 (gotowe) | dinozaury, las, jedzenie, sport | hero 4 + word 4 — już w PILOT_PROMPTS |
| Sesja 3 (NEXT) | dom, ubrania, pogoda, muzyka | dopisz 8 promptów do `PILOT_PROMPTS`, użyj `style: "kawaii"` dla ubrań |
| Sesja 4 | ogrod, miasto + poziomy | dopisz 4 hero, testuj `style: "watercolor"` dla ogrod, `"flat"` dla miasto |

Dla każdego nowego słowa z `src/lib/pdf/themes/wordPools.ts` użyj helpera:
```ts
import { promptForWord } from "./prompts.js";
const { prompt, negative_prompt } = promptForWord("SŁOŃ", "zwierzaki", "syczacy", "doodle");
```

## 4. Modele i kiedy ich używać

| Cel | Model | Provider | Koszt | Kiedy |
|-----|-------|----------|-------|-------|
| szybki draft / 100+/dzień | `schnell` | `fal-ai` / `auto` | $0.003 | iteracja, burza mózgów |
| final hero / okładka | `dev` | `fal-ai` | $0.025 | publikacja, druk |
| kreskówka z LoRA | `sdxl` | `together` | $0.003 | styl anime, booru |
| totalnie za darmo (wolno) | `sdxl-turbo` | `hf-inference` | ~$0 | test bez karty |

Przełącznik: `bun run src/batch.ts --model dev --provider fal-ai`

## 5. Style — który wybrać

- `doodle` — **domyślny**, pasuje do PDF (dashed, pastel, thick outline). Używaj dla 80% kart.
- `kawaii` — dla jedzenie/ubrania/zwierzaki (big eyes).
- `watercolor` — dla las/ogrod/pogoda (miękko).
- `flat` — dla miasto/pojazdy/sport (nowocześnie).
- `clay` — dla dinozaury/kosmos (zabawka 3D, dzieci lubią).

Test: wygeneruj 1 słowo × 3 style i porównaj:
```bash
bun run src/generate.ts --subject "cute pine cone" --theme las --style doodle --out assets/output/test_doodle.png
bun run src/generate.ts --subject "cute pine cone" --theme las --style watercolor --out assets/output/test_water.png
bun run src/generate.ts --subject "cute pine cone" --theme las --style flat --out assets/output/test_flat.png
```

## 6. Integracja z PDF

1. Wygenerowane PNG → skopiuj do `public/anim/{theme}/{word}.png` lub `src/lib/pdf/assets/`.
2. W szablonie `src/lib/pdf/templates/*.tsx` użyj jako `<img src={...}>` z `tw` (Takumi `<img>` wspiera dataURI i URL).
3. Dla EKO: generuj z białym tłem (`white background` już w prompcie), w szablonie `ekoBg()`.
4. Optymalny rozmiar do PDF A4: 1024×1024 → skaluj w szablonie do ~180px (`tw="w-[180px] h-[180px]"`).

## 7. Troubleshooting

| Objaw | Przyczyna | Fix |
|-------|-----------|-----|
| `401 Unauthorized` | zły HF_TOKEN | wygeneruj nowy fine-grained z `inference.serverless.write` |
| `410 model deprecated` | stary endpoint | użyj `@huggingface/inference` (router), nie `api-inference.huggingface.co` |
| `429 Too Many Requests` | rate limit | zwiększ `DELAY_MS` w batch.ts, użyj `--limit 2` |
| `model is loading` / `503` | cold start | poczekaj 30-60s i ponów |
| obraz brzydki / scary | prompt za krótki | dodaj `cute, friendly, for children, pastel, white background` |
| tekst w obrazku | FLUX lubi pisać | dodaj `no text, no letters` do negative + usuń słowa z prompta |
| nie można resolve host | brak internetu / DNS | sprawdź `fetch https://router.huggingface.co/v1/models` |

## 8. Koszty — budżet

- Pilot 16 obrazków × schnell = ~$0.05
- Pełna sesja 56 tematycznych kart × schnell = ~$0.17
- 63 slugi × 2 style = ~$0.38
- Druk final jakości 16 hero × dev = ~$0.40

Trzymaj `schnell` do iteracji, `dev` tylko na finał.

## 9. Checklist przed dużą iteracją

- [ ] `HF_TOKEN` ważny (`whoami` 200)
- [ ] `PILOT_PROMPTS` lub nowe prompty dodane
- [ ] `--dry` bez błędów
- [ ] `assets/output` nie zawiera wadliwych PNG (usuń)
- [ ] wybrany model/provider zgodny z budżetem
- [ ] manifest backup (`cp assets/manifest.json assets/manifest.$(date +%F).json`)

## 10. Następny krok — sesja 3

1. Dopisz 8 hero promptów dla dom/ubrania/pogoda/muzyka w `src/prompts.ts`.
2. Dla każdego z 14 tematów wygeneruj brakujące `wordSvg` fallbacki z `wordPools.ts` via `promptForWord()`.
3. Batch 8 hero: `bun run src/batch.ts --limit 8 --model schnell` (dom/muzyka = kawaii, pogoda = watercolor).
4. Review + selekcja 4 najlepszych → skopiuj do `public/anim/`.
5. Podłącz do `src/lib/pdf/templates/themed.tsx` jako `themeHeroImage`.
