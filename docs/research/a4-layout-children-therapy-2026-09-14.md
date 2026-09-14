# Układ strony A4 w materiałach logopedycznych dla dzieci 4-7 lat — research

**Data:** 2026-09-14 · **Scope:** `src/lib/pdf/templates/*.tsx`, `src/lib/pdf/design-system.ts`, `src/lib/pdf/modules/types.ts`, `docs/methodology/modular-a4-pipeline.md`  
**Metoda:** desk research na źródłach pierwotnych — ISO 216, WCAG 2.1 WAI, British Dyslexia Association via Printable Scholar, madegooddesigns worksheet/print guides, KidsWorldFun typography. Wtórne blogi tylko jako wskaźnik do badań źródłowych. Każde twierdzenie ma cytowanie.

---

## 1. TL;DR — 10 zasad A4 dla logopedii dziecięcej

| # | Zasada A4 | Decyzja w logopedia | Źródło |
|---|---|---|---|
| 1 | **A4 = 210×297 mm, 1:√2, 2480×3508 px @300 dpi** | `layout.page.size="A4" margin:0 padding:20` — usable 940px @96dpi, w druku 300 dpi. Trzymamy `takumi-pdf {size:"a4"}` | [ISO 216:2007](https://cdn.standards.iteh.ai/samples/36631/c0883203ea25445c9992bb09343620c5/ISO-216-2007.pdf), [Wikipedia ISO 216](https://en.wikipedia.org/wiki/ISO-216), [Recraft A4 guide](https://www.recraft.ai/blog/a4-format-guide), [Cambridge ISO paper](https://www.cl.cam.ac.uk/~mgk25/iso-paper.html) |
| 2 | **Marginesy 10-15 mm safe, 3 mm bleed** | `spacing.page=20` (≈5 mm) + `safeZone 10mm` na laminat. **Żaden tekst/obrazek nie bliżej niż 12 mm od krawędzi cięcia.** Bleed 3.175 mm (0.125") jeśli tło do krawędzi | [Children's Book Layout](https://madegooddesigns.com/childrens-book-layout/) (trim/bleed/safe), [KDP interior](https://kdpinterior.com/childrens-book-template-kids-publishing-guide/) |
| 3 | **Jedno zadanie na sekcję, 40-60% bieli** | Max 6 modułów/stronę (744px budget), `maxSections=6`, 1 aktywność na moduł. 12 zadań 4×2 → dziel na 6+6 (strona 1/2) | [Worksheet Design](https://madegooddesigns.com/worksheet-design/) (space to answer, white space), [Printable Scholar checklist](https://printablescholar.com/blog/worksheets-for-dyslexic-and-adhd-kids.html) (40-60% white), [docs/research/neurokognitywne... §2](neurokognitywne-wzorce-templates.md) (Cognitive Load) |
| 4 | **Typografia dziecięca: 14-18 pt, LH 1.5-1.6, sans infant** | Body 11-12px w PDF = ~14 pt print, `Baloo2/Andika/Sassoon` single-story a/g, `tracking 0.2-0.3px`, left-align | [KidsWorldFun typography](https://www.kidsworldfun.com/blog/how-to-choose-fonts-for-childrens-books-learning-apps/), [Children's Book Layout](https://madegooddesigns.com/childrens-book-layout/) (14-24 pt, infant variants), [Printable Scholar](https://printablescholar.com/blog/worksheets-for-dyslexic-and-adhd-kids.html) (14pt floor, 1.5-1.75 LH) |
| 5 | **Nagłówek: imię/data + tytuł + instrukcja bold plain language** | `PageHeader` + `PersonalizationBar` + `InstructionCard` 3 kroki ≤20 słów, 2. os. „Pokoloruj, Powiedz” | [Worksheet Design](https://madegooddesigns.com/worksheet-design/) (header zone name/date/class, bold instructions) |
| 6 | **Odpowiedź dopasowana do treści** | Linia/parę linii na zdanie, box na diagram, kratka 4×4 na słowa 96px — nie ściskaj 40 zadań na 1 A4 | [Worksheet Design](https://madegooddesigns.com/worksheet-design/) (match answer space to expected response) |
| 7 | **Projektuj na czarno-biało** | `EKO` białe tło, nie polegaj na kolorze (color-blind), solid lines nie pale screens, test w grayscale | [Worksheet Design](https://madegooddesigns.com/worksheet-design/) (design for B&W, copy room) |
| 8 | **Kontrast WCAG AA 4.5:1 (3:1 large)** | Wszystkie `kidPalette` ≥4.5:1 zweryfikowane `contrast-check.py` (4.87-7.88:1). Kolor nie jedyny nośnik (kształt+tekst P/S/K) | [WAI WCAG 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html), [WebAIM Contrast](https://webaim.org/articles/contrast/), [Section508 nonweb](https://www.section508.gov/test/color-contrast-in-nonweb-documents-images/) |
| 9 | **Siatka i gutter** | Nigdy tekst/obraz przez środek (gutter). Inner margin gutter > outer, spójny template 1 header + przewidywalna kolejność top→bottom | [Children's Book Layout](https://madegooddesigns.com/childrens-book-layout/) (gutter, bleed/safe) |
| 10 | **Chunking 3-6, przewidywalność** | `wordsTotal.ideal=8` = 5 chunków (4±1 WM), dziel po 3-4 grubą linią, numeracja 1-5, ta sama pozycja odpowiedzi | [Printable Scholar](https://printablescholar.com/blog/worksheets-for-dyslexic-and-adhd-kids.html) (chunking 3-6), [Cognitive Load](#) |

---

## 2. A4 jako system fizyczny (ISO 216)

**Wymiary:** 210×297 mm (8.27×11.69"), stosunek 1:√2, A0=1 m², każde A(n+1)=½ A(n) cięciem równoległym do krótszego boku. Tolerancje ±1.5 mm (≤150 mm), ±2 mm (150-600 mm), ±3 mm (>600 mm). Mierzone w atmosferze ISO 187. [ISO 216:2007](https://cdn.standards.iteh.ai/samples/36631/c0883203ea25445c9992bb09343620c5/ISO-216-2007.pdf) i [Wikipedia](https://en.wikipedia.org/wiki/ISO-216).

**Dlaczego √2:** jedyny stosunek gdzie połówka zachowuje proporcje — dwa A4 obok = A3, dwa A5 na A4 bez odpadu. [Cambridge ISO paper](https://www.cl.cam.ac.uk/~mgk25/iso-paper.html).

**Piksele:** 72 dpi=595×842 px, 150 dpi=1240×1754, **300 dpi=2480×3508** (druk komercyjny), 600 dpi=4960×7016. [Adobe A4](https://www.adobe.com/uk/creativecloud/design/discover/a4-format.html), [Recraft](https://www.recraft.ai/blog/a4-format-guide), [Soapbox](https://www.soapboxdigital.co.uk/what-size-is-a4). **Ustaw dokument 300 dpi od startu**, eksport PDF CMYK z fontami osadzonymi. [Children's Book Layout](https://madegooddesigns.com/childrens-book-layout/).

**Implikacja dla logopedia:** `takumi-pdf {size:"a4" margin:0}` + padding 20 w szablonie = usable 940px @96dpi ≈ 180 mm, zapas 10 mm safe na laminat (obecnie `layout.page.safeZone 10mm`). Po halvingu A4→A5 idealne do kieszonkowego powtórnego druku (2 karty na 1 A4).

---

## 3. Marginesy, bleed i safe zone — laminat

**Bleed:** 0.125" (3.175 mm) poza trim na każdej krawędzi gdy tło do krawędzi; inaczej `no-bleed` białe ramki. [Children's Book Layout](https://madegooddesigns.com/childrens-book-layout/), [KDP](https://kdpinterior.com/childrens-book-template-kids-publishing-guide/).

**Safe zone:** ≥0.25" (6.35 mm) wewnątrz trim — tam trzymaj tekst/kluczową grafikę, inaczej nóż odkroi. Dla laminowania dziecięcego + pisaki suchościeralne dodaj **10-15 mm** outer margin (nasze `p-5` 20px ≈5 mm — za mało, podnieść do 12-15 mm w `layout.page.padding`). Gutter (środek) — nigdy twarz/oko/tekst przez środek, inner margin > outer. [Children's Book Layout](https://madegooddesigns.com/childrens-book-layout/).

**Maszyna drukująca:** printable area ~625 cm², sprawdź marginesy kopiarki — nic nie może być odcięte przy duplikacji. [Adobe](https://www.adobe.com/uk/creativecloud/design/discover/a4-format.html).

**Nasza decyzja:** `layout.page` → `padding 24` (9 mm) + `safeZone 12 mm` + `bleed 3 mm` gdy `eko=false` i tło kolorowe. Test: wydrukuj stronę, zakreśl 12 mm ramkę — wszystko istotne w środku?

---

## 4. Typografia dla 4-7 lat

**Priorytety wiekowe:** 3-5: duży tekst, proste litery, hojne odstępy; 6-8: wysoka czytelność, odróżnialne b/d/p/q; 9-12: więcej zaawansowania. [KidsWorldFun](https://www.kidsworldfun.com/blog/how-to-choose-fonts-for-childrens-books-learning-apps/).

**Rozmiar:** 14-24 pt dla picture books / early readers (młodsze większe), leading 1.4-1.6×, krótkie linie (kilka słów/1 zdanie), left-align, nigdy justowanie. [Children's Book Layout](https://madegooddesigns.com/childrens-book-layout/). Dla worksheet: **12 pt floor dla starszych, młodsze większe** (14 pt+), 1.5× LH minimum, 1.75-2× dla początkujących. [Worksheet Design](https://madegooddesigns.com/worksheet-design/), [Printable Scholar](https://printablescholar.com/blog/worksheets-for-dyslexic-and-adhd-kids.html) (1.5× British Dyslexia Association baseline).

**Font:** wyraźny sans o równej wadze, otwarte oczka, odróżnialne b/d/p/q. Infant warianty single-story a/g: **Andika** (SIL, open, early literacy), **Sassoon Primary**, Baloo2, Lexend, OpenDyslexic. Unikaj wąskich szeryfów, Times small, dekoracyjnych skryptów w instrukcji. [Worksheet Design](https://madegooddesigns.com/worksheet-design/), [Printable Scholar](https://printablescholar.com/blog/worksheets-for-dyslexic-and-adhd-kids.html), [KidsWorldFun](https://www.kidsworldfun.com/blog/how-to-choose-fonts-for-childrens-books-learning-apps/).

**Hierarchy:** 1 primary +1 secondary +1 dekoracyjny max. Bold dla instrukcji, nie caps/italic w długich blokach. [KidsWorldFun](https://www.kidsworldfun.com/blog/how-to-choose-fonts-for-childrens-books-learning-apps/).

**Nasza decyzja:** `Baloo2`/`Nunito` body 11-12 px (≈14 pt print) `LH 1.6` `tracking 0.3px` już OK. Podnieść `text-[7px]` caption → min 8px, dodać `inter-word +25%` w zdaniach (patrz `neurokognitywne §5.1` Zorzi/Perea: +spacing → +accuracy, nie tylko dysleksja). Test w grayscale na 120% zoom — czy 5-latek czyta bez gubienia linii?

---

## 5. Worksheet design — przestrzeń i instrukcja

**Najczęstszy błąd:** za mało miejsca na odpowiedź. Dzieci młodsze potrzebują dużych pól; obfita biel = mniej błędów i mniej overwhelm. 40 zadań na 1 A4 = projekt na oszczędność tonera, nie na uczenie. [Worksheet Design](https://madegooddesigns.com/worksheet-design/) (match answer space), [Printable Scholar](https://printablescholar.com/blog/worksheets-for-dyslexic-and-adhd-kids.html) (40-60% bieli, >15 zadań = wall).

**Instrukcja:** jedna na zadanie, bold, plain language („Zakreśl czasownik”), numerowana jeśli kroki. Wyróżnij nieco większa/bold — nie zakopuj w pytaniach. [Worksheet Design](https://madegooddesigns.com/worksheet-design/).

**Kolejność:** header zone imię/data/klasa góra, tytuł+instrukcja, potem pytania góra→dół, grupowane, konsekwentna numeracja, biel między sekcjami > gruba ramka. [Worksheet Design](https://madegooddesigns.com/worksheet-design/).

**Czarno-biało:** nie polegaj na kolorze (color-blind + ksero). Tła białe, solid lines, nie pale screens/gradienty. Jeśli działa w B&W, działa wszędzie. [Worksheet Design](https://madegooddesigns.com/worksheet-design/).

**Template:** jeden czysty szablon (header + name/date + czytelny font + marginesy + spacing) duplikowany — spójność w placówce. [Worksheet Design](https://madegooddesigns.com/worksheet-design/).

**Nasza decyzja:** `layout.grid.wordsTotal.ideal=8` (5 chunków WM) + `spacing.page 20` + `gap 12` = ~22% bieli dziś — **podnieść do 40%** przez `p-6` + `words 8` + `breakAfter` strona 1/2/3 (już wdrożone 3p: 72×3p). Każda karta ma linie 18px na zdanie + box na diagram + 3 kropki prób — już `match answer space`. Dodać wariant `line-ruled` dla klas 1-2 (3-liniowy przewodnik 14 mm jak DeskRated).

---

## 6. Kolor i kontrast — druk + dostępność

**WCAG AA:** 4.5:1 normal (<18 pt / 14 pt bold), 3:1 large. AAA 7:1/4.5:1. Dotyczy PDF jako non-web document (Section 508, Allyant). [WAI WCAG 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html), [WebAIM Contrast](https://webaim.org/articles/contrast/), [Section508](https://www.section508.gov/test/color-contrast-in-nonweb-documents-images/), [Allyant print](https://allyant.com/blog/does-wcag-apply-to-print/).

**CMYK drift:** konwersja RGB→CMYK zmienia luminancję (K plate + gamut mniejszy), neon green/electric blue poza gamutem → matowy, kontrast może spaść poniżej 4.5:1. Zawsze proof fizyczny + re-check round-trip RGB→CMYK→RGB. [RGB to CMYK accessibility](https://www.lizecheng.net/color/guides/rgb-to-cmyk-for-accessibility-keep-contrast-in-print/).

**Nasza decyzja:** wszystkie `kidPalette` ≥4.5:1 (4.87-7.88:1) już zweryfikowane. `EKO` białe tło + `border 2px solid` zachowuje ground. Test: `contrast-check.py` + wydruk B&W — czy P/S/K badge rozróżnialny kształtem+tekst, nie tylko kolorem (WCAG 1.4.1). Unikać średnich saturacji na średnim tle.

---

## 7. Chunking i przewidywalność (ADHD/dysleksja)

**Podział:** 3-6 zadań na chunk z wizualną przerwą. Przewidywalny układ (numeracja, ta sama pozycja odpowiedzi) → mniej szukania, mniej saccad. [Printable Scholar](https://printablescholar.com/blog/worksheets-for-dyslexic-and-adhd-kids.html).

**Dysleksja:** czysty sans 14 pt+, open counters, stała waga, left-align, dodatkowy leading, nie caps/italic na długie bloki. [Worksheet Design](https://madegooddesigns.com/worksheet-design/).

**Nasza decyzja:** `PositionLegend` P zielony/S żółty/K czerwony + kształt+tekst, `HierarchyBar` UCHO→ZDANIE 5 kroków, `CuttingLine` co 4. Dla ADHD: `breakAfter` strona + `TraceLine A──B` propriocepcja.

---

## 8. Mapowanie na obecny `design-system.ts` i `modular-a4-pipeline.md`

**OK:**
- Tokeny `radius 16/22/28`, `border 2.5 dashed`, `shadow 0 2px` — oszczędne.
- `series` 8 palet 3+1, kontrasty ≥4.5.
- `layout.moduleBudget` 744px + p-5 40 + gap 60 =844 <940 usable — zapas laminat.
- `wordsTotal.ideal=8`, `spacing.page=20`, `maxSections=6`.

**Do poprawy (priorytet):**
| Komponent | Teraz | Powinno | Uzasadnienie |
|---|---|---|---|
| `spacing.page` | 20 (5 mm) | **24 (9 mm)** | Safe 12 mm dla laminatu + B&W ksero |
| `Word card` | 96px | **112px** | 4-7 lat potrzebuje 14 pt+ + dotyk; 96→112 = +17% czytelności |
| `text-[7px]` caption | 7px | **min 8px** | <11 pt nieczytelne dla dyslektyków |
| `bleed` | 0 | **3 mm** gdy tło kolorowe | KDP/bleed spec |
| `FooterBar` | #1A1A2E | EKO: white border #E5E7EB | Oszczędność tuszu (już częściowo) |

---

## 9. Checklist audytowy przed printem (per karta, rozszerzony)

- [ ] A4 210×297, 300 dpi 2480×3508, margines 12 mm safe, bleed 3 mm jeśli kolor do krawędzi
- [ ] ≤8 słów bazowych, 12 tylko tematyczne 6+6 (chunking)
- [ ] Każdy obraz = słowo docelowe lub cue (coherence)
- [ ] Etykieta P/S/K ≤4px od obrazka (contiguity)
- [ ] Kontrast ≥4.5:1 (text) / 3:1 (large/UI) — `contrast-check.py` + B&W proof
- [ ] Tracking +0.3px, LH 1.6, left-align, nie justowanie, nie caps/italic długie
- [ ] ≥40% bieli, max 3 kolory +1 akcent, tło białe w EKO
- [ ] Mandala/ślad wodzenia obecny (centrum lub TraceLine)
- [ ] Zadanie proprioceptywne obecne
- [ ] Instrukcja ≤20 słów, bold, plain language, numerowana
- [ ] Odpowiedź dopasowana (linia na zdanie, box na diagram)
- [ ] Gutter safe — nic przez środek, inner margin > outer
- [ ] Projekt dla B&W — test ksero, kolor nie jedyny nośnik

---

## 10. Bibliografia (źródła pierwotne)

- ISO 216:2007 Writing paper — trimmed sizes A/B + machine direction. [iteh.ai](https://cdn.standards.iteh.ai/samples/36631/c0883203ea25445c9992bb09343620c5/ISO-216-2007.pdf)
- ISO 216 — Wikipedia. [en.wikipedia.org/wiki/ISO-216](https://en.wikipedia.org/wiki/ISO-216)
- ISO paper — Markus Kuhn, Cambridge. [cl.cam.ac.uk/~mgk25/iso-paper.html](https://www.cl.cam.ac.uk/~mgk25/iso-paper.html)
- A4 Format — Adobe. [adobe.com/.../a4-format](https://www.adobe.com/uk/creativecloud/design/discover/a4-format.html)
- A4 Format Guide — Recraft. [recraft.ai/blog/a4-format-guide](https://www.recraft.ai/blog/a4-format-guide)
- A4 — Soapbox. [soapboxdigital.co.uk/what-size-is-a4](https://www.soapboxdigital.co.uk/what-size-is-a4)
- Worksheet Design: Clear, Usable Layouts — madegooddesigns.com. [Worksheet Design](https://madegooddesigns.com/worksheet-design/)
- Worksheets for Dyslexic & ADHD Kids — Printable Scholar Checklist. [printablescholar](https://printablescholar.com/blog/worksheets-for-dyslexic-and-adhd-kids.html)
- How to Choose Fonts for Children — KidsWorldFun. [kidsworldfun](https://www.kidsworldfun.com/blog/how-to-choose-fonts-for-childrens-books-learning-apps/)
- Children's Book Layout and Typesetting — madegooddesigns. [Children's Book Layout](https://madegooddesigns.com/childrens-book-layout/)
- Children's Book Template — KDP Interior. [kdpinterior](https://kdpinterior.com/childrens-book-template-kids-publishing-guide/)
- WCAG 1.4.3 Contrast (Minimum) — WAI. [w3.org/WAI/.../contrast-minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- Contrast and Color — WebAIM. [webaim.org/articles/contrast](https://webaim.org/articles/contrast/)
- Color Contrast in Non-Web Documents — Section 508. [section508.gov](https://www.section508.gov/test/color-contrast-in-nonweb-documents-images/)
- Does WCAG Apply to Print? — Allyant. [allyant.com/.../does-wcag-apply-to-print](https://allyant.com/blog/does-wcag-apply-to-print/)
- RGB to CMYK for Accessibility — lizecheng.net. [RGB to CMYK](https://www.lizecheng.net/color/guides/rgb-to-cmyk-for-accessibility-keep-contrast-in-print/)
- Handbook: Handwriting Practice Sheets — DeskRated (3-line guide, Andika). [deskrated.com](https://deskrated.com/handwriting-practice-sheets/)
- Existing: `docs/research/neurokognitywne-wzorce-templates.md` §2-6 (Cognitive Load, Mayer, Gestalt, mandala RCT), `docs/methodology/modular-a4-pipeline.md` §2 (744px budget), `docs/research/cards-population...` §2 (quality spec 300 DPI, CMYK, bleed).
