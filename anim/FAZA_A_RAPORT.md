# FAZA A — raport 2026-09-08

## Wykonane

- 14/14 hero cover (1024 schnell, nscale) — 730K-1.4M każdy, 4.2-4.8s, style per temat
  - kosmos doodle, zwierzaki doodle, pojazdy doodle, ocean doodle, dinozaury doodle, las watercolor, jedzenie kawaii, sport flat, **dom flat, ubrania kawaii, pogoda watercolor, muzyka flat, ogrod watercolor, miasto flat** — 6 nowych
- 28/28 word canonical (1024 doodle/kawaii) — 202K-1.1M, single centered white bg, reużywalne
  - TOP20 missing: MIS/TOR/LAS/ROG/SZKLO/KOSZYK/SCI ANA/CZAJNIK/ROBOT/KRATER/KORONA/RYS/ZAJAC/ZUBR/SZYNSZYLA/CIENIE/CYKL/SZUM/ZYLA/CZAPLA
  - plus 8 pilot: SOWA/RAKIETA/SZOP/REKIN/SAMOCHOD/SER/RYBA/SZYSZKA
- 1 test owl 512
- Razem 43 PNG, manifest 42 OK, koszt ~$0.126 (42×$0.003)
- Copy do `public/anim/heroes/` + `public/anim/words/` — gotowe do `<img src>` w PDF/web
- Kredyty HF: uzupełnione, auto provider nscale działa 4.2-4.8s, brak 429

## Gdzie użyć

- `src/lib/pdf/templates/themed.tsx` — PageHeader heroLetter → zamień na `<img src={heroDataUri[theme]}>` (14 heroes)
- `WordBubble` iconSrc — `wordToDataUri()` fallback → jeśli brak wordSvg, użyj `/anim/words/word-${w}.png` dataURI (28 words pokrywa ~30% slotów, reszta litera)
- `src/components/pdf/GalleryWithFilters` — thumbnail hero

## Następny krok — Faza B (propozycja)

- 30 kolejnych TOP missing (CZAPLA 2, JARZABEK 2, JASKINIA 2, CZOLG 2, JEZ 2, SCIEZKA 2, CIEN 2, RANA 2, BUS 2, SZOSA 2, ZOLTY 2, GARAZ 2, TRAKTOR 2, SOL 2, SLEDZ 2, CISZA 2, OSIKA 2, ZUK 2, SCIO LKA 2, SWIT 2 ...) — $0.09
- Potem Faza C — pozostałe 230 words $0.69 — komplet 359
- Opcjonalnie dev hero dla druku final (14×$0.025=$0.35) — porównaj schnell vs dev w PDF wydruku

## Komendy

```bash
cd anim
bun run src/batch.ts --limit 42 --model schnell # już done, SKIP
# Faza B — dopisz kolejne 30 do PILOT_PROMPTS i:
bun run src/batch.ts --limit 72 --model schnell
# pojedynczy test
bun run src/generate.ts --subject "cute heron" --out assets/output/test.png
```

## Integracja test

```ts
// src/lib/pdf/assets/heroes.ts
import fs from "node:fs";
export const heroDataUri = (theme:string) => {
  const p = `public/anim/heroes/hero-${theme}__*.png`;
  const buf = fs.readFileSync(p);
  return `data:image/png;base64,${buf.toString("base64")}`;
};
```
