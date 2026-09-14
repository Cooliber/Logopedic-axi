# Logopedia — Karty Pracy do Druku

Kontekst tworzenia drukowanych kart pracy logopedycznej dla dzieci (PDF A4, doodle, grywalizacja) — jedna karta to narzędzie terapeutyczne + obiekt do zabawy.

## Language

**Szereg**:
Zestaw głosek trenowanych razem (syczący `s z c dz`, szumiący `sz ż cz dż`, ciszący `ś ź ć dź`, rotacyzm `r`). Jądro terapii, 1 szereg na kartę.
_Avoid_: grupa, seria, bundle

**Temat**:
Skórka narracyjna karty (kosmos, zwierzaki, dinozaury, pojazdy, ocean, las, jedzenie, sport, dom, ubrania, pogoda, muzyka, ogród, miasto). Nie zmienia słów terapeutycznych, tylko wizualną opowieść.
_Avoid_: motyw, skin, theme (ang. dopuszczalne w kodzie jako ThemeId, ale w domenie Temat)

**Pozycja**:
Miejsce głoski w słowie: P (początek/nagłos), S (środek/śródgłos), K (koniec/wygłos). Kolor: P zielony, S żółty, K pomarańczowy. Balans 5:4:3, start od P.
_Avoid_: initial/medial/final (ang.), nagłos/śródgłos/wygłos jako synonimy Pozycji — używaj skrótu P/S/K

**Głoska**:
Pojedynczy dźwięk mowy trenowany w izolacji/sylabach/słowach (np. `s`, `sz`, `ś`, `r`). Różna od litery.
_Avoid_: dźwięk, litera, fonem (zbyt ogólne), sound (ang.)

**Słowo treningowe**:
Konkretne, obrazowalne słowo znane dziecku zawierające głoskę w oznaczonej Pozycji (np. SOWA P, KOS S). Zawsze z Pozycją, nigdy bez.
_Avoid_: wyraz (dopuszczalne potocznie, ale Słowo treningowe jest precyzyjne), hasło, entry

**Karta**:
Jedna strona A4 do druku i laminowania, 6 modułów (M1-M7) + personalizacja. Jednostka terapii (8-10 min) i jednostka produktu (1 PDF = 1 slug).
_Avoid_: template (ang., w kodzie TemplateSlug), strona, arkusz

**Moduł**:
Wymienny klocek karty o kontrakcie wysokości/obrazków/tekstu (M1 header 64px, M2 personalization 32px, M3 hierarchy 28px, M4 hero 108px, M5 words 260px, M6 exercises 180px, M7 closing 72px). Suma 744px <940 A4.
_Avoid_: sekcja, blok, component (zbyt ogólne), box

**Konstelacja**:
Zbiór słów treningowych dla pary Temat×Szereg (np. kosmos-syczący → SATELITA, SONDA...). Źródło `WORD_POOLS[temat][szereg]` lub `BASE_WORDS` fallback.
_Avoid_: pula, pool (ang. w kodzie WORD_POOLS, ale w domenie Konstelacja), zestaw

**Poziom**:
Wariant trudności tej samej Karty: `easy` (8 słów, hideTimer, mouthVisual) vs `standard` (12 słów). Wynika z profilu neuro, nie z nowego slugu.
_Avoid_: level (ang.), trudność (zbyt ogólne), wariant

**Profil**:
Wynik 2-min próby papierowej (4 minimal pairs + 1-min challenge + wiek) → `hideTimer`, `mouthVisual`, `wordsCount`. Fuzzy jak Cognitia.
_Avoid_: assessment, diagnoza, test (zbyt kliniczne)

**Slag / Slug**:
Identyfikator Karty w URL: bazowy (`syczacy`) lub tematyczny (`syczacy-kosmos` = szereg-temat). 67 slugów = 11 bazowych +56 tematycznych.
_Avoid_: slug (ang. w kodzie TemplateSlug, ale w domenie Slag dla spójności z polskim), id

**Grywalizacja**:
System motywacji na Karcie: XPTracker (5 gwiazdek + misja), StickerStrip (4 naklejki do wycięcia), SelfRating (Super/OK/Jeszcze), InstructionCard (3 kroki), OneMinuteChallenge.
_Avoid_: gamification (ang.), nagrody (zbyt wąskie)

**EKO**:
Tryb białego tła (`eko=true` → `#FFFFFF`) oszczędzający tusz, zachowujący obrysy. Nie zmienia treści, tylko tło.
_Avoid_: eco, oszczędny (potocznie OK, ale EKO jest kanoniczne)

**Doodle**:
Styl wizualny: hand-drawn, thick outline 2.5px, pastel, rounded 22px, dashed 2.5px, pure white tło. Presety: doodle, doodleColoring, kawaii, watercolor, flat, clay.
_Avoid_: styl, theme (wizualny), flat (jako osobny styl, nie synonim doodle)
