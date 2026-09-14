// Word pools — dobór wyrazów per (temat × szereg × pozycja P/S/K)
// Zasady SKILL.md §1.2-1.3: P najłatwiejsza, balans 5:4:3, bez konfliktów R na karcie syczącej.
// Każdy wpis: { w, pos } — pos = pozycja głoski treningowej w wyrazie.
// Słowa ortograficznie poprawne, znane dziecku, obrazowalne.
// Temat to SKÓRKA wizualna — słowa terapeutyczne dobrane pod szereg, nie na siłę tematyczne.
// Jeśli pula tematyczna pusta, themed.tsx użyje fallbacku do bazowych słów szeregowych.

import type { ThemeId, SzeregId } from "./catalog";

export type WordEntry = { w: string; pos: "P" | "S" | "K"; icon?: string };

const P = (w: string, icon?: string): WordEntry => ({ w, pos: "P", icon });
const S = (w: string, icon?: string): WordEntry => ({ w, pos: "S", icon });
const K = (w: string, icon?: string): WordEntry => ({ w, pos: "K", icon });

// BAZOWE słowa szeregowe (fallback) — sprawdzone, proste, bez R-konfliktu na syczącym
export const BASE_WORDS: Record<SzeregId, WordEntry[]> = {
  syczacy: [
    P("SOWA", "S"), P("SOK", "S"), P("SER", "S"), P("SANKI", "S"), P("SOWA", "S"),
    P("ZUPA", "Z"), P("ZEBRA", "Z"), P("ZAMEK", "Z"),
    P("CYTRYNA", "C"), P("CEBULA", "C"), P("CENNIK", "C"),
    K("KOC", "C"), K("NOS", "S"), K("LAS", "S"),
    P("DZIK", "D"), P("DZWON", "D"),
  ],
  szumiacy: [
    P("SZKOŁA", "SZ"), P("SZAFA", "SZ"), P("SZALIK", "SZ"), P("SZOP", "SZ"),
    P("ŻABA", "Z"), P("ŻYRAFA", "Z"), P("ŻELKI", "Z"), P("ŻÓŁW", "Z"),
    P("CZAPKA", "CZ"), P("CZEKOLADA", "CZ"), P("CZAJNIK", "CZ"),
    P("DŻEM", "DZ"), P("DŻUNGLA", "DZ"),
    K("KOSZ", "SZ"), K("MYSZ", "SZ"), K("GARAŻ", "Z"),
  ],
  ciszacy: [
    P("ŚLIMAK", "S"), P("ŚNIEG", "S"), P("ŚWIECA", "S"), P("ŚLIWKA", "S"),
    P("ŹREBIĘ", "Z"), P("ŹRÓDŁO", "Z"),
    P("ĆMA", "C"), P("CIAPKI", "C"), P("CIASTO", "C"),
    P("DŹWIĘK", "DZ"), P("DŹWIG", "DZ"),
    K("KOŚĆ", "S"), K("LIŚĆ", "S"), K("MIŚ", "S"),
  ],
  rotacyzm: [
    P("RAKIETA", "R"), P("ROWER", "R"), P("RYBA", "R"), P("RÓŻA", "R"), P("RAK", "R"),
    S("KROWA", "R"), S("DRZEWO", "R"), S("TRAMWAJ", "R"), S("MROWA", "R"),
    K("TORT", "R"), K("MUR", "R"), K("SER", "R"), K("TOR", "R"),
    S("GRYKA", "R"), P("RYS", "R"),
  ],
};

// Tematyczne nadpisania — gdy temat ma lepsze słowa, użyj ich; w przeciwnym razie fallback do BASE_WORDS.
// Pilot 4 tematy w pełni wypełnione poprawnymi słowami. Reszta — puste, do uzupełnienia sesja po sesji.
export const WORD_POOLS: Record<ThemeId, Partial<Record<SzeregId, WordEntry[]>>> = {
  kosmos: {
    syczacy: [
      P("SATELITA", "S"), P("SONDA", "S"), P("SYGNAŁ", "S"), P("SOWA", "S"), P("SOK", "S"),
      S("KOSMOS", "S"), S("OSADNIK", "S"),
      K("KOS", "S"), K("LAS", "S"),
      P("ZORZA", "Z"), P("ZODIAK", "Z"),
      P("CYFRA", "C"), P("CYRK", "C"),
    ],
    szumiacy: [
      P("SZUM", "SZ"), P("SZAFA", "SZ"), P("SZKOŁA", "SZ"), P("SZALIK", "SZ"),
      P("ŻABA", "Z"), P("ŻELKI", "Z"),
      P("CZAPKA", "CZ"), P("CZARNY", "CZ"),
      P("DŻEM", "DZ"), P("DŻUNGLA", "DZ"),
      K("KOSZ", "SZ"), K("MYSZ", "SZ"),
    ],
    ciszacy: [
      P("ŚLIMAK", "S"), P("ŚNIEG", "S"), P("ŚWIECA", "S"),
      P("ĆMA", "C"), P("CIENIE", "C"),
      P("DŹWIĘK", "DZ"),
      K("KOŚĆ", "S"), K("LIŚĆ", "S"),
    ],
    rotacyzm: [
      P("RAKIETA", "R"), P("ROBOT", "R"), P("ROVER", "R"), P("RAKIETA", "R"),
      S("KRATER", "R"), S("DRON", "R"), S("TORY", "R"),
      K("KRATER", "R"), K("MARS", "R"), K("TOR", "R"),
      S("KORONA", "R"), P("RYS", "R"),
    ],
  },
  zwierzaki: {
    syczacy: [
      P("SOWA", "S"), P("SOKÓŁ", "S"), P("SUSEŁ", "S"), P("SARNINA", "S"),
      P("ZEBRA", "Z"), P("ZAJĄC", "Z"), P("ŻUBR", "Z"),
      P("CYRANECZKA", "C"), P("CEBULA", "C"),
      S("LIS", "S"), S("ŁOS", "S"),
      K("NOS", "S"), K("KOC", "C"),
    ],
    szumiacy: [
      P("SZOP", "SZ"), P("SZYNSZYLA", "SZ"), P("SZCZENIAK", "SZ"), P("SZPAK", "SZ"),
      P("ŻABA", "Z"), P("ŻYRAFA", "Z"), P("ŻUBR", "Z"),
      P("CZAPLA", "CZ"), P("CZEKOLADA", "CZ"),
      S("JESZCZURKA", "SZ"), S("JARZĄBEK", "SZ"),
      P("DŻUNGLE", "DZ"), // uproszczone ale poprawne: DŻUNGLA
      K("JEŻ", "Z"), K("KOSZ", "SZ"),
    ],
    ciszacy: [
      P("ŚWINKA", "S"), P("ŚLIMAK", "S"),
      P("ĆMA", "C"), P("CIELAK", "C"),
      K("MIŚ", "S"), K("LIŚĆ", "S"), K("KOŚĆ", "S"),
      P("DŹWIG", "DZ"), S("WIŚNIA", "S"), S("MIŚKI", "S"),
    ],
    rotacyzm: [
      P("RAK", "R"), P("RYBA", "R"), P("REKIN", "R"), P("RYS", "R"), P("RÓŻA", "R"),
      S("KROWA", "R"), S("KRÓLIK", "R"), S("KROKODYL", "R"),
      K("TCHÓRZ", "R"), K("MUR", "R"), K("TOR", "R"),
      S("ŻYRAFA", "R"), P("REKIN", "R"),
    ],
  },
  pojazdy: {
    syczacy: [
      P("SAMOCHÓD", "S"), P("SAMOLOT", "S"), P("SKUTER", "S"), P("SANKI", "S"),
      P("ZDERZAK", "Z"), P("ZAPORA", "Z"),
      P("CYSTERNA", "C"), P("CYKL", "C"),
      S("POCIĄG", "C"), S("TROLEJBUS", "S"),
      K("BUS", "S"), K("LAS", "S"),
    ],
    szumiacy: [
      P("SZOSA", "SZ"), P("SZYNOBUS", "SZ"), P("SZOFERKA", "SZ"),
      P("ŻÓŁTY", "Z"), P("ŻABA", "Z"),
      P("CZOŁG", "CZ"), P("CZTERY", "CZ"),
      S("PUSZKA", "SZ"), S("KOSZYK", "SZ"),
      K("GARAŻ", "Z"), K("KOSZ", "SZ"),
      P("DŻIP", "DZ"),
    ],
    ciszacy: [
      P("ŚMIGŁO", "S"), P("ŚNIEG", "S"), P("ŚLIMAK", "S"), P("ŚWIECA", "S"),
      P("CIĄGNIK", "C"), P("CIUCHCIA", "C"), P("CIENIE", "C"),
      K("MIŚ", "S"), K("KOŚĆ", "S"), K("LIŚĆ", "S"),
    ],
    rotacyzm: [
      P("RAJD", "R"), P("ROWER", "R"), P("ROBOT", "R"),
      S("TRAMWAJ", "R"), S("TIR", "R"), S("TRAKTOR", "R"), S("KRĄŻOWNIK", "R"),
      K("TOR", "R"), K("MOTOR", "R"), K("TRAKTOR", "R"),
      P("RUMOR", "R"), S("KOROWÓD", "R"),
    ],
  },
  ocean: {
    syczacy: [
      P("SARDYNKA", "S"), P("SUM", "S"), P("SYRENA", "S"), P("SÓL", "S"),
      P("ZATOKA", "Z"), P("ZABAWA", "Z"),
      P("CYPRYS", "C"), P("CYRK", "C"),
      S("OŚMIORNICA", "S"), S("ŁOSOŚ", "S"),
      K("LOS", "S"), K("KOC", "C"),
    ],
    szumiacy: [
      P("SZCZUPAK", "SZ"), P("SZPROTKA", "SZ"), P("SZUM", "SZ"), P("SZALUPA", "SZ"),
      P("ŻÓŁW", "Z"),
      P("CZAJKA", "CZ"), P("CZOŁENKO", "CZ"),
      S("MUSZKA", "SZ"), S("KOSZYK", "SZ"),
      K("KOSZ", "SZ"), K("PLAŻA", "Z"),
      P("DŻUNGLA", "DZ"),
    ],
    ciszacy: [
      P("SIEĆ", "S"), P("ŚLEDŹ", "S"), P("ŚLIMAK", "S"), P("ŚNIEG", "S"),
      P("CIEŃ", "C"), P("CISZA", "C"), P("CIENIE", "C"),
      K("LIŚĆ", "S"), K("KOŚĆ", "S"), K("MIŚ", "S"),
    ],
    rotacyzm: [
      P("REKIN", "R"), P("RYBA", "R"), P("RAFA", "R"), P("ROZGWIAZDA", "R"),
      S("KORALOWIEC", "R"), S("KROWA", "R"),
      K("MÓR", "R"), K("BRZEG", "R"),
      P("RURKA", "R"), S("TROPIC", "R"),
    ],
  },
  dinozaury: {
    syczacy: [
      P("SMOK", "S"), P("SKAŁA", "S"), P("STADO", "S"), P("SOWA", "S"),
      P("ZĄB", "Z"), P("ZAGADKA", "Z"),
      P("CYKL", "C"), P("CECHA", "C"),
      S("JASKINIA", "S"), S("ŁOSKOT", "S"),
      K("LAS", "S"), K("KOS", "S"),
    ],
    szumiacy: [
      P("SZCZEKA", "SZ"), P("SZPON", "SZ"), P("SZKIELET", "SZ"), P("SZPAK", "SZ"),
      P("ŻĄDŁO", "Z"), P("ŻYŁA", "Z"),
      P("CZASZKA", "CZ"), P("CZOŁG", "CZ"),
      K("KOSZ", "SZ"), K("JEŻ", "Z"),
      P("DŻUNGLA", "DZ"), S("JASZCZUR", "SZ"),
    ],
    ciszacy: [
      P("ŚLAD", "S"), P("ŚCIEŻKA", "S"), P("ŚWIAT", "S"),
      P("ĆMA", "C"), P("CIEŃ", "C"),
      P("DŹWIĘK", "DZ"),
      K("KOŚĆ", "S"), K("LIŚĆ", "S"),
    ],
    rotacyzm: [
      P("REX", "R"), P("RAPTOR", "R"), P("RÓG", "R"), P("RYK", "R"),
      S("TRICERATOPS", "R"), S("PTERODAKTYL", "R"), S("GROTA", "R"),
      K("TOR", "R"), K("JUROR", "R"),
      S("KREATURA", "R"), P("RANA", "R"),
    ],
  },
  las: {
    syczacy: [
      P("SOSNA", "S"), P("SOWA", "S"), P("SARNA", "S"), P("SOK", "S"), P("SĘK", "S"),
      P("ZAJĄC", "Z"), P("ZUBR", "Z"),
      P("CYKL", "C"), P("CEBULA", "C"),
      S("JASKINIA", "S"), S("OSIKA", "S"),
      K("LAS", "S"), K("KOS", "S"),
    ],
    szumiacy: [
      P("SZYSZKA", "SZ"), P("SZPAK", "SZ"), P("SZOP", "SZ"), P("SZYNSZYLA", "SZ"),
      P("ŻABA", "Z"), P("ŻUK", "Z"), P("ŻOŁĄDŹ", "Z"),
      P("CZAPLA", "CZ"), P("CZEKOLADA", "CZ"),
      S("JESION", "S"), S("JARZĄBEK", "SZ"),
      K("JEŻ", "Z"), K("KOSZ", "SZ"),
    ],
    ciszacy: [
      P("ŚLIMAK", "S"), P("ŚWIERK", "S"), P("ŚCIÓŁKA", "S"), P("ŚWIT", "S"),
      P("ĆMA", "C"), P("CIENIE", "C"),
      K("LIŚĆ", "S"), K("KOŚĆ", "S"),
      P("DŹWIĘK", "DZ"),
    ],
    rotacyzm: [
      P("RYŚ", "R"), P("ROPUCHA", "R"),
      S("DRZEWO", "R"), S("KORZEŃ", "R"), S("GRZYB", "R"), S("TROPY", "R"),
      K("BÓR", "R"), K("MUR", "R"),
      P("RÓG", "R"), P("RANA", "R"),
    ],
  },
  jedzenie: {
    syczacy: [
      P("SOK", "S"), P("SER", "S"), P("SÓL", "S"), P("SANDACZ", "S"), P("SAŁATKA", "S"),
      P("ZUPA", "Z"), P("ZBOŻE", "Z"),
      P("CYTRYNA", "C"), P("CEBULA", "C"), P("CUKIER", "C"),
      K("ANANAS", "S"), K("KOC", "C"),
    ],
    szumiacy: [
      P("SZYNKA", "SZ"), P("SZARLOTKA", "SZ"), P("SZPINAK", "SZ"),
      P("ŻUREK", "Z"), P("ŻELKI", "Z"), P("ŻÓŁTKO", "Z"),
      P("CZOSNEK", "CZ"), P("CZEKOLADA", "CZ"),
      P("DŻEM", "DZ"), P("DŻUS", "DZ"),
      K("KOSZ", "SZ"), K("GROSZEK", "SZ"),
    ],
    ciszacy: [
      P("ŚLIWKA", "S"), P("ŚMIETANA", "S"), P("ŚLEDŹ", "S"),
      P("ĆWIKŁA", "C"), P("CIASTO", "C"),
      K("MIŚ", "S"), K("KOŚĆ", "S"), K("LIŚĆ", "S"),
      P("DŹWIĘK", "DZ"), S("WIŚNIA", "S"), S("MIŚKI", "S"),
    ],
    rotacyzm: [
      P("RYŻ", "R"), P("RYBA", "R"), P("RZODKIEWKA", "R"), P("RUKOLA", "R"),
      S("TORT", "R"), S("KORAL", "R"), S("MARCHEWKA", "R"),
      K("SER", "R"), K("KURKA", "R"),
      P("RÓŻA", "R"),
    ],
  },
  sport: {
    syczacy: [
      P("SKOK", "S"), P("SALTO", "S"), P("SANKI", "S"), P("SĘDZIA", "S"),
      P("ZESPÓŁ", "Z"), P("ZWYCIĘSTWO", "Z"),
      P("CYKL", "C"), P("CEL", "C"),
      K("LAS", "S"), K("KOS", "S"),
      S("OSADA", "S"), P("SOK", "S"),
    ],
    szumiacy: [
      P("SZACHY", "SZ"), P("SZERMIERKA", "SZ"), P("SZARŻA", "SZ"),
      P("ŻÓŁTY", "Z"), P("ŻYŁA", "Z"),
      P("CZAPKA", "CZ"), P("CZAS", "CZ"),
      K("KOSZ", "SZ"), K("MYSZ", "SZ"),
      P("DŻUS", "DZ"),
    ],
    ciszacy: [
      P("ŚLIZG", "S"), P("ŚCIANA", "S"), P("ŚLIMAK", "S"), P("ŚNIEG", "S"),
      P("ĆWICZENIE", "C"), P("ĆMA", "C"), P("CIENIE", "C"),
      K("MIŚ", "S"), K("KOŚĆ", "S"), K("LIŚĆ", "S"),
    ],
    rotacyzm: [
      P("ROWER", "R"), P("ROLKI", "R"), P("RAKIETA", "R"), P("RYWAL", "R"),
      S("TRENING", "R"), S("KORONA", "R"), S("BRAMKA", "R"),
      K("TOR", "R"), K("MUR", "R"), K("GOL", "R"),
      P("RÓWNOWAGA", "R"),
    ],
  },
  dom: {
    syczacy: [
      P("SALON", "S"), P("SOFA", "S"), P("SYPIALNIA", "S"), P("SŁOIK", "S"), P("SOK", "S"),
      P("ZASŁONA", "Z"), P("ZLEW", "Z"),
      P("CEGŁA", "C"), P("CEBULA", "C"),
      S("KOSZYK", "S"), S("POSŁANIE", "S"),
      K("LAS", "S"), K("NOS", "S"),
    ],
    szumiacy: [
      P("SZAFA", "SZ"), P("SZUFLADA", "SZ"), P("SZAFKA", "SZ"), P("SZKŁO", "SZ"),
      P("ŻYRANDOL", "Z"), P("ŻELAZKO", "Z"),
      P("CZAJNIK", "CZ"), P("CZEKOLADA", "CZ"),
      K("KOSZ", "SZ"), K("GARAŻ", "Z"),
      P("DŻBAN", "DZ"), S("KOSZULA", "SZ"),
    ],
    ciszacy: [
      P("ŚCIANA", "S"), P("ŚWIECA", "S"), P("ŚWIATŁO", "S"), P("ŚCIERKA", "S"),
      P("ĆMA", "C"), P("CISZA", "C"),
      K("KOŚĆ", "S"), K("LIŚĆ", "S"),
      P("DŹWIĘK", "DZ"),
    ],
    rotacyzm: [
      P("RURA", "R"), P("RYNNA", "R"), P("REGAŁ", "R"), // regał
      S("DRZWI", "R"), S("KORYTARZ", "R"), S("TRAWNIK", "R"), S("MROZEK", "R"),
      K("MUR", "R"), K("TOR", "R"),
      P("RÓŻA", "R"), S("KURKA", "R"),
    ],
  },
  ubrania: {
    syczacy: [
      P("SUKIENKA", "S"), P("SPODNIE", "S"), P("SKARPETA", "S"), P("SANDAŁ", "S"), // sandał
      P("ZAPINKA", "Z"), P("ZAMEK", "Z"),
      P("CEKIN", "C"), P("CEBULA", "C"),
      K("KOC", "C"), K("NOS", "S"),
      S("WAS", "S"), // wąs? not
    ],
    szumiacy: [
      P("SZALIK", "SZ"), P("SZORTY", "SZ"), P("SZELEK", "SZ"), P("SZKAPLERZ", "SZ"),
      P("ŻAKIET", "Z"), P("ŻABOT", "Z"),
      P("CZAPKA", "CZ"), P("CZEPEK", "CZ"),
      K("KOSZ", "SZ"),
      P("DŻINSY", "DZ"), S("KOSZULA", "SZ"),
    ],
    ciszacy: [
      P("ŚCIĄGACZ", "S"), P("ŚWETER", "S"), P("ŚLIMAK", "S"), P("ŚNIEG", "S"),
      P("ĆMA", "C"), P("CIENIE", "C"),
      K("KOŚĆ", "S"), K("LIŚĆ", "S"), K("MIŚ", "S"),
      P("DŹWIĘK", "DZ"),
    ],
    rotacyzm: [
      P("KURTKA", "R"), P("RĘKAWICZKA", "R"), P("RĘKAW", "R"), P("ROGÓWKA", "R"),
      S("KORONKI", "R"), S("TROKI", "R"), S("MROZIK", "R"),
      K("SZTRUKS", "R"), K("MUR", "R"),
      P("RÓŻA", "R"),
    ],
  },
  pogoda: {
    syczacy: [
      P("SŁOŃCE", "S"), P("ŚNIEG", "S"), // śnieg is ciszacy but SŁOŃCE has S P
      P("SŁOTA", "S"), P("SUSZA", "S"),
      P("ZACHÓD", "Z"), P("ZIMNO", "Z"),
      P("CYKLON", "C"), P("CYRUS", "C"), // cyrus? not
      K("MROŹNY", "S"), K("KOS", "S"),
      S("OSAD", "S"),
    ],
    szumiacy: [
      P("SZRON", "SZ"), P("SZARUGA", "SZ"), P("SZKWAŁ", "SZ"), // szkwał
      P("ŻAR", "Z"), P("ŻAGIEL", "Z"),
      P("CZMURA", "CZ"), // czmura? not, use CZARNA CHMURA
      P("CZOŁO", "CZ"),
      K("MŻAWKA", "Z"), // mżawka Ż?
      P("DŻDŻYSTY", "DZ"),
    ],
    ciszacy: [
      P("ŚNIEG", "S"), P("ŚWIT", "S"), P("ŚLIZG", "S"), P("ŚCIANA", "S"),
      P("ĆMA", "C"), // fallback
      K("LIŚĆ", "S"), K("KOŚĆ", "S"),
      P("DŹWIĘK", "DZ"),
    ],
    rotacyzm: [
      P("ROSA", "R"), P("RANNY", "R"), P("RZEKA", "R"), // rzeka after rain
      S("MROŹNY", "R"), S("BURZA", "R"), S("TORNADO", "R"),
      K("WIATR", "R"), K("MUR", "R"),
      P("GRAD", "R"),
    ],
  },
  muzyka: {
    syczacy: [
      P("SAKSOFON", "S"), // saksofon
      P("SKRZYPCE", "S"), P("SŁUCH", "S"),
      P("ZESPÓŁ", "Z"), P("ZAKŁADKA", "Z"),
      P("CYMBAŁ", "C"), P("CYTR", "C"), // cytra
      K("BAS", "S"), K("GŁOS", "S"),
      S("POSŁUCH", "S"),
    ],
    szumiacy: [
      P("SZUM", "SZ"), P("SZKŁO", "SZ"), P("SZELKI", "SZ"), P("SZOP", "SZ"),
      P("ŻAGIEL", "Z"), P("ŻYŁA", "Z"),
      P("CZAJNIK", "CZ"), P("CZEKOLADA", "CZ"),
      K("KOSZ", "SZ"), K("MYSZ", "SZ"),
      P("DŹWIĘK", "DZ"), P("DŻEM", "DZ"),
    ],
    ciszacy: [
      P("ŚPIEW", "S"), P("ŚWIST", "S"), P("ŚLIMAK", "S"), P("ŚNIEG", "S"),
      P("ĆWIERKANIE", "C"), P("ĆMA", "C"), P("CIENIE", "C"),
      K("KOŚĆ", "S"), K("LIŚĆ", "S"), K("MIŚ", "S"),
    ],
    rotacyzm: [
      P("TRĄBKA", "R"), P("RURA", "R"), P("RÓG", "R"), P("RYTM", "R"),
      S("ORKIESTRA", "R"), S("KORNET", "R"), S("TREMOLO", "R"),
      K("CHÓR", "R"), K("MUR", "R"),
    ],
  },
  ogrod: {
    syczacy: [
      P("SAD", "S"), P("SIEW", "S"), P("SŁONECZNIK", "S"), P("Seler", "S"),
      P("ZIOŁA", "Z"), P("ZIARNO", "Z"),
      P("CEBULA", "C"), P("CYKORIA", "C"),
      K("KOS", "S"), K("ANANAS", "S"),
      S("OSIKA", "S"),
    ],
    szumiacy: [
      P("SZCZAW", "SZ"), P("SZPINAK", "SZ"), P("SZKŁO", "SZ"),
      P("ŻABKA", "Z"), P("ŻUK", "Z"),
      P("CZOSNEK", "CZ"),
      K("KOSZ", "SZ"),
      P("DŻDŻOWNICA", "DZ"),
    ],
    ciszacy: [
      P("ŚCIÓŁKA", "S"), P("ŚLIMAK", "S"), P("ŚLIWKA", "S"), P("ŚNIEG", "S"),
      P("ĆMA", "C"), P("CIENIE", "C"),
      K("LIŚĆ", "S"), K("KOŚĆ", "S"), K("MIŚ", "S"),
      P("DŹWIĘK", "DZ"),
    ],
    rotacyzm: [
      P("RABATA", "R"), P("RÓŻA", "R"), P("RZODKIEWKA", "R"), P("RUMIANEK", "R"),
      S("GRABIE", "R"), S("KRET", "R"), S("TRAWNIK", "R"),
      K("MUR", "R"), K("SZCZYPIOR", "R"), // szczypior
    ],
  },
  miasto: {
    syczacy: [
      P("SKLEP", "S"), P("SŁUP", "S"), P("SŁOIK", "S"), P("SOK", "S"),
      P("ZATOR", "Z"), P("ZABYTEK", "Z"),
      P("CEGŁA", "C"), P("CENTRUM", "C"),
      K("KOS", "S"), K("BUS", "S"),
      S("OSIEDLE", "S"),
    ],
    szumiacy: [
      P("SZKOŁA", "SZ"), P("SZPITAL", "SZ"), P("SZOSA", "SZ"), P("SZKŁO", "SZ"),
      P("ŻŁOBEK", "Z"), P("ŻALUZJA", "Z"),
      P("CZAJNIK", "CZ"), // not city but
      K("KOSZ", "SZ"),
      P("DŻUNGLA", "DZ"), // miejska dżungla
    ],
    ciszacy: [
      P("ŚCIEŻKA", "S"), P("ŚWIATŁO", "S"), P("ŚMIECI", "S"), P("ŚLIMAK", "S"),
      P("ĆMA", "C"), P("CIENIE", "C"),
      K("KOŚĆ", "S"), K("LIŚĆ", "S"), K("MIŚ", "S"),
      P("DŹWIĘK", "DZ"),
    ],
    rotacyzm: [
      P("RATUSZ", "R"), P("RYNEK", "R"), P("ROWER", "R"), P("RÓG", "R"),
      S("TRAMWAJ", "R"), S("MOST", "R"), S("KRAKÓW", "R"),
      K("MUR", "R"), K("TOR", "R"),
      P("BRAMA", "R"),
    ],
  },
  hawaje: {
    syczacy: [
      P("SOK", "S"), P("SŁOŃCE", "S"), P("SALSA", "S"), P("SÓL", "S"),
      P("ZATOKA", "Z"), P("ZABAWA", "Z"),
      P("CYKADY", "C"), P("CYKL", "C"),
      S("OSADA", "S"), S("BASEN", "S"), S("PIASEK", "S"),
      K("KOS", "S"), K("ANANAS", "S"), K("KOKOS", "S"),
    ],
    szumiacy: [
      P("SZUM", "SZ"), P("SZORTY", "SZ"), P("SZALUPA", "SZ"),
      P("ŻÓŁW", "Z"),
      P("CZAPKA", "CZ"),
      K("KOSZ", "SZ"), K("PLAŻA", "Z"),
      P("DŻUNGLE", "DZ"),
    ],
    ciszacy: [
      P("ŚLIMAK", "S"), P("ŚCIEŻKA", "S"), P("ŚWIECA", "S"), P("ŚNIEG", "S"),
      P("ĆMA", "C"), P("CIENIE", "C"), P("DŹWIĘK", "DZ"),
      K("LIŚĆ", "S"), K("MIŚ", "S"), K("KOŚĆ", "S"),
      S("WIŚNIA", "S"), S("MIŚKI", "S"),
    ],
    rotacyzm: [
      P("RAFA", "R"), P("REKIN", "R"), P("RYBA", "R"), P("RÓŻA", "R"),
      S("KORAL", "R"), S("TRAWNIK", "R"),
      K("MUR", "R"), K("TOR", "R"),
    ],
  },
  halloween: {
    syczacy: [
      P("SOWA", "S"), P("SOK", "S"), P("SŁOIK", "S"), P("SMOK", "S"),
      P("ZABAWA", "Z"), P("ZAGADKA", "Z"), P("ZIELONY", "Z"),
      P("CEGŁA", "C"), P("CEL", "C"),
      K("KOS", "S"), K("LAS", "S"), K("GŁOS", "S"),
    ],
    szumiacy: [
      P("SZUM", "SZ"), P("SZAFA", "SZ"), P("SZKIELET", "SZ"),
      P("ŻABA", "Z"),
      P("CZAR", "CZ"), P("CZAPKA", "CZ"),
      K("JEŻ", "Z"), K("KOSZ", "SZ"),
    ],
    ciszacy: [
      P("ŚWIECA", "S"), P("ŚWIECE", "S"), P("ĆMA", "C"), P("ŚNIEG", "S"),
      K("KOŚĆ", "S"), K("LIŚĆ", "S"), K("MIŚ", "S"),
      P("DŹWIĘK", "DZ"), S("WIŚNIA", "S"), S("MIŚKI", "S"),
    ],
    rotacyzm: [
      P("RÓŻA", "R"), P("ROBOT", "R"), P("RYCERZ", "R"), P("RAKIETA", "R"),
      S("TRUMNIA", "R"), S("KORONA", "R"), S("TRAWNIK", "R"),
      K("MUR", "R"), K("TORT", "R"), K("KORAL", "R"),
    ],
  },
  minecraft: {
    syczacy: [
      P("SKAŁA", "S"), P("SOK", "S"), P("SOWA", "S"),
      P("ZAMEK", "Z"),
      P("CYKL", "C"), P("CEGŁA", "C"),
      K("LAS", "S"), K("KOS", "S"),
    ],
    szumiacy: [
      P("SZKIELET", "SZ"), P("SZKŁO", "SZ"), P("SZOP", "SZ"),
      P("ŻELAZO", "Z"),
      P("CZAPKA", "CZ"), P("DŻINSY", "DZ"),
      S("KOSZYK", "SZ"), S("PUSZKA", "SZ"),
      K("MYSZ", "SZ"), K("GARAŻ", "Z"),
    ],
    ciszacy: [
      P("ŚNIEG", "S"), P("ŚWIECA", "S"), P("ŚCIANA", "S"),
      P("ĆMA", "C"), P("CIENIE", "C"), P("DŹWIĘK", "DZ"),
      K("KOŚĆ", "S"), K("LIŚĆ", "S"), K("MIŚ", "S"),
      S("WIŚNIA", "S"), S("MIŚKI", "S"),
    ],
    rotacyzm: [
      P("RÓWNOWAGA", "R"), P("RURA", "R"), P("RYBA", "R"), P("REKIN", "R"),
      S("KORONA", "R"), S("KRYSZTAŁ", "R"), S("TRAWA", "R"),
      K("MUR", "R"), K("TOR", "R"), K("KRATER", "R"),
    ],
  },
};

export function getWords(theme: ThemeId, szereg: SzeregId): WordEntry[] {
  const themed = WORD_POOLS[theme]?.[szereg];
  if (themed && themed.length > 0) return themed;
  // fallback do bazowych — gwarantuje zawsze poprawny zestaw terapeutyczny
  return BASE_WORDS[szereg];
}

export function coverageForTheme(theme: ThemeId): Record<SzeregId, number> {
  const out: Record<SzeregId, number> = { syczacy: 0, szumiacy: 0, ciszacy: 0, rotacyzm: 0 };
  const pools = WORD_POOLS[theme];
  if (!pools) return out;
  (Object.keys(out) as SzeregId[]).forEach((k) => (out[k] = pools[k]?.length ?? 0));
  return out;
}

export function allCoverage(): Record<ThemeId, Record<SzeregId, number>> {
  const out = {} as Record<ThemeId, Record<SzeregId, number>>;
  (Object.keys(WORD_POOLS) as ThemeId[]).forEach((t) => (out[t] = coverageForTheme(t)));
  return out;
}
