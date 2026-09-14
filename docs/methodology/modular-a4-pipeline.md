# Metodyka Modułowa A4 — Karta Logopedyczna jako System

**Wersja:** 2.0 (2026-05-13) · **Zakres:** `src/lib/pdf/*` + `anim/*` + `public/anim/*`  
**Zasada:** jedna kartka A4 = 6 modułów wymiennych (jak klocki LEGO), każdy z kontraktem rozmiaru, koloru i obrazka. Obrazki = pipeline generowania z HF, ale każdy moduł działa też 100% offline via `wordSvg`.

---

## 1. Dlaczego moduły, nie strona monolityczna

Badania z `neurokognitywne-wzorce-templates.md` (§2-4):
- **Cognitive Load:** 6 modułów × 1 zadanie = 6 chunków → w limicie 4-7. Monolit 12 zadań = shutdown.
- **Gestalt proximity:** moduł = grupa (białą przestrzenią 12px), wewnątrz gap 8px. Mózg parsuje moduły, nie piksele.
- **Progressive disclosure:** słabsze dziecko robi M1-M4, mocniejsze +M5-M6. Ten sam `TemplateProps` buduje 2 poziomy trudności bez nowej karty.

## 2. Taksonomia 6 modułów

| Kod | Moduł | Kontrakt (z `design-system.ts:componentSpec`) | Budżet wys. | Obrazki | Tekst |
|-----|-------|-----------------------------------------------|-------------|---------|-------|
| **M1** | `PageHeader` | `rounded 22px, 3px rgba, max 1 badge` | 64px | 1× letter circle | title 20px + subtitle 10px |
| **M2** | `PersonalizationBar` | `IMIE+DATA+ZROBIONE 3 kropki, 1.5 dashed` | 32px | 0 | 2× placeholder 10px |
| **M3** | `HierarchyBar` | `5 kroków UCHO→ZDANIE, active sygnalizowany` | 28px | 0 | 5× pill 7px |
| **M4** | `Hero` | `88px img + story 11px/1.6 + 2 tagi + XP` | 108px | 1× hero 88 + 2× tag icon | story ≤45 słów |
| **M5** | `WordsMandala` | `ColoringTile 8× + MandalaCenter` | 260px | 8× word 36-42 + 1× center | word 11px + P/S/K 6px |
| **M6** | `Exercises` | `MinimalPairs 2×2 lub MovementBox 3 + historyjka` | 180px | 4× mini pair | instrukcja ≤20 słów |
| **M7** | `Closing` | `SelfRating + StickerStrip + FooterBar` | 72px | 4× sticker icon | 8px label |

**Suma:** 744px + `p-5` (40px) + `gap 12px ×5` (60px) = 844px < A4 usable 940px (20mm margin @96dpi). Zapas 96px = `safeZone 10mm` na laminat. **Żaden moduł nie może przekroczyć budżetu** — audyt `auditDesignSystem` sprawdza `layout.moduleBudget`.

## 3. Kontrakt modułu (TypeScript)

```ts
// src/lib/pdf/modules/types.ts
export type ModuleId = "header"|"personalization"|"hierarchy"|"hero"|"words"|"exercises"|"closing";
export type ModuleContract = {
  id: ModuleId;
  heightBudgetPx: number; // max
  imageSlots: number;     // ile <img> w module
  textSlots: { maxWords: number; maxChars: number };
  palette: "series" | "neutral"; // czy używa primary/secondary/accent
  fallback: "wordSvg" | "letter" | "none";
}
```

Każdy template to `ModuleId[]` — np. `syczacy: [M1,M2,M3,M4,M5,M6,M7]`, `plynnosc: [M1,M2,M3,M6,M7]` (bez M4/M5). `themed.tsx` fabryka wstrzykuje `theme` tylko do M4/M5.

## 4. Pipeline obrazków — spójne doświadczenie

### 4.1 Trzy źródła, jeden łańcuch fallback

```
wordToImageSrc(word)
  1) /public/anim/words/${normalized}.png  ← HF 1024 white bg, 72-120KB (preferowane)
  2) wordSvg → dataURI                     ← hand-drawn SVG offline, zawsze dostępne
  3) litera w kółku                         ← ultimate fallback (nigdy broken <img>)
```

W PDF Takumi: `<img src={src || wordToDataUri(word) || letter}>` — zawsze coś wyrenderuje.

### 4.2 Dwa tryby prompta

**Canonical (reuse):** `promptForWordCanonical(word)` → `THEME_STYLE_HINT` = `""`, single centered object, white bg. Jeden PNG na słowo, używany w 14 tematach × 4 szeregi = 56 kart (oszczędność 42k obrazków).

**Themed (hero):** `promptForHero(theme)` + `promptForWord(word, theme)` — cover 1 na temat + 4 warianty słowa w skórce (np. SOWA w kosmosie vs w lesie). Tylko gdy temat wymaga narracji (kosmos, ocean) — inaczej canonical.

### 4.3 Style lock — doodle dla kolorowanki

Z `anim/src/prompts.ts` preset `doodleColoring`:

```ts
doodleColoring: {
  promptSuffix: "doodle coloring book style, thick black outline 2.5px, white interior for coloring, pastel accents only on border, white background, simple shapes, children's book, no shadows, no text",
  negativePrompt: "photorealistic, 3d, gradient shading, dark background, crowded, text, letters, watermark, blurry, extra fingers"
}
```

**Reguły spójności:**
- `1024×1024`, `guidanceScale 3.5`, `steps 4 (schnell)` — szybkie iteracje, koszt $0.003.
- Seed = `hash(word) % 2^32` — deterministyczny, rerun = ten sam obraz.
- White interior → dziecko koloruje; outline 2.5px = grubość kredki (z `tokens.border.image`).
- Negatyw zawsze zawiera `no text, no letters` — FLUX lubi dopisać napis.

### 4.4 Walidacja i manifest

`anim/src/batch.ts` po każdym `generateImage`:

1. `bytes > 50KB` (1024) else retry z innym providerem.
2. Sprawdź `whiteBackgroundRatio > 0.55` (pipette 4 rogi) — jeśli <0.4 → odrzuć (ciemne tło).
3. Zapisz `assets/output/${id}.png` + `assets/manifest.json` `{id, word, theme, prompt, model:"schnell", provider:"fal-ai", bytes, latencyMs, seed, whiteRatio, status:"ok"|"fallback"}`.
4. Kopiuj do `public/anim/words/${word}.png` i `public/anim/hero/hero-${theme}.png` — Next.js serwuje statycznie, Takumi fetchuje bez CORS.
5. `wordToDataUri` automatycznie użyje PNG gdy istnieje (HEAD 200), inaczej SVG.

Koszt: 8 słów × 14 tematów × $0.003 = $0.34 za pełny temat, cała baza 112 słów canonical = $0.34.

### 4.5 Moduł a obrazek

| Moduł | Slot | Źródło | Rozmiar w PDF |
|-------|------|--------|---------------|
| M4 hero 88 | 1× cover | `hero-${theme}__doodle__schnell.png` 1024 → 88px | border `2.5px solid primary` |
| M5 words | 8× | `words/${w}.png` 1024 → 36-42px lub `wordSvg` 48 viewBox | border `2px solid accent` + `3px solid #1A1A2E` dla `ColoringTile` |
| M6 pairs | 4× mini | `wordSvg` 24px (wystarczy) | `1.2px solid border` |
| M7 stickers | 4× | `wordSvg` lub doodleMark `*` | `2px dashed accent` |

**Zasada:** M4/M5 = duże obrazki (HF warto), M6/M7 = małe SVG (szybkie, bez kosztu).

## 5. Budowa karty z modułów (kod)

```tsx
// src/lib/pdf/templates/syczacy.tsx — przykład
<div tw="flex flex-col p-5" style={{background: eko? "#FFF": c.paper}}>
  <Module id="header" height={64}><PageHeader .../></Module>
  <Module id="personalization" height={32}><PersonalizationBar .../></Module>
  <Module id="hierarchy" height={28}><HierarchyBar accent={c.primary} .../></Module>
  <Module id="hero" height={108}><HeroTile img={heroSrc} .../></Module>
  <Module id="words" height={260}>
    <WordsMandala words={words} accent={c.primary} /> {/* 8× ColoringTile + MandalaCenter */}
  </Module>
  <Module id="exercises" height={180}><DottedCard>...</DottedCard></Module>
  <Module id="closing" height={72}><SelfRating/>+<StickerStrip/></Module>
  <FooterBar .../>
</div>
```

`themed.tsx` różni się tylko `heroSrc = heroPath(theme)` i `words = getWords(theme, szereg)` — ta sama siatka modułów.

## 6. Governance — jak nie dopuścić do dryfu

1. **Audit co build:** `auditDesignSystem({seriesId, colorsUsed, wordsCount, imagesCount, hasPersonalization...})` + nowy `imageAudit({missingWords: string[], whiteRatioFails: string[]})` — `warn` gdy >4 kolory, `error` gdy words ≠8 lub `hasPersonalization===false`.
2. **Manifest gate:** `bun run anim/src/batch.ts --dry --limit 20` przed PR — jeśli `prompt` bez `white background` → fail.
3. **Visual regression:** `bun --bun -e "render(syczacy, {eko:false})"` → PNG snapshot + pixel diff `public/__snapshots__/syczacy.png` (threshold 2%).
4. **AGENTS.md update:** każdy nowy moduł = wpis w `Child DOX Index` + aktualizacja `layout.moduleBudget`.

## 7. Plan wdrożenia (4 kroki)

**Krok 1 — Pilot `syczacy` (zrobiony):** `ColoringTile+MandalaCenter` zamiast grid 4×2, hero 88 bez zmian. Zweryfikować 8-10 min sesji z 3 dzieci.

**Krok 2 — Moduł `Module` wrapper + `layout.moduleBudget` w `design-system.ts`:** dodać `tokens.layout.module` + typ `ModuleContract`. Refactor `shared.tsx` → eksport `Module` (padding/gap/border per moduł).

**Krok 3 — Pipeline HF canonical:** wygenerować 112 słów canonical `doodleColoring` × FLUX schnell, wgrać do `public/anim/words`, ustawić `wordToImageSrc` priorytet PNG.

**Krok 4 — Propagacja na 56 tematycznych:** `themed.tsx` podmienia M4/M5 na `WordsMandala`, reszta bez zmian. Batch `bun run batch --limit 56 --model schnell --style doodleColoring`.

---

**Plik referencyjny:** `docs/research/neurokognitywne-wzorce-templates.md` §2-6.  
**Źródła obrazków:** `anim/src/prompts.ts:STYLE_PRESETS doodle/doodleColoring`, `anim/src/config.ts:MODELS schnell`.
