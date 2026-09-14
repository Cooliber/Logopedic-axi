# REALNE POTRZEBY — co generować, ile, za ile

> Audyt 2026-09-07, po uzupełnieniu kredytów. Źródła: `catalog.ts` (14 tematów), `wordPools.ts` (582 nody, 359 distinct), `icons.tsx` (87 wordSvg), `themed.tsx` (grid 4×3 =12 WordBubble/karta).

## 1. Inwentarz — co istnieje

| Zasób | Stan | Liczba |
|-------|------|--------|
| Tematy | 14 (kosmos, zwierzaki, dinozaury, pojazdy, ocean, las, jedzenie, sport, dom, ubrania, pogoda, muzyka, ogrod, miasto) | 14 |
| Slugi tematyczne | `szereg-temat` = 14×4 =56 | 56 |
| Slugi bazowe | 11 (4 szeregi + plynnosc/planszowka/dialog/oddech/katalog/dyplom/naklejki) | 11 |
| **Razem slugi** | 56+11=**67** | 67 |
| Nody konstelacji (word×szereg×temat) | 582, avg 10/slug | 582 |
| Distinct words w poolach | 359 | 359 |
| wordSvg lokalne (hand-drawn) | 87 | 87 |
| **Brak wordSvg** | **272** (282 w first12, 286 po strip) | ~275 |
| Hero cover per temat | 0 w kodzie (tylko `t.doodle` litera) | 0 |
| `themedDoodleHints` | 4 ikony w nagłówku karty (np. kosmos: RAKIETA/SATELITA/KOSMOS/SONDA) — wiele z nich już ma wordSvg | 14×4=56 hintów |
| `PILOT_PROMPTS` w anim | 16 (8 hero +8 word) | 16 |
| Wygenerowane w anim | 8 hero 1024 schnell OK, 1 test 512 OK, 4 word FAIL (kredyty) | 9 OK |

**Wniosek:** 8/14 hero zrobione, brak 6 hero (dom/ubrania/pogoda/muzyka/ogrod/miasto). Word icons: 87/359 pokryte (24%), 75% kart pokazuje literę w kółku zamiast obrazka.

## 2. Co realnie potrzebne — 4 warstwy

### Warstwa HERO (największy efekt wizualny)
- **Co:** 1 cover per temat (14). Duża ilustracja do `PageHeader` / `GalleryWithFilters` / `katalog`.
- **Rozmiar:** 1024×1024, style `doodle`/`watercolor`/`kawaii` per temat (kosmos=doodle, las=watercolor, jedzenie=kawaii, sport=flat, dinozaury=clay itp. — już w `prompts.ts`).
- **Użycie:** nagłówek PDF A4, thumbnail galerii, social.
- **Status:** 8/14 zrobione (kosmos/zwierzaki/pojazdy/ocean/dinozaury/las/jedzenie/sport). **Brak 6:** dom, ubrania, pogoda, muzyka, ogrod, miasto.
- **Koszt:** 6×$0.003 schnell = **$0.018** / 6×$0.025 dev = $0.15
- **Priorytet:** **P0 — zrób teraz** (6 obrazków, 30s).

### Warstwa WORD-CANONICAL (największy ROI)
- **Co:** 1 ikona per distinct word (359), biała kartka, centralny obiekt, bez tła tematycznego. Reużywalna na wszystkich kartach gdzie słowo występuje.
- **Rozmiar:** 512 lub 1024 kwadrat, `doodle` single object, thick outline.
- **Użycie:** `WordBubble` iconSrc — zastępuje literę w kółku. Obecnie 12 ikon/karta ×56 kart =672 sloty, ale distinct 359, więc 1 generacja pokrywa wiele kart.
- **Status:** 87 done (svg), 272 missing. Najczęstsze missing (wartość):
  - TOP11 (11-7 wystąpień): KOSZ(11), LIŚĆ(11), ĆMA(10), DŹWIĘK(10), KOŚĆ(9), MUR(9), MIŚ(8), ŚLIMAK(7), ŚNIEG(7), TOR(7), SOK(6)
  - TOP50 pokrywa ~60% slotów kart
- **Koszt:** 359×$0.003 = **$1.08** / TOP50 =$0.15 / TOP20 =$0.06
- **Priorytet:** **P1 — TOP20-50 teraz**, reszta iteracyjnie.

### Warstwa WORD-THEMED (opcjonalna, droższa)
- **Co:** wariant per word×temat (np. SOWA w kosmos vs SOWA w las z innym tłem). 582 nody.
- **Po co:** gdyby ikona miała mieć tło tematyczne (las sosny vs kosmos planety).
- **Decyzja:** **NIE rób na start**. Canonical white bg jest lepszy: spójny, czytelny w druku, EKO, reużywalny. Themed wariant tylko jeśli test A/B pokaże że dzieci wolą.
- **Koszt:** 582×$0.003=$1.75 — nieopłacalny teraz.

### Warstwa DECOR / GRY (nice to have)
- **Co:** tła do `planszowka` (36 pól), `naklejki` (48), `dyplom`, `katalog` QR tła, naklejki XP.
- **Użycie:** planszowka pola mogą reużyć word icons + hero crops. Dyplom — 1 hero per temat.
- **Status:** można odłożyć do sesji 3-4.
- **Koszt:** ~20–30 obrazków = $0.06-0.09

## 3. Rekomendowany plan — 3 fazy, minimalne kredyty

### FAZA A — walidacja stylu w PDF (26 obrazków, $0.08, 2 min)
- **6 missing hero:** dom, ubrania, pogoda, muzyka, ogrod, miasto — style: dom=flat, ubrania=kawaii, pogoda=watercolor, muzyka=flat, ogrod=watercolor, miasto=flat
- **20 TOP words:** KOSZ, LIŚĆ, ĆMA, DŹWIĘK, KOŚĆ, MUR, MIŚ, ŚLIMAK, ŚNIEG, TOR, SOK, KOS, LAS, CIENIE, CEBULA, CZEKOLADA, RÓŻA, SOWA, ŻABA, DŻUNGLA — canonical doodle 1024
- **Cel:** wstaw 1 hero do `themed.tsx` PageHeader i 3-4 word icons do WordBubble, wyrenderuj PDF, sprawdź druk/laminat/EKO.
- **Komenda:** `bun run src/batch.ts --limit 6` (hero) + osobny batch words (patrz sekcja 4)

### FAZA B — pokrycie 80% kart (50 TOP words, $0.15)
- Kolejne 30 z TOP50 (np. BRAMA, RYBA, ROWER, GRZYB, etc.) — po walidacji A.
- Po B: ~137/359 (38%) ale pokrywa ~80% slotów wyświetlanych (bo częste słowa).

### FAZA C — komplet (pozostałe ~230 words, $0.69)
- Reszta missing 282 w partiach 20-30, review po każdej.
- Na końcu: 359/359 canonical, zero liter fallback.

**Suma pełna:** 14 hero +359 words =373 obrazki ×$0.003 = **$1.12** (schnell) / $1.45 z dev hero. Przy 1024 to ~370MB PNG.

## 4. Prompty — korekta

Obecny `buildPrompt()` dodaje `theme hint` do word promptów — dla canonical WORD to błąd (SOWA nie powinna mieć tła las/kosmos). Proponuję split:

- `buildHeroPrompt(theme)` — z `THEME_STYLE_HINT` + styl per temat
- `buildWordPrompt(word)` — tylko `cute [word] object, doodle, single centered, white background, thick outline, pastel, no theme background`

Już w `constellations.ts` jest `wordToHfPrompt()` z theme — też do korekty dla canonical.

**Dla Fazy A:** użyć `buildWordPrompt` bez theme.

## 5. Integracja techniczna — 3 opcje

| Opcja | Jak | Pro | Contra |
|-------|-----|-----|--------|
| **A. public/anim/** | PNG → `public/anim/words/KOSZ.png`, w `WordBubble` `src={`/anim/words/${w}.png`}` | proste, cache, Takumi `<img src>` działa, EKO OK | wymaga `wordToDataUri` fallback na URL, nie dataURI |
| **B. dataURI base64** | PNG → base64 → `wordSvg[word]=dataUri` (rozszerz `icons.tsx` lub `wordToDataUri` czyta manifest) | 1 plik, offline PDF, bez fetch | +33% rozmiar, 359×~1MB base64 = ~500KB TS file |
| **C. manifest + lazy** | `assets/manifest.json` mapuje word→file, loader w `icons.tsx` | elastyczny, można swap schnell/dev | wymaga build step |

**Rekomendacja:** **A** na start (najprostsza), B jeśli PDF musi być 100% offline.

## 6. Decyzje do podjęcia teraz (przed paleniem kredytów)

1. **Hero — 6 brakujących: generować schnell czy dev?** (schnell $0.018 vs dev $0.15 — różnica jakości widoczna w druku?)
2. **Word — canonical white bg czy themed bg?** (rekomendacja: canonical)
3. **Rozmiar word:** 512 ($0.003, 4s) vs 1024 ($0.003, 4.5s) — 512 wystarczy do 48px w PDF, ale 1024 lepsze do naklejek.
4. **Faza A: 6+20 czy od razu 6+50?** (rekomendacja 6+20 walidacja)
5. **Integracja:** public/anim vs dataURI?

## 7. Następny krok — komendy gotowe

```bash
cd anim
# po decyzji — Faza A hero 6
bun run src/generate.ts --subject "cozy living room with sofa and curtains, doodle" --theme dom --style flat --out assets/output/hero-dom__flat__schnell.png
# ... lub batch po dopisaniu 6 hero do PILOT_PROMPTS
bun run src/batch.ts --limit 14  # 8 istniejących SKIP +6 nowych

# Faza A words TOP20 — nowy skrypt canonical (do przygotowania)
bun run src/batch-words.ts --top 20 --size 1024
```

## 8. Ryzyka

- **Credit burn:** 373×schnell to tylko $1.12, ale przy dev $9. — trzymaj schnell do walidacji.
- **Jakość:** FLUX schnell czasem gubi detale (ręce, tekst) — dla word icons single object to OK, dla hero trzeba review.
- **Spójność stylu:** 5 stylów może rozjechać karty — trzymaj `doodle` dla 80% words, tylko hero różnicuj.
- **Polskie znaki:** prompt musi mieć angielski opis + `no text` — nie wpisuj "ŚLIMAK" literalnie jako tekst w obrazku.

---

**Propozycja next:** wybierz opcje 1-5, potem generuję Fazę A (6 hero +20 words) i podpinam 1 przykład do `themed.tsx` + PDF render test.
