# Current Session — 2026-09-14 (weryfikacja + 5 nowych gier + kreator v2 + 2-5 A4)

## Goal
Zbudować 5 różnych propozycji template kolejnych, rozbudować kreator z taste, push na Vercel i Logopedic-axi. Zweryfikować stan wszystkich 84 templates (produkcyjny remake). **Rozbudować karty do pełnych 2-5 A4** (CR użytkownika 2026-09-14).

## Deliverables 2026-09-14

### 5 nowych szablonów gier (gry-nowe)
- `labirynt` (75080B 2p), `memory` (72390B 2p), `wyszukiwanka` (84658B 2p), `kodowanie` (68516B 2p), `historyjka` (67053B 2p) — każdy **2 A4**, dodle, EKO, XP, >50KB PASS. Zarejestrowane w `index.ts:12` (BaseSlug 16).
- Design read: print A4 dla 4-7 lat, playful editorial, dodle pastel+vivid, VARIANCE 7 / MOTION 3 / DENSITY 4 — bez AI slop.

### 3 nowe tematy
- `hawaje` (watercolor), `halloween` (kawaii), `minecraft` (flat) — `catalog.ts:5` ThemeId 14→17, `THEMES` 17, `PILOT_THEMES` 17, `wordPools.ts:440` pule P/S/K, `THEME_STYLE_HINT` + `PILOT_PROMPTS` hero + HF PNG 0.5-1.1MB via `fal-ai/nscale`.

### Themed v2 print (krytyka hawaje) → v3 multi-page 2-5 A4
- `themed.tsx` full remake: mandala mała usunięta (osobna A5), karty 48→64px + kropki prób, pary minimalne pełna szerokość 48px, ruch full-width, zdania z liniami MOJE ZDANIE, pętla nagrody spójna `Zrob 8 slow - Zdobadz XP - Wez naklejke`, DLA DOROSŁEGO 7px osobno, font fix ★→* / →→- / —→-.
- **2026-09-14 rozbudowa 2-5 A4**: `themed.tsx` podzielony na **3 strony A4** z `breakAfter: page`:
  - Str 1: Header + Personalizacja + Hero + 8 słów 64px + legend
  - Str 2: Pary minimalne 48px + Ruch + Zdania x3 + DLA DOROSŁEGO
  - Str 3: Mandala pełna 180px (skupienie 2 min) + Pętla nagrody + Samoocena + Naklejki
- Bajty 105k-109k, **3p** dla 68 tematycznych (wcześniej 2p, teraz 3p — w zakresie 2-5).

### Base szeregi remake → 3 A4
- `syczacy/szumiacy/ciszacy/rotacyzm` — przeniesiono logikę v2: karty 48→64, gap 2.5→3, border 2px minHeight 128, dots 3 + dashed pieczątka, legenda, `breakAfter` strona 1 po słowach, strona 2 po historyjce, mandala duża 180px strona 3. **102k/89k/81k/75k, 3p** (wcześniej 71-92k 2p, teraz pełne 3 A4).
- `plynnosc/oddech/planszowka` — dodano strona 2: `STRONA 2 - poćwicz jeszcze` + rysunek 140px + MOJE SŁOWA + XP, **2p** (plynnosc 89k, oddech 95k, planszowka 107k).

### HF PNG pipeline
- `serverImages.ts:17` cache `public/anim/words/*.png` → dataURI, `route.ts:57` resolveWordImages dla `parseThemedSlug`, `themed.tsx:26` `images` prop + `imgFor(w)=images[w] ?? wordToDataUri(w)`.

### Kreator v2 + Gallery
- `kreator/page.tsx:1` sticky left 360px + right filtry, cat `gry-nowe`, search q, batch window.open, preview iframe 640px. `GalleryWithFilters.tsx:9` cat `gry-nowe`, HERO_STYLE 17, licznik 84. `page.tsx:20` 84 szablony.

### Deploy
- Vercel prod `https://logopedia-eosin.vercel.app` + `...m1p4882bh...` — `vercel --prod --yes` 1m, build FIX `build-deliverable.ts:12` import.meta.dir → process.cwd, PASS 10.5s. Curl ` /api/pdf/labirynt?name=Ania` 200 75KB 2p, `/api/pdf/syczacy-hawaje` 200 105KB 3p.
- GitHub `Cooliber/Logopedic-axi` — `git filter-branch` redact `hf_GbA...` → `hf_REDACTED_TOKEN`, `git push --force` (8a82f17 init, d5891ff deploy, 7f834a5 5 gier, 0ff0749 fix TS, 29840b6 weryfikacja) — secret scanning PASS.

## Weryfikacja wszystkich 84 templates (2026-09-14 audit, 2-5 A4)

Script: `render` z `googleFonts` 16 subsets → `/tmp/all_{slug}.pdf` → `pdf-lib` count `/Type /Page`, `auditDesignSystem`.

- **TOTAL 84 OK 84 FAIL 0** — wszystkie >50KB, brak `No registered font covers`.
- **Strony**: 72×3p + 9×2p + 3×1p = **84** (2-5 zakres spełniony dla ćwiczeniowych)
  - 3p (72): 4 base szeregi (syczacy 102k, szumiacy 89k, ciszacy 81k, rotacyzm 75k) + 68 tematycznych (93k-109k, np. syczacy-hawaje 105k, rotacyzm-minecraft 99k)
  - 2p (9): dialog 89k + 5 gier (labirynt 75k, memory 72k, wyszukiwanka 84k, kodowanie 68k, historyjka 67k) + plynnosc 89k + oddech 95k + planszowka 107k
  - 1p (3): dyplom 58k, katalog 113k, naklejki 100k — **nagrody/sklep celowo 1p** (do wycięcia/dyplom)

### Szczegółowy stan

| Slug | Str | Bytes | W | M | Status |
|---|---|---|---|---|---|
| syczacy | 3 | 102477 | 64 | M* | OK — **v3 multi-page 3p** (remake zrobiony 2026-09-14, wcześniej REMAKE) |
| szumiacy | 3 | 89577 | 64 | M* | OK — v3 3p |
| ciszacy | 3 | 81237 | 64 | M* | OK — v3 3p |
| rotacyzm | 3 | 75524 | 64 | M* | OK — v3 3p |
| plynnosc | 2 | 89579 | 64 | - | OK — **rozbudowa 2p** (str2 rysunek) |
| oddech | 2 | 95969 | 64 | - | OK — 2p |
| planszowka | 2 | 107126 | - | - | OK — 2p |
| dialog | 2 | 89695 | - | - | OK — 2p (już) |
| dyplom | 1 | 58035 | - | - | OK — 1p celowo |
| katalog | 1 | 113466 | - | - | OK — 1p celowo |
| naklejki | 1 | 100857 | - | - | OK — 1p celowo |
| labirynt | 2 | 75080 | - | - | OK — v2 2p (str2 wyzwanie) |
| memory | 2 | 72390 | 64 | - | OK — 2p |
| wyszukiwanka | 2 | 84658 | - | - | OK — 2p |
| kodowanie | 2 | 68516 | - | - | OK — 2p |
| historyjka | 2 | 67053 | 64 | - | OK — 2p |
| tematyczne 68 | 3 | 93k-109k | 64 | M* | OK — **v3 3p** dla 68 (wcześniej v2 2p, teraz 3p) |

*M=mandala string w pliku (komentarz), W=word img size

### Wniosek weryfikacji (aktualny)

- **0 templates wymaga remake** — 4 base szeregi **zrobione** 2026-09-14 (3p, v2+v3). Poprzedni REMAKE 4 już nieaktualny.
- **81 templates prod gotowe ćwiczeniowe (2-3p)**: 4 base + 68 tematycznych (3p) + 9 (2p: dialog+5 gier+3) = **81 w zakresie 2-5**.
- **3 templates celowo 1p**: dyplom/katalog/naklejki (nagrody/sklep) — nie ćwiczeniowe, 1p jest prawidłowe.
- **Blokery build usunięte**: `scripts/build-deliverable.ts:12` fix + `bun.lock` v2 ignored, Vercel PASS. `themed.tsx` font fix PASS.

## Blind spots / next (po 2-5 A4)

- ZIP batch endpoint `/api/pdf/zip` — kreator zamiast multi-tab (forward-look #2) — teraz ważniejszy bo 3p PDF większe (pakiet 84×3p ~9MB).
- Playwright E2E + visual regression dla 84 slugów × strony (forward-look #3) — sprawdzić paginację 3p na wydruku.
- Twemoji image pipeline (forward-look #1).
- Local font fallback offline (forward-look #4).
- Ewentualnie `dyplom`/`naklejki` zostać 1p lub rozważyć 2p z instrukcją laminowania (niski prio).

## Resume

Next: ZIP + E2E. Biblioteka 84 jest **jednolicie produkcyjna** w standardzie 2-5 A4: 81 ćwiczeniowych 2-3p + 3 nagrody 1p. Poprzedni dług 4 base szeregów spłacony 2026-09-14 (3p). Do druku: strona 1 słowa, strona 2 ćwiczenia, strona 3 mandala+reward — laminuj każdą stronę osobno.

Evidence: `/tmp/pages2.json` (72×3p 9×2p 3×1p), `bun run build` 10.5s PASS, `vercel --prod` 1m aliased, `gh repo view Cooliber/Logopedic-axi` 29840b6, pdf curl 200 75KB 2p / 105KB 3p.
