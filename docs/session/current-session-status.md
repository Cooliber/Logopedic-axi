# Current Session — 2026-09-14 (weryfikacja + 5 nowych gier + kreator v2)

## Goal
Zbudować 5 różnych propozycji template kolejnych, rozbudować kreator z taste, push na Vercel i Logopedic-axi. Zweryfikować stan wszystkich 84 templates (produkcyjny remake).

## Deliverables 2026-09-14

### 5 nowych szablonów gier (gry-nowe)
- `labirynt` (72808B), `memory` (70013B), `wyszukiwanka` (82469B), `kodowanie` (65934B), `historyjka` (64511B) — każdy A4, dodle, EKO, XP, >50KB PASS. Zarejestrowane w `src/lib/pdf/templates/index.ts:12` (BaseSlug 16).
- Design read: print A4 dla 4-7 lat, playful editorial, dodle pastel+vivid, VARIANCE 7 / MOTION 3 / DENSITY 4 — bez AI slop (bez purple glow, bez 3 równych kart).

### 3 nowe tematy
- `hawaje` (watercolor), `halloween` (kawaii), `minecraft` (flat) — `catalog.ts:5` ThemeId 14→17, `THEMES` 17, `PILOT_THEMES` 17, `wordPools.ts:440` pule P/S/K, `THEME_STYLE_HINT` + `PILOT_PROMPTS` hero + HF PNG 0.5-1.1MB via `fal-ai/nscale` (FLUX schnell $0.003).

### Themed v2 print (krytyka hawaje)
- `themed.tsx` full remake: mandala mała usunięta (osobna A5), karty 48→64px + kropki prób, pary minimalne pełna szerokość 48px obrazki, ruch full-width, zdania z liniami MOJE ZDANIE, pętla nagrody spójna `Zrob 8 slow - Zdobadz XP - Wez naklejke`, DLA DOROSŁEGO 7px osobno, font fix ★→* / →→- / —→- (Takumi 9205x PASS).

### HF PNG pipeline
- `serverImages.ts:17` cache `public/anim/words/*.png` → dataURI, `route.ts:57` resolveWordImages dla `parseThemedSlug`, `themed.tsx:26` `images` prop + `imgFor(w)=images[w] ?? wordToDataUri(w)`.

### Kreator v2
- `src/app/kreator/page.tsx:1` sticky left 360px + right filtry, cat `gry-nowe`, search q, batch window.open, preview iframe 640px. `GalleryWithFilters.tsx:9` cat `gry-nowe`, HERO_STYLE 17, licznik 84. `page.tsx:20` 84 szablony.

### Deploy
- Vercel prod `https://logopedia-eosin.vercel.app` (aliased) + `https://logopedia-m1p4882bh-...vercel.app` — `vercel --prod --yes` 1m, build FIX `scripts/build-deliverable.ts:12` import.meta.dir → process.cwd, PASS 10.5s. Curl ` /api/pdf/labirynt?name=Ania` 200 85KB, `/api/pdf/kodowanie` 200 73KB.
- GitHub `Cooliber/Logopedic-axi` — `git filter-branch` redact `hf_GbA...` → `hf_REDACTED_TOKEN`, `git push --force origin main` (8a82f17 init, d5891ff deploy, 7f834a5 5 gier, 0ff0749 fix TS) — secret scanning PASS.

## Weryfikacja wszystkich 84 templates (2026-09-14 audit)

Script: `bun --bun /tmp/audit_templates.ts` → `render` z `googleFonts` 16 subsets, `auditDesignSystem` + heurystyki.

- **TOTAL 84 OK 84 FAIL 0** — wszystkie renderują PDF 58k–114k >50KB, brak `No registered font covers`.
- Bajty per grupa:
  - szeregi 4: syczacy 92084, szumiacy 84706, ciszacy 79249, rotacyzm 71494
  - plynnosc 1: 86604, planszowka 103996, dialog 89695, oddech 92961, katalog 113466, dyplom 58035, naklejki 100857
  - gry-nowe 5: labirynt 72808, memory 70013, wyszukiwanka 82469, kodowanie 65934, historyjka 64511
  - tematyczne 68: 93015–105089 (avg ~100k), np. syczacy-hawaje 101938, rotacyzm-minecraft 94992

### Szczegółowy stan

| Slug | Bytes | W | M | Status | Uwagi produkcyjne |
|---|---|---|---|---|---|
| syczacy | 92084 | 48* | M | OK | **REMAKE prod** — karty 48, mandala 96 mala, petla rozproszona, dol 2 kol waskie. Wymaga v2 jak themed (64+dots+linie, bez mandali) |
| szumiacy | 84706 | 48 | M | OK | jak wyżej |
| ciszacy | 79249 | 48 | M | OK | jak wyżej |
| rotacyzm | 71494 | 48 | M | OK | jak wyżej |
| plynnosc | 86604 | 52 | - | OK | 52px oddech — OK, taste spójne, zostawić |
| planszowka | 103996 | - | - | OK | plansza 36 pól spiral — taste OK, rozważyć A3 wariant |
| dialog | 89695 | - | - | OK | Moc Rozmowy — taste OK |
| oddech | 92961 | - | - | OK | Oddech Smoka — taste OK |
| katalog | 113466 | - | - | OK | QR dataURL — taste OK |
| dyplom | 58035 | - | - | OK* | audit `Brak PersonalizationBar` — false positive, dyplom ma custom displayName/displayDate, OK prod |
| naklejki | 100857 | - | - | OK | 48 szt — taste OK |
| labirynt | 72808 | - | - | OK | v2 nowy — prod gotowy |
| memory | 70013 | 52 | - | OK | v2 — prod gotowy |
| wyszukiwanka | 82469 | - | - | OK | v2 — prod gotowy |
| kodowanie | 65934 | - | - | OK | v2 — prod gotowy, kolory P/S/K 22C55E/FACC15/EF4444 |
| historyjka | 64511 | 64 | - | OK | v2 — prod gotowy |
| tematyczne 68 | 93k-105k | 64 | M* | OK | `themed.tsx` v2 print — **prod gotowy** po fix 2026-09-14. M flag = komentarz w kodzie, nie render. Wszystkie >93k, duże obrazki 64, pary 48, ruch full-width |

*W=word img size, M=mandala string w pliku

### Wniosek weryfikacji

- **4 templates wymagają remake produkcyjny**: `syczacy`, `szumiacy`, `ciszacy`, `rotacyzm` (bazowe szeregi). Są funkcjonalne (OK render, >70k) ale nie spełniają v2 print standardu (gęstość, małe karty, mandala mała, rozproszona nagroda). Remake = przenieść logikę z `themed.tsx` v2 (64px + dots, bez mandali, pętla spójna, pary z obrazkami, zdania z liniami).
- **11 templates prod gotowe bez zmian**: `plynnosc`, `planszowka`, `dialog`, `oddech`, `katalog`, `dyplom`, `naklejki` + 5 nowych `labirynt/memory/wyszukiwanka/kodowanie/historyjka`.
- **68 tematycznych prod gotowe**: po fix hawaje (2026-09-14) spełniają v2. Nie wymagają remake, jedynie podmiana hero PNG gdy HF lepsze.
- **Blokery build usunięte**: `scripts/build-deliverable.ts:12` fix + `bun.lock` v2 ignored, Vercel PASS.

## Blind spots / next

- Base szeregi remake (4) — prio P0, est. 1 sesja, reużyć `themed.tsx` v2 jako baza.
- ZIP batch endpoint `/api/pdf/zip` — kreator zamiast multi-tab (forward-look #2).
- Playwright E2E + visual regression dla 84 slugów (forward-look #3).
- Twemoji image pipeline (forward-look #1) — gdy web chce emoji w PDF, nie litery.
- Local font fallback offline (forward-look #4).

## Resume

Next: remake 4 bazowych szeregów do v2 print, potem ZIP + E2E. Wersja do druku 84 jest funkcjonalna (all OK) ale 4 bazowe mają dług design debt — po ich remake biblioteka będzie jednolicie produkcyjna.

Evidence: `/tmp/audit_templates.ts` + `/tmp/audit_results.json` (84 OK), `bun run build` 10.5s PASS, `vercel --prod` 1m aliased, `gh repo view Cooliber/Logopedic-axi` size>0, pdf curl 200 85KB/73KB.
