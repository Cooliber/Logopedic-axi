---
name: karty-logopedyczne
description: Tworzenie drukowanych kart pracy logopedycznej dla dzieci w PDF do druku i laminowania. Zasady metodyczne terapii głosek (szeregi, pozycje P/S/K, etapy pracy), stylistyka doodle, grywalizacja oraz reguły poprawnego języka polskiego. Używaj gdy tworzysz, modyfikujesz lub rozszerzasz materiały logopedyczne (szablony PDF, karty pracy, planszówki, dyplomy, naklejki) w tym projekcie.
user-invocable: true
argument-hint: "[szereg/karta do stworzenia, np. syczacy | szumiacy | ciszacy | rotacyzm | plynnosc | planszowka | dialog | oddech | nowa-karta]"
---

# KARTY LOGOPEDYCZNE — Skill Tworzenia Materiałów

Tworzymy **drukowane karty pracy logopedycznej** dla dzieci — PDF gotowe do druku A4 i laminowania. Każda karta to jednocześnie **precyzyjne narzędzie terapeutyczne** i **przyjazny dla dziecka obiekt** w stylistyce doodle.

Stack: **Next.js 16 + Takumi** (WASM PDF, zero headless browser). Szablony w `src/lib/pdf/templates/*.tsx`, galeria w `src/components/pdf/`.

---

## §0 FILOZOFIA

### Co robimy
Materiały, które **naprawdę pracują terapeutycznie** i które dziecko chce wypełniać. Każda karta prowadzi dziecko przez zaplanowany etap terapii głoski, ma czytelną instrukcję dla rodzica i system motywacji (XP, misje, samoocena).

### Czego NIE robimy
- Doboru wyrazów bez sensu metodycznego (losowe słowa, bez pozycji głoski)
- Głosek spoza obszaru terapii na karcie (np. r na karcie syczącej)
- Wyrazów nieznanych dziecku lub abstrakcyjnych jako przykłady treningowe
- Stylistyki i języka książkowego zamiast zachęty i zabawy
- TODO, placeholderów, tekstów "tutaj będzie"
- Kabareckich "śmiesznych" obrazków bez funkcji terapeutycznej

### DNA Projektu (ustalone fakty)
| Element | Wartość |
|---|---|
| **Język** | Polski (karty, instrukcje, UI) |
| **Format** | PDF A4, margin 0 (padding w szablonie), do druku i laminowania |
| **Renderer** | `takumi-pdf/next` + `@takumi-rs/helpers` googleFonts (wymaga network) |
| **Styling** | Takumi `tw` prop (Tailwind subset), `twExtra` w własnych komponentach |
| **Paleta** | `kidPalette` z `src/lib/pdf/theme.ts`, doodle: rounded 22px, dashed 2.5px |
| **Props** | `TemplateProps { name?, date?, eko? }` + `PersonalizationBar` obowiązkowo |
| **EKO** | `eko=true` → białe tło, oszczędny tusz |
| **Symbole** | W PDF zakaz emoji i symboli spoza Latin-1 + polskie znaki (`✂` → `-`, `★` → `*`) |
| **Slugi** | 67 (11 bazowych + 56 tematycznych: 14 tematów × 4 szeregi) — pełne pokrycie |
| **Konstelacje** | `src/lib/pdf/themes/constellations.ts` — `wordToHfPrompt` / `buildConstellation` / `hfManifest` dla agenta HF (doodle prompt per słowo, cover prompt per temat) |
| **Tematy** | 14 tematów w `src/lib/pdf/themes/catalog.ts` (kosmos, zwierzaki, dinozaury, pojazdy, ocean, las, jedzenie, sport, dom, ubrania, pogoda, muzyka, ogród, miasto) |
| **Doodle** | `react-doodle-icons` (439 ikon) + custom `wordSvg` → dataURI `<img>` w PDF |
| **Kategorie** | szeregi, tematyczne, płynność, gry, dialog, oddech, sklep, nagrody |

---

## §1 WŁAŚCIWOŚCI MATERIAŁÓW — co MUSI mieć dobra karta

Każda karta pracy logopedycznej ma **zdefiniowane miejsce w terapii** i jasne właściwości:

### 1.1 Konkretny cel terapeutyczny
- **Jeden szereg / jeden problem** na kartę. Karta sycząca to tylko `s z c dz`. Nie ma mieszanki.
- **Jeden etap pracy** dominuje (wywołanie → utrwalanie → automatyzacja). Karta jest podpisana, do którego etapu służy (lub jest to logicznie czytelne).
- Słowa treningowe zawierają **poprawnie brzmiące** głoski trenowanego szeregu (nigdy wyrazów, w których dziecko się myli).

### 1.2 Pozycje głoski (P / S / K)
Każde słowo treningowe jest oznaczone pozycją głoski: **P**oczątek, **S**rodek, **K**oniec. To konwencja projektu (`PositionLegend` w `shared.tsx`), kod kolorem:

| Pozycja | Kolor | Znaczenie | Przykład (s) |
|---|---|---|---|
| **P – początek** | Zielony | Głoska w nagłosie | **S**OK, **S**OWA |
| **S – środek** | Żółty | Głoska w śródgłosie | NA**S**, PIE**S**IEK |
| **K – koniec** | Pomarańczowy | Głoska w wygłosie | KO**S**, GOŁĄ**S**IE |

**Reguła:** karta zaczyna od pozycji **P** (początku), najłatwiejszej do wywołania, potem **S**, na końcu **K**. Balansuj udział pozycji w zestawie słów (np. 5:4:3). Najpierw głoska bezdźwięczna (S, SZ, Ś), potem dźwięczna (Z, Ż, Ź) i afrykaty (C, CZ, Ć).

### 1.3 Dobór wyrazów
- **Słowa znane dziecku:** konkretne, obrazowalne, z semantyki dziecięcej (zwierzęta, jedzenie, dom, zabawki, sport).
- **Bogactwo pozycji:** różne pozycje głoski (P/S/K) — dziecko trenuje głoskę w różnych miejscach wyrazu.
- **Poziom trudności:**
  - **Sylaby i wyrazy proste** → do wywołania i utrwalania pierwszego w kontakcie z jedną samogłoską.
  - **Wyrazy dłuższe i frazy** → do utrwalania w kontekście.
  - **Zdania i miniteksty** → do automatyzacji.
- **Bez zakamarków fonetycznych:** omijamy wyrazy z głoskami, których dziecko jeszcze nie opanowało — prostsze słowa zamiast trudnych (SOBOTA lepiej niż ŚRODA na karcie S).
- **Bez konfliktów z głoskami spoza terapii:** na karcie syczącej nie dominują wyrazy z R (np. TRABKA na karcie S to konflikt — R bywa niewywołane).

### 1.4 Sekwencja ćwiczeń (mini-lekcja na karcie)
1. **Rozgrzewka / masaż artykulacyjny** (1 lub 2 proste zadania przygotowujące)
2. **Praca główna z głoską** (słowa w bańkach, pozycja P/S/K, powtórzenia)
3. **Rozszerzenie kontekstu** (ślad węża do wodzenia palcem, sylaby, sylabowanie)
4. **Zamknięcie** (misja, samoocena, miejsce na naklejkę, nagroda)

### 1.5 Grywalizacja — obowiązkowo
- **XPTracker z misją** (`shared.tsx`) np. „MISJA: 12 słów" + pasek postępu.
- **Miejsca na naklejki** (ramki/kółka 20px) — dziecko przykleja naklejkę po zadaniu.
- **Samoocena** (`SelfRating`): emotki/odceny (kredka do zaznaczenia).
- **Instrukcja wizualna** (`InstructionCard`): 3 kroki (ikony/litery w kółkach), czas zadania (8–10 min).
- **Tory/misje** (np. rzut kostką w planszówce) i **ParentTip** — wskazówka dla rodzica/opiekuna.

### 1.6 Personalizacja
- `PersonalizationBar`: pole imienia i daty (props `name`, `date`).
- Karta jest **personalna dla konkretnego dziecka** — nigdy generyczna „do wszystkich".

### 1.7 Użyteczność druku i laminowania
- **EKO mode** (`eko=true` → białe tło, zużycie tuszu). Kolorowe nagłówki tylko gdzie mają funkcję.
- **Marginesy** wystarczające na laminowanie lub dziurkowanie (min. 10–15 mm).
- **Linia cięcia** (`CuttingLine`) do wycinanki z przestrzenią dla nożyczek.
- Rozmiar fontów: słowa treningowe min. 11–12pt w bańkach, nagłówek min. 18pt, instrukcja min. 8–9pt.

---

## §2 METODYKA TERAPII GŁOSEK — uporządkowana wiedza

### 2.1 Etapy terapii artykulacyjnej
1. **Etap przygotowawczy:** usprawnianie narządów mowy (motorika wargów, języka, podniebienia), ćwiczenia oddechowe (pogłębianie wdechu, wydłużenie wydechu), słuchowe, rytmizujące.
2. **Wywołanie głoski:** uzyskanie prawidłowej artykulacji w izolacji (np. „s...") — linia środkowa języka, dmuchanie, pojedyncze sylaby.
3. **Utrwalanie:** głoska w izolacji i sylabach (SA-SU-SY-SE-SO-SĄ), następnie w wyrazach na różnych pozycjach (P/S/K).
4. **Automatyzacja:** wyrazy → frazy → zdania → teksty — w naturalnym tempie mowy, w wypowiedziach spontanicznych.

> Każda karta pracy jest wejściem do konkretnego etapu. Karty nie są „pojedyncze" — powiązane są stopniem trudności.

### 2.2 Szeregi głosek polskich
| Szereg | Głoski | Szablon | Kolorystyka |
|---|---|---|---|
| **Szumiący** | SZ, Ż, CZ, DŻ | `szumiacy` | zielony (`kidPalette.szum`) |
| **Syczący** | S, Z, C, DZ | `syczacy` | żółty (`kidPalette.sycy`) |
| **Ciszących** | Ś, Ź, Ć, DŹ | `ciszacy` | niebieski+fiolet (`kidPalette.cisz`) |
| **Rotacyzm** | R | `rotacyzm` | pomarańczowy (`kidPalette.r`) |
| **Płynność mowy** | tempo, frazowanie | `plynnosc` | niebieski-cyjan (`kidPalette.plynnosc`) |
| **Oddech** | wdech/wydech, siła strumienia | `oddech` | czerwień+turkus (`kidPalette.oddech`) |
| **Dialog / komunikacja** | zdania, synonimy, opis | `dialog` | fiolet (`kidPalette.dialog`) |
| **Planszówka** | gra i ruch | `planszowka` | róż (`kidPalette.planszowka`) |

**Kolejność terapii przy seplenieniu międzyzębowym** (pełne zaburzenie): najpierw szumiący → potem syczący → na końcu ciszący. Nie wywołujemy wszystkich głosek szeregu naraz — pojedynczo.

### 2.3 Wyrazy treningowe właściwie
- Wyrazy powinny być **ortograficznie poprawne** (klasyczne polskie słowa, nie zniekształcony zapis).
- Omijamy wyrazy, w których dziecko ma **inne wady wymowy** (np. na karcie S nie dominują słowa z „rz" lub ze szeregiem szumiącym).
- Wyrazy częste w codziennym kontakcie z dzieckiem (np. SOK, ZUPA, DOM).
- Sylabowanie: sylaby otwarte (SA, SU, SY), zamknięte (SAS, SUS), grupy spółgłoskowe (PSY) — stopniowo.

---

## §3 STYLISTYKA WIZUALNA — doodle design system

### 3.1 Filozofia doodle
- **Zaokrąglone karty** (`radiusLg: 24px`), **przerywane obwódki** (`borderDashed: "2px dashed"`), pastelowe plamy koloru + żywy akcent.
- Brak surowych tabel — zamiast tego karty `DottedCard`, ramki, bańki `WordBubble`.
- Każdy element ma soft shadow (`cardShadow: "0 2px 0 rgba(0,0,0,0.08)"`).

### 3.2 Paleta per szereg/karta
Bierz z `kidPalette`: `primary` (tło bańki), `secondary` (akcent), `accent` (dodatkowy), `light` (jasne pole), `dark` (tekst), `border`. Nigdy nie mieszaj w jednej karcie 4+ kolorów — 3 kolory bazowe + 1 akcent.

### 3.3 Typografia
- **W PDF:** fonty ładowane przez `googleFonts` (przy offline polskie znaki mogą nie działać — sprawdź).
- **Zakaz `fontFamily` z przecinkami** (Takumi nie parsuje).
- Styl: **czytelny, zaokrąglony, „dziecięcy"** — w bańkach słów może być wyrazisty (bold/extra-black), w instrukcji zwykły bold.
- **Wymagane pełne pokrycie polskich znaków**: `ąćęłńóśźżĄĆĘŁŃÓŚŹŻ`.

### 3.4 Layout karty (A4)
```
Pasek personalizacji (imię, data)
────────────────────────────
Nagłówek (PageHeader): tytuł, podtytuł, badge wiek (np. 1-3)
────────────────────────────
InstructionCard (3 kroki + czas)   |   XPTracker (misja)
────────────────────────────
Legenda P/S/K + TIP (polecenie)
────────────────────────────
Słowa w bańkach (WordBubble grid)
────────────────────────────
Szlak do wodzenia (TraceLine)   |   Ćwiczenia dodatkowe
────────────────────────────
SelfRating (emotki)             |   Naklejki (StickerStrip)
────────────────────────────
ParentTip + FooterBar
```

### 3.5 Ikony i symbole — doodle system
- W PDF **nie ma emoji** — ikony jako litery w kółkach (`<span tw="rounded-full">S</span>`), strzałki: `-` zamiast `→`, gwiazdki: `*` zamiast `★`, nożyczki: `-` zamiast `✂`.
- **Doodle icons:** `react-doodle-icons` (439 ikon, MIT) re-export w `src/lib/pdf/icons.tsx` + custom `wordSvg` (hand-drawn SVG → dataURI via `svgWrap` → `<img src={wordToDataUri(w)}>`) dla każdego słowa. W PDF doodle jako `<img src={dataUri}>` (Takumi wspiera data:image/svg+xml), w web jako React component.
- **Tematy:** każdy temat ma dedykowany kolor + emoji (web) + doodle hero (PDF: `theme.emoji` + `wordSvg` dekoracyjne). Słowa treningowe zawsze mają `iconSrc={wordToDataUri(w)}` — fallback do litery w kółku gdy brak SVG.
- Dodając nowe słowo: dopisz SVG do `wordSvg` w `icons.tsx` (24×24 viewBox, stroke 1.8, rx 12, dashed border), przetestuj `wordToDataUri("NOWESŁOWO")`.
- W webowej galerii (`GalleryWithFilters`) normalnie emoji + Tailwind className + filtr tematyczny.

### 3.7 System tematyczny — sesja za sesją do pełnego coverage
- **Katalog tematów:** `src/lib/pdf/themes/catalog.ts` — 14 tematów (kosmos, zwierzaki, dinozaury, pojazdy, ocean, las, jedzenie, sport, dom, ubrania, pogoda, muzyka, ogród, miasto). Każdy `Theme { id, label, emoji, color, light, blurb }`.
- **Pule słów:** `src/lib/pdf/themes/wordPools.ts` — `WORD_POOLS[theme][szereg] = WordEntry[]` + `BASE_WORDS[szereg]` fallback. Pilot: kosmos/zwierzaki/pojazdy/ocean w pełni (min 12 słów P/S/K per szereg), reszta pusta → uzupełniamy sesja 2-4.
- **Factory:** `src/lib/pdf/templates/themed.tsx` — `ThemedTemplate({ theme, szereg, name, date, eko })` + `makeThemedComponent(theme, szereg)` reģistruje slug `{szereg}-{temat}` w `templates/index.ts` (kategoria `tematyczne`).
- **Slugi:** `syczacy-kosmos`, `szumiacy-ocean` itd. — obsługiwane przez `GET /api/pdf/[slug]` (stripEmoji + render). Docelowo 56 tematycznych (14×4) + 7 bazowych = 63 karty.
- **DoD sesji tematycznej:** 4 tematy × 4 szeregi = 16 nowych kart, każda z unikalnym `wordSvg` dla nowych słów, każda renderuje PDF >50KB, galeria pokazuje nowy filtr tematyczny, `bun run build` przechodzi.
- **Roadmap:** Sesja 1 pilot (kosmos/zwierzaki/pojazdy/ocean) ✅, Sesja 2: dinozaury/las/jedzenie/sport, Sesja 3: dom/ubrania/pogoda/muzyka, Sesja 4: ogród/miasto + poziomy trudności + weryfikacja ortografii.

### 3.6 EKO i druk
- `eko=true` → `backgroundColor: "#FFFFFF"`; minimalne zużycie tuszu, białe tło.
- Zwiększ obszary bieli między elementami; unikaj dużych pełnych plam koloru.
- Sprawdź: `Content-Disposition: inline`, plik `> 50KB` przy generacji.

---

## §4 POPRAWNY JĘZYK POLSKI — zasady obowiązujące w materiałach

Każdy tekst w karcie jest **wzorcem dla dziecka** — ortografia, interpunkcja, formy językowe muszą być wzorcowe.

### 4.1 Ortografia podstawowa
- **Ogonki obowiązkowe wszędzie**: `ą, ć, ę, ł, ń, ó, ś, ź, ż` — w każdym foncie i wszystkich tekstach, także nagłówkach (np. „Szereg syczący", nie „Szereg syczacy").
- **Wielka litera** na początku zdań, w tytułach, nagłówkach, imionach.
- **Nie piszemy całych fraz wersalikami** — wyjątek: słowo treningowe w bańce (to trening głoski). Pozostałe napisy piszemy normalnie.

### 4.2 Pisownia i interpunkcja
- Cudzysłowy polskie: „dolne-górne". Przykład: Powiedz „sok" głośno.
- Liczby z jednostkami zapisujemy zwięźle: `8-10 min`, kropka na końcu zdania.
- Wyrazów nie dzielimy na końcach linii (druk, czytelność).
- Przecinki przed „który", „ponieważ", „żeby" zachowujemy.

### 4.3 Pisownia łączna i rozdzielna (najczęstsze błędy)
- **„nie" z czasownikami piszemy osobno**: nie mówi, nie koloruj. Razem tylko w wyrazach o znaczeniu przeciwnym (rzadkie: niechętnie).
- **„nie" z rzeczownikami i przymiotnikami** — sprawdź znaczenie przeciwstawne/zaprzeczenie.
- **„z / ze", „w / we"** stosujemy według wymowy: ze mną, we wtorek, w domu, z domu.

### 4.4 Instrukcje — forma i ton
- Tryb rozkazujący 2. osoba liczby pojedynczej: **„Pokoloruj kropkę"**, **„Powiedz głośno słowo"**, **„Przelicz zwierzęta"**.
- Maksymalnie 3 kroki (ikony w kółkach 1→2→3): `["Słuchaj", "Mów", "Koloruj"]`.
- Ton: **zachęta i wsparcie**, nie ocena. Zamiast „Musisz…" ― „Spróbuj…", „Zabawa na czas: 8-10 min".
- Zamiast negacji ― umocnienie: „Nie martw się, gdy się pomylisz" zamiast „Nie bądź zły".
- **Język prosty dla rodzica** (ParentTip) ― terminologia logopedyczna po ludzku: „Wywołanie S" → „Pokaż, jak syczy wąż: s-s-s".

### 4.5 Słowa treningowe ― poprawność ortograficzna
- Wszystkie wyrazy treningowe to **prawdziwe polskie słowa** (sylaby treningowe SA-SU-SY to osobna kategoria ćwiczeń).
- Sprawdzamy pisownię najczęstszych słów przed użyciem: SOK, ZUPA, CYTRYNA, DZWON, KOC, DZIK.
- Dwuznaki piszemy poprawnie: ŻABKA, ŻÓŁW, RZADKO (nie „ZABKA", nie „ZÓŁW").

### 4.6 Narracja i opisy w web/UI
- W galerii i kreatorze (`/kreator`) teksty poprawne, bez literówek, naturalnie brzmiące, w duchu motywacyjnym.
- Nagłówki sekcji w formie podstawowej: „Gry i zabawy", „Nagrody", „Ćwiczenia oddechowe".

### 4.7 Lista typowych pułapek (zakazane)
- „na codzień" → poprawnie **codziennie** lub **na co dzień**.
- Powtórzenia typu „chce się bawić się" → „Pies chce się bawić".
- Braki ogonków: „czesto" → **często**, „wykonac" → **wykonać**.
- Zbitki bez sensu lub niepolskie sformułowania w instrukcjach.

---

## §5 WORKFLOW TWORZENIA NOWEJ KARTY

### Krok 1: Definicja (koncepcja)
1. Jaki szereg / problem (syczący, rotacyzm, płynność…)?
2. Czy karta wspiera **wywołanie**, **utrwalanie**, czy **automatyzację**?
3. Jaki przedział wiekowy (badge np. „1-3", „4-6", „7+")?
4. Jaka motywacja (misja, narracja dziecięca, zwierzę)?

### Krok 2: Panel treningowy
- Dobierz słowa z pozycjami P/S/K (balans 5:4:3).
- Wybierz rozgrzewkę (np. masaż, wodzenie palcem, powtórki).
- Dodaj minigawkę / samoocenę / miejsce na naklejki.

### Krok 3: Implementacja
1. Stwórz `src/lib/pdf/templates/{nazwa}.tsx`, użyj komponentów z `shared.tsx`.
2. Eksportuj w `templates/index.ts`, rejestruj slug.
3. Testuj: `bun --bun` render → PDF >50KB, brak błędów fontów.
4. `bun run build` przechodzi.

### Krok 4: Kod kolorystyczny i działanie
- Bierzesz `kidPalette.[seria]`; mapujesz DottedCard, WordBubble, PageHeader.
- `eko` obsługujesz każdym tłem (`style={{backgroundColor: eko ? "#FFFFFF" : color}}`).
- Upewnij się, że polskie znaki są obsługiwane przez font Google Fonts.

### Krok 5: Weryfikacja
- Ortografia wszystkich napisów jednolita i poprawna.
- Słowa treningowe: brak literówek, poprawność, pozycje P/S/K.
- Zgodność ze stylistyką druku i wymiarami.

---

## §6 CHECKLISTA PRZED PUBLIKACJĄ

### Merytoryka
- [ ] Jeden szereg / cel na kartę
- [ ] Słowa treningowe poprawne i pozycjonowane (P/S/K)
- [ ] Brak głosek spoza terapii (konflikty)
- [ ] Sekwencja: rozgrzewka → praca główna → rozszerzenie → zamknięcie

### Język polski
- [ ] Ogonki obecne we wszystkich tekstach (ąćęłńóśźżĄĆĘŁŃÓŚŹŻ)
- [ ] „nie" pisane zgodnie z zasadami, „z/ze", „we/w" poprawnie
- [ ] Tryb rozkazujący, zachęcający ton, zero błędów ortograficznych
- [ ] Cudzysłowy polskie („…"), prostota i zrozumiałość

### Design
- [ ] Doodle: rounded 22px, dashed 2.5px, soft shadow
- [ ] Karta z XPTracker, samooceną, naklejkami, PersonalizationBar, ParentTip
- [ ] EKO mode działa (białe tło), marginesy do druku
- [ ] Wielkości fontów: min. 11–12pt słowa treningowe, 8–9pt instrukcja
- [ ] Brak emoji w PDF, litery w kółkach zamiast symboli

### Technika
- [ ] `bun run build` przechodzi
- [ ] `bun --bun` render PDF, plik >50KB
- [ ] GET /api/pdf/{slug}?name=Ania&date=2026-09-07&eko=1 → Content-Type: application/pdf, inline

---

## §7 ANTI-PATTERNS (czego NIGDY nie rób)

### 🚫 Metodyczne
- Słowa treningowe z błędną głoską (np. błędna pisownia lub wyrazy nieistniejące)
- Mieszanie szeregów głosek na jednej karcie
- Wyrazy za długie lub z innymi trudnymi głoskami (TRZASK na karcie S)
- Bez etapu pracy (albo wszystko naraz)
- Bez pozycji P/S/K lub z błędnym kolorem

### 🚫 Językowe
- Brak ogonków (`sycacy` zamiast `syczący`)
- „nie" z czasownikami łącznie: „niemówić"
- Angielskie zapożyczenia w instrukcjach dziecięcych
- Błędy ortograficzne (literówki, zdublowane słowa), niepoprawne liczebniki

### 🚫 Design
- Surowe tabele, ostre kanty, twarde gradacje
- Emoji w szablonach PDF
- Atrybuty klas CSS (np. `font-sans`) zamiast `tw` w szablonach Takumi
- Duże ciemne plamy przy `eko=true` (łamanie zasady oszczędności tuszu)
- Layout bez miejsca na imię/datę lub czysto kopiowany z innych kart
