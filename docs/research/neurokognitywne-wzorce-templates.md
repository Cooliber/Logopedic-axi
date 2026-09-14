# Neurokognitywne wzorce projektowania kart logopedycznych dla dzieci (3–7 lat)

**Data:** 2026-05-13 · **Scope:** `src/lib/pdf/templates/*.tsx` + `src/lib/pdf/design-system.ts` + `src/lib/pdf/icons.tsx`  
**Metoda:** desk research na źródłach pierwotnych (peer-reviewed, RTC, oficjalne wytyczne) — wtórne blogi tylko jako wskaźnik do badań źródłowych.

---

## 1. TL;DR — 10 zasad do wdrożenia od jutra

| # | Wzorzec | Decyzja w logopedia |
|---|---------|---------------------|
| 1 | **8 słów = 4-5 chunków** (working memory 4±1 w wieku 4-6) | `layout.grid.wordsTotal.ideal=8` już OK. Nie zwiększać do 12 na kartach bazowych. 12 tylko w `themed.tsx` gdy 2 serie łączone → dziel na 2 sekcje po 6 (chunking). |
| 2 | **Eliminuj extraneous load** | Biała przestrzeń ≥20%, 1 aktywność/strona, brak dekoracyjnych kwiatów. `maxSections=6`, `contentRules.images.maxPerCard=18` → obniżyć do 12. |
| 3 | **Signaling + Contiguity (Mayer)** | Etykieta `P/S/K` tuż przy obrazku (≤8px gap), kolorowe `call-out` i `badge` sygnalizują pozycję głoski. Nie oddzielać legendy na dół strony. |
| 4 | **Coherence — usuń nieistotne obrazki** | Każdy obraz na karcie musi być słowem docelowym lub cue artykulacyjny. 6-kolorowa tęcza `planszowka.tsx` → 3 kolory. |
| 5 | **Gestalt proximity/similarity/closure** | Grupuj sekcje białą przestrzenią, nie liniami. `rounded 22px + 3px` jako closure. Kolor = similarity per szereg (już mamy). |
| 6 | **Typografia dyslektyk-friendly** | Body 11-12px / LH 1.6 / tracking 0.2-0.3px OK. Dodać `inter-letter +0.5px` i `inter-word +30%` (Zorzi, Perea) — szczególnie dla `ciszacy/rotacyzm` gdzie crowding = błąd. |
| 7 | **Mandala jako aktywny składnik** | Kolista symetria od centrum → uwaga + working memory. 8-10 tyg. × 1-2×/tydz. poprawia Color Trail, Digit Span, Stroop (p<0.001). Użyć jako ramka do kolorowania, nie jako wypełniony clipart. |
| 8 | **Cue hierarchy dla głoski** | Twarz → lustro → diagram ust → karta z symbolem → litera. Na karcie PDF: diagram + sylaby + pozycja P/S/K (już w `HierarchyBar`). Fading: najpierw pełny cue, potem sam badge. |
| 9 | **Multisensory kotwiczenie** | Ruch + głos w jednym bloku (`MovementBox`) — propriocepcja Van Ripera. Każda karta ma ≥1 zadanie proprioceptywne (klask/skok/wodzenie palcem). |
|10| **Kontrast AA + nie tylko kolor** | 4.5:1 body, 3:1 UI. Każdy status (P सक्रिय) ma kształt+tekst, nie tylko kolor. |

---

## 2. Podstawa: Cognitive Load Theory (Sweller 1988)

**Wzór:** `Total = Intrinsic + Extraneous + Germane` — pojemność 4-7 chunków (Miller 7±2, dla 4-6 lat 4-5) [LessonCraft 2025-11-16](https://www.lessoncraftstudio.com/en/blog/cognitive-load-theory-in-worksheet-design-why-44-picture-sudoku-works-for-age-4).

- **Intrinsic** = trudność zadania (liczba słów do śledzenia). 4×4 sudoku = 2.7× pojemności → wyzwanie osiągalne. 9×9 = 13.5× → shutdown.
- **Extraneous** = narzut złego layoutu (gęsty druk, małe fonty, dekoracje). Do minimalizacji. Checklista *clean design*: spójny nagłówek góra-lewo, ≥20% bieli, obraz tylko istotny, ≤20 słów instrukcji, jedno zadanie/strona.
- **Germane** = wysiłek budujący schemat (refleksja, tworzenie, analiza błędu). Do maksymalizacji — stąd `SelfRating`, `OneMinuteChallenge`, `XPTracker`.

**Mapowanie na logopedia:**

- `wordsTotal.ideal=8` (po fix „za dużo tabelek”) = **5 chunków** (4+1 reguła) → wewnątrz kapasity 4-5 dla 4-6 lat, 5-7 dla 7-8 lat. Optimum 80-90% pojemności — *productive struggle* potwierdzony 75-85% success dla 4×4 vs 90%+ dla 3×3 [tamże].
- Progressja trudności: `Week1-2: 3 słowa → Week3-5: 8 → Week6: 12` — nasi 8 → 12 tematycznych spełnia zasadę.
- **Chunking** dla ADHD/autyzm: dziel po 3-4 pozycje grubą linią. Dotyczy `DottedCard` z 8 słowami → po 4 przerwa `CuttingLine`.
- **Worked example + cover box**: górny `InstructionCard` z 3 krokami + `TraceLine` A→B to *worked example* redukujący germane dla nowicjuszy.

**Źródła wtórne potwierdzające WT:** adaptacja arkuszy ADHD/autyzm — redukcja extraneous (6-10 zadań/strona, większy odstęp, jeden font) + checklisty + nagłówek TEACCH „co/ile/co potem” [MonsterMath 2026-01-09](https://www.monstermath.app/blog/how-to-adapt-math-worksheets-for-adhd-and-autistic-learners).

## 3. Mayer — 5 zasad redukcji extraneous + dowód EEG

**Zasady** [Nature Sci Reports 2025-07-02](https://www.nature.com/articles/s41598-025-08611-0) i Eric Clinton et al. 2017:

1. **Coherence** — usuń dekoracyjne obrazki
2. **Signaling** — wyróżnij kluczowe (kolor, etykieta, call-out)
3. **Redundancy** — nie duplikuj tekstu na ekranie gdy jest grafika+narracja
4. **Spatial contiguity** — tekst przy grafice (≤ bliskie sąsiedztwo)
5. **Temporal contiguity** — prezentuj razem

**Długi efekt neuralny:** EEG phase-slope index — sieć *principal* (zgodna z Mayer) = wydajne **lokalne** przetwarzanie (theta/beta), *non-principal* (naruszenia) = kompensacyjna **globalna** integracja + huby w delta/theta/alpha — mózg pracuje ciężej, wyniki recall niższe, NASA-TLX wyższe. Wniosek: dobre wzorce nie są estetyką, tylko mierzalnym obciążeniem.

**Dla kart PDF:**

- Signaling już działa: `P` zielony badge, `S/K` outline, `call-out "1 głoska zmienia sens"` — utrzymać.
- Contiguity: `WordBubble` ma obraz 52px + słowo + `P/S/K` w jednym kafelku (gap 4px) → idealne. Nie przenosić legendy na osobną stronę.
- Coherence: usunąć tęczę 6 kolorów w planszówce, usunąć generyczne Undraw — zastąpione hand-drawn `wordSvg` (spójne).
- Clinton 2017: jednoczesne zastosowanie 3 zasad (signaling+contiguity+coherence) → niższy cognitive load u low prior knowledge (czyli nasze dzieci 3-5) mierzony pupil dilation, większy czas na treść istotną.

## 4. Gestalt — nauka organizacji percepcyjnej (Graham 2008, Leflore 2000)

Prachi Mittal *Designed to Propel* [DSOURCE PDF](https://dsource.in/events/designingforchildren/Full_Final-Submissions/papers/Prachi%20Mittal/Prachi-Mittal-DESIGNED-TO-PROPEL-Using-Visual-Design-Principles-to-Promote-Meaningful-Learning-in-Constructivist-Classrooms-in-K-5%20Schools.pdf) (K-5, 45% pozytywnych wskazań dotyczy *organised work-space*):

- **Proximity** — bliskość = grupa. Sekcje `HierarchyBar → hero → words → exercises` rozdzielone `gap 12px`, wewnętrznie `gap 10px` — już podporządkowane proximity.
- **Similarity** — kolor = tożsamość klasy (szereg). Nie używać tego samego żółtego na 2 różne szeregi.
- **Closure** — zaokrąglenie 22/16/28px + `3px solid` tworzy domknięcie figury bez dorysowywania. Dotted `2.5px dashed` = figura otwarta → sygnalizuje „do wycięcia”.
- **Figure-ground** — papier `cream/mint/lavender` = ground, biała karta = figure. EKO (białe tło) gubi ground — wtedy figura musi mieć mocniejszy border (naprawione).
- **Continuity** — linia wodzenia `TraceLine A──B` (dashed) prowadzi oko — kontynuacja wspiera schemat motoryczny.

**Rekomendacja z badania 5-latków:** spójna reprezentacja pojęcia + align tekstu z wizualizacją + eliminacja irrelewantów → 32% wskazań „visual representation propels schema”.

## 5. Typografia i kontrast — dysleksja, crowding, spacing

### 5.1 Letter/word spacing

- **Zorzi et al. PNAS 2012** [PMC3396504](https://pmc.ncbi.nlm.nih.gov/articles/PMC3396504/): extra-large spacing → natychmiastowa poprawa szybkości i dokładności czytania u włosko/francuskich dzieci dyslektycznych (bez treningu) — mechanizm *crowding* (Bouma 1970).
- **Perea et al. 2012** [UV PDF](https://www.uv.es/~mperea/interletter_LI.pdf): + niewielkie zwiększenie inter-letter → krótszy czas identyfikacji słów u Grade2/4 i dyslektyków, szczególnie dla 6-literowych, + korzyść w rozumieniu tekstu u dyslektyków (81.9 vs 74.1 wpm, +10% comprehension).
- **Hakvoort et al. 2017** [Pure UvA PDF](https://pure.uva.nl/ws/files/21682890/Improvements_in_reading_accuracy_as_a_result_of_increased_interletter_spacing_are_not_specific_to_children_with_dyslexia.pdf): efekt **nie specyficzny** dla dysleksji — gdy tekst trudny, wszyscy zyskują na dokładności (mniej błędów), speed nie rośnie. Wniosek: spacing to uniwersalny booster dokładności.
- **Galliussi et al. 2020** [PMC7188700](https://pmc.ncbi.nlm.nih.gov/articles/PMC7188700/): sam *letterform* DF nie pomaga; klucz to **inter-word spacing** +70/1000 em inter-letter i +270/1000 em inter-word. Bez rozszerzenia słowa, rozszerzenie liter *szkodzi* (3.96 vs 4.10 syl/s).
- **Hebrew LS 150% 2024** [MDPI 15/1306](https://www.mdpi.com/2227-7102/15/10/1306): grade 2 +LS150% → lepsze rozumienie; grade 3 odwrotnie — developmental switch. Kalibracja comprehension dokładniejsza w optymalnym LS.
- **Eye-tracking Masulli 2018** [ScienceDirect S00426989](https://www.sciencedirect.com/science/article/pii/S0042698918302074): większe litery + spacing → krótsza fiksacja, więcej sakkad o większej amplitudzie u wszystkich (dyslektycy doganiają kontrolę). Total time bez zmian (więcej sakkad kompensuje).

**Implikacja dla kart:** `letterSpacing 0.2-0.3px` w `tokens.typo` to za mało. Dla `text-[11px]` dodać `tracking-[0.3px]` na słowach docelowych + `wordSpacing +25%` w zdaniach (np. `Historyjka Soni`). Dla 2. klasy (6-7 lat) testować `LS 120%`, nie 150%.

### 5.2 Font i rozmiar

- DF font shape (specjalne szeryfy) **nie** daje przewagi nad Verdana/Calibri przy stałym spacingu (Galliussi, Dyslexie study) [PMC9804695](https://pmc.ncbi.nlm.nih.gov/articles/PMC9804695/) — benefit tylko przy *letter naming*, nie fluency. Więc nie inwestować w płatny Dyslexie.
- **Wybór użytkowników:** obie grupy (dys/typ) wolą duży font, więcej światła, wysoki kontrast — różni się tylko *rozmiar* (dyslektycy większy) [RLOG 2025-09-10](https://revistas.ucm.es/index.php/RLOG/en/article/view/101374). Personalizacja = +fluency, bez wpływu na comprehension — warto jako opcja EKO vs KOLOR, nie jako nowy font.

### 5.3 Kontrast

Po audycie naprawione `design-system.ts` — wszystkie `primary/accent/secondary` na białym ≥4.5:1 (7 wartości zweryfikowane `contrast-check.py` 4.87–7.88:1). Reszta: `text-[#6B7280]` 4.83:1 PASS, `text-[#9CA3AF]` 2.54:1 FAIL → globalnie wymienione.

---

## 6. Mandala — kolorowanie jako interwencja wykonawcza

### 6.1 Mechanizm

Mandala = kołowy, symetryczny, powtarzalny wzór od centrum na zewnątrz (centrum = *active ingredient* wg Babouchkina & Robbins) — działa jak medytacja, integruje konflikt wewnętrzny, tworzy *mindful present*.

### 6.2 Dowody RCT (dzieci)

| Badanie | N, wiek | Dawka | Wynik |
|---------|---------|-------|-------|
| **Cureus 2023** Singh et al. [PMC10640382](https://pmc.ncbi.nlm.nih.gov/articles/PMC10640382/) ADHD symptoms | 120 dzieci 6-10, 10 tyg. mandala | Color Trail 1/2, Digit Span fwd/bwd, Stroop **p<0.001** wszystkie; EMSRQ ns. Rodzice: lepsza koncentracja, dłuższe skupienie. | |
| **Li & Sun 2023** 3-6 lat [TPPC 0510079](https://doi.org/10.35534/tppc.0510079) | 60 dzieci, 8 tyg. ×1/tydz. centripetral mandala | VADPRS attention ↓, efekt silniejszy u młodszych (3-4 > 5-6) | |
| **SciTechnol 2023** ADHD BRIEF [22756](https://www.scitechnol.com/peer-review/the-impact-of-mandala-coloring-on-the-executive-functions-of-children-with-adhd-ZDBE.php?article_id=22756) | 38 dzieci, 10 sesji | BRIEF executive + metacognition **p<0.001** | |
| **Dhammathas 2020** at-risk ADHD CPT/Corsi [TJCI 207590](https://so06.tci-thaijo.org/index.php/dhammathas/article/view/207590) | 60 dzieci G1-6 | CPT accuracy .05→.01 vs control, Corsi visuospatial .05 | |
| **Year3 2020** low-average [CE 2020-114043](https://doi.org/10.4236/ce.2020.114043) | 100 Year3 + 20 teachers | 70% strongly agree *complete all tasks*, 75% *follow instruction* | |
| **Perceptual SLD 2025** [10.1002/pits.70002](https://doi.org/10.1002/pits.70002) | 28 SLD 8-10, 12 sesji nieustrukturyzowanej mandali | Sensory & Cognitive d=duży, Emotional d=średni (p<0.01) | |

Negatyw: RCT pre-operacyjny Iran 2025 [PMC12164774](https://pmc.ncbi.nlm.nih.gov/articles/PMC12164774/) 64 dzieci 15-20 min mandala → brak różnic trait/state anxiety vs control — dawka za krótka na lęk okołooperacyjny != nasze zastosowanie uwagi.

**Wniosek dla kart:** mandala nie jest „ładnym tłem” (grid) tylko **terapią uwagi**. W kartach logopedycznych użyć jako:
- **Ramka kolorowanki** do wypełnienia (biały środek + gruby kontur 3px) — dziecko koloruje = trening executive (focused attention, interference control).
- **Centralny punkt fiksacji** (np. `MandalaCenter`) radiujący na 8 kafelków — oko prowadzi do centrum (contiguity + signaling).
- Dawka: karta używana 8-10 min (już w `InstructionCard time 8-10 min`) — idealne okno pojedynczej sesji mandala.

## 7. Projektowanie zadań logopedycznych — cue hierarchy i fonologia

**Articulatory placement + phonemic awareness** (Becker & Sylvan 2021 [LSHSS](https://doi.org/10.1044/2020_lshss-20-00095)): 17 preschool 55-65m, współpraca SLP+teacher → istotna poprawa segmentacji fonemowej i czytania nonwords vs baseline i vs tradycyjny program. Wniosek: łącz *gdzie język* + *gdzie głoska w słowie*.

**Cue fading** [SpeechTherapyTalk 2022](https://speechtherapytalk.com/slp-materials/speech-therapy-cues/visual-cues-for-speech-therapy/):

1. Twarz klinicysty (max support)
2. Lustro (high)
3. Diagram ust (medium-high)
4. Karta z symbolem/animation (medium)
5. Litera/grafem (low) — utrzymywać cały czas widoczny dla generalizacji.

Nasza implementacja `HierarchyBar UCHO→ZDANIE` + `PositionLegend P/S/K` + `MinimalPairs` pokrywa 3-5. Brakuje 1-2 → dodać piktogram „USTA/LUSTRO” z instrukcją dla rodzica (`ParentTip` już istnieje — rozszerzyć).

**One-pager logopedyczny** (TPT, 16 arkuszy fonologicznych): skuteczny wzorzec = *placement cue + syllable web (CV/VC) + 12 obrazków + labirynt/maze na poziomie zdania* — dokładnie nasz `syczacy.tsx` (hero + 8 słów + historia + ruch). SLP case study [Perspectives 2025](https://doi.org/10.1044/2025_persp-25-00012) (4;5 dziewczynka, 10 sesji) → spadek błędów, wzrost letter naming/grapheme-phoneme, bez istotności statystycznej ale klinicznie istotnie — czyli 8-10 kart wystarczy na efekt.

## 8. Picture book — kolor i kompozycja dla 2-7 lat (KNUTD 2024)

Preoperational 2-7 (Piaget): śledzenie obiektów, nazywanie kolorów od 3 r., preferencje kolorystyczne 2-3 proste figury, 5-7 relacje między figurami [KNUTD PDF](https://timetable.knutd.edu.ua/bitstream/123456789/28150/1/APSD_2024_V1_P236-238.pdf).

Zasada: **silny sygnał koloru + jasna hierarchia** przyciąga i kieruje spojrzenie; gradienty tęczowe i neonowe to szum (potwierdza nasz `antislop-ui` R-01). Paper `cream/mint/lavender/peach/sky` = ciepła baza niskiego nasycenia + jeden vivid akcent (np. `FACC15`) = optymalny stosunek sygnał/szum dla 3-6 lat.

## 9. Mapowanie na obecny `design-system.ts` — co już OK, co poprawić

**OK po ostatnich fixach:**

- Tokeny `radius 16/22/28`, `border 2.5 dashed`, `shadow 0 2px` — oszczędne, nie glass/glow.
- `series` 8 palet 3+1 — wszystkie kontrasty ≥4.5 (zweryfikowane).
- `layout.grid.wordsTotal.ideal=8`, `spacing.page=20` (≥20% bieli spełnione), `maxSections=6`.

**Do poprawy (priorytet):**

| Komponent | Teraz | Powinno | Uzasadnienie |
|-----------|-------|---------|--------------|
| `WordBubble` 52px siatka 4×2 | tabela | `ColoringTile` + `MandalaCenter` chmura rozrzucona ±1.5° rotacji, `3px solid #1A1A2E` | Closure + mandala, - extraneous (jedna mandala zamiast 4 kolorów) |
| `text-[7px]` caption | 7px | min `8px` | 7px = caption poniżej czytelności dyslektycznej (min 11pt ≈ 14px screen). 7px tylko na numerach. |
| `FooterBar` czarny | `bg #1A1A2E` | EKO: `bg white border #E5E7EB text #1A1A2E` | Oszczędność tuszu + ground zachowany (już naprawione). |
| `SelfRating` 3 stany | `SUPER/OK/JESZCZE` | dodać ikonę + tekst (nie tylko kolor) | R-27 non-text 3:1 + color-blind |
| `CuttingLine` | `-- WY T N I J --` | `-- POKOLORUJ -- WY T N I J --` | Sygnalizuje 2 etapy (germane) |

## 10. Rekomendowany schemat karty (A4, 0 margin, p-5)

```
[PageHeader 22px]  ← signaling: seria + temat, white 20px na bg ≥4.87:1
[PersonalizationBar]
[HierarchyBar 5 kroków]
[Hero story 88px + tekst 11px/1.6 + XP]  ← contiguity: obraz tuż obok tekstu
[Coloring mandala 8 kafelków + centrum]  ← executive load, 5 chunków
[MinimalPairs 2×2 lub MovementBox]
[Historyjka 10px/1.6 + OneMinuteChallenge]
[SelfRating + StickerStrip]
[FooterBar]
```

Biała przestrzeń: padding 20px + gap 12px = ~22% powierzchni pustej — target spełniony.

## 11. Checklist audytowy przed printem (per karta)

- [ ] ≤8 słów bazowych, 12 tylko tematyczne z podziałem 6+6
- [ ] Każdy obraz = słowo docelowe lub cue artykulacji (coherence)
- [ ] Etykieta P/S/K w odległości ≤4px od obrazka (contiguity)
- [ ] Kontrast tekstu ≥4.5:1 (`python contrast-check.py`), UI ≥3:1
- [ ] Tracking +0.3px na słowach docelowych, line-height 1.6
- [ ] ≥20% bieli, max 3 kolory + 1 akcent
- [ ] Mandala/ślad do wodzenia obecny (centrum lub TraceLine)
- [ ] Zadanie proprioceptywne obecne
- [ ] Instrukcja ≤20 słów, 2. os. „Pokoloruj, Powiedz…”
- [ ] Empty/loading/error nie dotyczy PDF; dla galerii web — empty state obecny

## 12. Bibliografia (źródła pierwotne)

- Sweller J. Cognitive Load Theory (1988) — via LessonCraft 2024.
- Mayer R. 12 Principles Multimedia Learning (2009); 5 extraneous principles — via Nature 2025-07-02.
- Clinton et al. Eye-tracking revising visuals — signaling/contiguity/coherence, ERIC ED574984.
- Prachi Mittal Designed to Propel — Gestalt w K-5, DSource.
- Zorzi et al. PNAS 2012 — extra-large spacing dyslexia.
- Perea et al. Learning & Instruction 2012 — inter-letter spacing preschool.
- Hakvoort et al. JECP 2017 — spacing accuracy wszyscy.
- Galliussi et al. Ann Dyslexia 2020 — spacing vs letterform.
- Masulli et al. Vision Res 2018 — eye-tracking spacing.
- Hebrew LS 150% — MDPI Educ Sci 2024 15/1306 — developmental LS.
- Singh et al. Cureus 2023 — mandala ADHD executive RCT.
- Li & Sun 2023 TPPC — mandala 3-6 attention.
- SciTechnol 2023 — mandala BRIEF ADHD.
- Dhammathas 2020 — mandala CPT/Corsi at-risk.
- Shankar & Amir CE 2020 — mandala Year3 focus.
- Cesur 2025 — mandala SLD perceptual d.
- Becker & Sylvan LSHSS 2021 — articulatory + phonemic.
- Becker & Ghanim Perspectives 2025 — literacy in SSD therapy.
- KNUTD 2024 APSD — picture book color/composition 2-7.

---

**Next vector:** zaimplementować `ColoringTile+MandalaCenter` na 1 karcie pilot (`syczacy`) → przetestować z 3 dzieci 4-6 lat (8 min, obserwacja: czy wodzą palcem całą mandalę? czy nazywają P/S/K bez podpowiedzi?) → jeśli tak, propagować na `themed.tsx` 56 kart.
