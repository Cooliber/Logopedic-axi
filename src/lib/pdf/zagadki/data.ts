// Zagadki logopedyczne — 70 przykładów
// Kazda zagadka: tresc rymowana + odpowiedz (1 slowo z gloska treningowa) + szereg docelowy
// Dane do PDF (szablon zagadki) + do UI (przeglad 70). 16 zestawow po 4-5 sztuk = 70.

export type SzeregId = "syczacy" | "szumiacy" | "ciszacy" | "rotacyzm" | "mix";

export type Zagadka = {
  id: number;
  tresc: string; // rymowana zagadka, 2 wersy
  odpowiedz: string; // jedno slowo, WIELKIE litery, ortograficznie poprawne
  szereg: SzeregId;
  poziom: 1 | 2 | 3;
  podpowiedz?: string;
  kategoria: string;
};

export const ZAGADKI: Zagadka[] = [
  // 1-10 ZWIERZAKI (mix szeregow)
  { id: 1, tresc: "Paski ma jak zebranie, rzy i galopuje po sawannie.", odpowiedz: "ZEBRA", szereg: "syczacy", poziom: 1, kategoria: "zwierzaki", podpowiedz: "Zaczyna sie na Z" },
  { id: 2, tresc: "Syczy cicho s-s-s, ma oczy jak spodki, nocą poluje z wysoka.", odpowiedz: "SOWA", szereg: "syczacy", poziom: 1, kategoria: "zwierzaki" },
  { id: 3, tresc: "Myszy sie boja, gdy wasem rusza, mruczy i wskakuje na podusza.", odpowiedz: "KOT", szereg: "mix", poziom: 1, kategoria: "zwierzaki" },
  { id: 4, tresc: "Dlugie uszy, kica hop-hop, w kapuscie skryty trop.", odpowiedz: "ZAJAC", szereg: "syczacy", poziom: 1, kategoria: "zwierzaki" },
  { id: 5, tresc: "Rechocze w stawie kum-kum, skacze szczupakiem, zna każdy kąt.", odpowiedz: "ZABA", szereg: "szumiacy", poziom: 1, kategoria: "zwierzaki" },
  { id: 6, tresc: "Ma dluga szyje, cętki brązowe, liście z drzewa je na nowo.", odpowiedz: "ZYRAFA", szereg: "szumiacy", poziom: 1, kategoria: "zwierzaki" },
  { id: 7, tresc: "Malutka, szara, ser kradnie chytrze, piszczy cicho: pisz-pisz-pisz.", odpowiedz: "MYSZ", szereg: "szumiacy", poziom: 1, kategoria: "zwierzaki" },
  { id: 8, tresc: "Krol sawanny, grzywa zlota, ryczy glosno — kto to?", odpowiedz: "LEW", szereg: "mix", poziom: 1, kategoria: "zwierzaki" },
  { id: 9, tresc: "Wolno niesie domek wlasny, zostawia sciezke w trawie.", odpowiedz: "SLIMAK", szereg: "ciszacy", poziom: 1, kategoria: "zwierzaki" },
  { id: 10, tresc: "W oceanie plywa wielka, zęby ostre, płetwa grzbietowa.", odpowiedz: "REKIN", szereg: "rotacyzm", poziom: 1, kategoria: "zwierzaki" },
  // 11-20 JEDZENIE / KUCHNIA
  { id: 11, tresc: "Zolty owoc, kusi kwaśno — do herbaty dodasz go wlasnie.", odpowiedz: "CYTRYNA", szereg: "syczacy", poziom: 1, kategoria: "jedzenie", podpowiedz: "Zaczyna sie na C" },
  { id: 12, tresc: "W garnku bulgocze, pachnie w calym domu, jemy ja z lyzka, z makaronem.", odpowiedz: "ZUPA", szereg: "syczacy", poziom: 1, kategoria: "jedzenie" },
  { id: 13, tresc: "Na kanapce zolty plaster, myszy za nim przepadaja.", odpowiedz: "SER", szereg: "syczacy", poziom: 1, kategoria: "jedzenie" },
  { id: 14, tresc: "Slodka w sloiku, do naleśnika idealna — smarujesz i jesz od rana.", odpowiedz: "DZEM", szereg: "szumiacy", poziom: 1, kategoria: "jedzenie" },
  { id: 15, tresc: "Brazowa tabliczka, kostka przy kostce, dzieci ja kochaja — rozpływa sie w buzi.", odpowiedz: "CZEKOLADA", szereg: "szumiacy", poziom: 2, kategoria: "jedzenie" },
  { id: 16, tresc: "Okragly, czerwony, w ogrodzie rosnie, chrupniesz a sok po brodzie płynie.", odpowiedz: "JABLKO", szereg: "mix", poziom: 1, kategoria: "jedzenie" },
  { id: 17, tresc: "Zolty, zakrecony, sloneczny kwiat — obraca glowe za sloncem wnet.", odpowiedz: "SLONECZNIK", szereg: "ciszacy", poziom: 2, kategoria: "jedzenie" },
  { id: 18, tresc: "Fioletowa kulka, slodka, soczysta — latem robimy z niej kompot.", odpowiedz: "SLIWKA", szereg: "ciszacy", poziom: 1, kategoria: "jedzenie" },
  { id: 19, tresc: "Zolty, dlugi, w skórce grubej, malpy zajadaja go wnet.", odpowiedz: "BANAN", szereg: "mix", poziom: 1, kategoria: "jedzenie" },
  { id: 20, tresc: "Na torcie swieczki, krem i owoce, spiewamy Sto lat przy nim chętnie.", odpowiedz: "TORT", szereg: "rotacyzm", poziom: 1, kategoria: "jedzenie" },
  // 21-30 DOM / UBRAŃA
  { id: 21, tresc: "Stoi w salonie miękka, wygodna — usiądziesz, odpoczniesz na niej.", odpowiedz: "SOFA", szereg: "syczacy", poziom: 1, kategoria: "dom" },
  { id: 22, tresc: "W szafie wisi kolorowa, dziewczynki ja uwielbiaja — falbanki ma i welon.", odpowiedz: "SUKIENKA", szereg: "syczacy", poziom: 2, kategoria: "dom" },
  { id: 23, tresc: "Na glowe ja wkladzasz, gdy slonce swieci albo deszcz pada.", odpowiedz: "CZAPKA", szereg: "szumiacy", poziom: 1, kategoria: "dom" },
  { id: 24, tresc: "W lazience biala, woda w niej szumi — myjesz w niej rece i zęby.", odpowiedz: "ZLEW", szereg: "syczacy", poziom: 1, kategoria: "dom" },
  { id: 25, tresc: "Grzeje w nocy, swieci miekko, wosk kapie z niej powoli.", odpowiedz: "SWIECA", szereg: "ciszacy", poziom: 1, kategoria: "dom" },
  { id: 26, tresc: "Przy oknie wisi cicha, chroni przed sloncem.", odpowiedz: "ZASLONA", szereg: "syczacy", poziom: 2, kategoria: "dom" },
  { id: 27, tresc: "Na nogi wkladzasz dwie nogawki dlugie, kieszenie mają i szwy.", odpowiedz: "SPODNIE", szereg: "syczacy", poziom: 1, kategoria: "dom" },
  { id: 28, tresc: "Miekkie klapki na lato, pasek miedzy palcami.", odpowiedz: "SANDAL", szereg: "syczacy", poziom: 1, kategoria: "dom" },
  { id: 29, tresc: "Budynek wielki, w miescie stoi, sklep i urzedy kryje.", odpowiedz: "RATUSZ", szereg: "rotacyzm", poziom: 2, kategoria: "dom" },
  { id: 30, tresc: "W kuchni duzy, pelen polek, garnki i talerze chroni.", odpowiedz: "SZAFA", szereg: "szumiacy", poziom: 1, kategoria: "dom" },
  // 31-40 POJAZDY / MIASTO / KOSMOS
  { id: 31, tresc: "Cztery kola, kierownica, warkot silnika — jedziesz w dal.", odpowiedz: "SAMOCHOD", szereg: "syczacy", poziom: 1, kategoria: "pojazdy" },
  { id: 32, tresc: "Skrzydla ma, lecz nie jest ptakiem, ludzi w chmury szybko zabiera.", odpowiedz: "SAMOLOT", szereg: "syczacy", poziom: 1, kategoria: "pojazdy" },
  { id: 33, tresc: "Po torach jedzie dlugi, sapie i gwiżdże — wsiadasz na stacji.", odpowiedz: "POCIAG", szereg: "ciszacy", poziom: 1, kategoria: "pojazdy" },
  { id: 34, tresc: "Dzwoni dzwonkiem, jedzie po szynach przez miasto całe.", odpowiedz: "TRAMWAJ", szereg: "rotacyzm", poziom: 1, kategoria: "pojazdy" },
  { id: 35, tresc: "Dwa kola, kierownica, pedały kręcą się w koło.", odpowiedz: "ROWER", szereg: "rotacyzm", poziom: 1, kategoria: "pojazdy" },
  { id: 36, tresc: "Leci w kosmos wysoko, ogon ognisty za nią.", odpowiedz: "RAKIETA", szereg: "rotacyzm", poziom: 1, kategoria: "pojazdy" },
  { id: 37, tresc: "Na niebie mruga nocą, kolysze sie miedzy gwiazdami.", odpowiedz: "KOSMOS", szereg: "syczacy", poziom: 2, kategoria: "pojazdy" },
  { id: 38, tresc: "Male oczka na niebie, swieca gdy noc zapada.", odpowiedz: "GWIAZDY", szereg: "mix", poziom: 1, kategoria: "pojazdy" },
  { id: 39, tresc: "W porcie stoi, fale tnie, marynarze na niej plywaja.", odpowiedz: "STATEK", szereg: "mix", poziom: 1, kategoria: "pojazdy" },
  { id: 40, tresc: "Ogromny, zolty dzwig podnosi cegły na budowie.", odpowiedz: "DZWIG", szereg: "ciszacy", poziom: 2, kategoria: "pojazdy" },
  // 41-50 PRZYRODA / LAS / OGRÓD
  { id: 41, tresc: "W lesie stoi zielona, szyszki na niej wiszą.", odpowiedz: "SOSNA", szereg: "syczacy", poziom: 1, kategoria: "przyroda" },
  { id: 42, tresc: "Zwierz leśny płochliwy, rudy ogon, skacze po galeziach.", odpowiedz: "WIEWIORKA", szereg: "mix", poziom: 2, kategoria: "przyroda" },
  { id: 43, tresc: "Na drzewie szyszka brązowa, spadla pod nogi dzieciom.", odpowiedz: "SZYSZKA", szereg: "szumiacy", poziom: 1, kategoria: "przyroda" },
  { id: 44, tresc: "Czarny ptak z zoltym dziobem, spiewa pieknie o poranku.", odpowiedz: "KOS", szereg: "syczacy", poziom: 1, kategoria: "przyroda" },
  { id: 45, tresc: "Kolorowe skrzydla, leci nad laka lekko jak pioro.", odpowiedz: "MOTYL", szereg: "mix", poziom: 1, kategoria: "przyroda" },
  { id: 46, tresc: "W trawie skacze zielona, rechocze glosno kum-kum.", odpowiedz: "ZABA", szereg: "szumiacy", poziom: 1, kategoria: "przyroda" },
  { id: 47, tresc: "W ogrodzie kwitnie czerwona, pachnie pieknie, kolce ma.", odpowiedz: "ROZA", szereg: "rotacyzm", poziom: 1, kategoria: "przyroda" },
  { id: 48, tresc: "W lesie rosnie, kapelusz kropkowany — uwaga, nie każdy jadalny!", odpowiedz: "GRZYB", szereg: "szumiacy", poziom: 1, kategoria: "przyroda" },
  { id: 49, tresc: "Wysokie drzewo, liscie szumia na wietrze.", odpowiedz: "DRZEWO", szereg: "rotacyzm", poziom: 1, kategoria: "przyroda" },
  { id: 50, tresc: "Bzyczy, lata nisko, ma oczy wielkie — wazka nad woda?", odpowiedz: "WAZKA", szereg: "mix", poziom: 2, kategoria: "przyroda" },
  // 51-60 OCEAN / POGODA / MUZYKA
  { id: 51, tresc: "Szumi, szumi bez konca, fale bilą o piasek.", odpowiedz: "MORZE", szereg: "mix", poziom: 1, kategoria: "ocean" },
  { id: 52, tresc: "Srebrna rybka mala, w puszcze czesto plywa.", odpowiedz: "SARDYNKA", szereg: "syczacy", poziom: 2, kategoria: "ocean" },
  { id: 53, tresc: "Wielka ryba zębata, szara jak stal.", odpowiedz: "REKIN", szereg: "rotacyzm", poziom: 1, kategoria: "ocean" },
  { id: 54, tresc: "Pol biala panna, pol ryba — spiewa na skale.", odpowiedz: "SYRENA", szereg: "syczacy", poziom: 2, kategoria: "ocean" },
  { id: 55, tresc: "Swieci wysoko zlote kolo, grzeje latem mocno.", odpowiedz: "SLONCE", szereg: "syczacy", poziom: 1, kategoria: "pogoda" },
  { id: 56, tresc: "Pada z nieba bialy puch, dzieci lepia z niego kule.", odpowiedz: "SNIEG", szereg: "ciszacy", poziom: 1, kategoria: "pogoda" },
  { id: 57, tresc: "Blyska i huczy strasznie, dzieci chowaja sie pod koc.", odpowiedz: "BURZA", szereg: "rotacyzm", poziom: 2, kategoria: "pogoda" },
  { id: 58, tresc: "Zloty instrument dlugi, trąbą glosno gra na scenie.", odpowiedz: "SAKSOFON", szereg: "syczacy", poziom: 2, kategoria: "muzyka" },
  { id: 59, tresc: "Male talerze brzęczące, uderzasz pałkami — bum-bum.", odpowiedz: "CYMBAL", szereg: "syczacy", poziom: 2, kategoria: "muzyka" },
  { id: 60, tresc: "Trzy struny? Nie — cztery! Skrzypek gra na nich smyczkiem.", odpowiedz: "SKRZYPCE", szereg: "szumiacy", poziom: 3, kategoria: "muzyka" },
  // 61-70 MIX WYZWANIE 3* + SMOK / KOSMOS / DINO
  { id: 61, tresc: "Ogromny gad z bajki, ogniem zieje, skrzydla ma jak nietoperz.", odpowiedz: "SMOK", szereg: "syczacy", poziom: 1, kategoria: "bajki" },
  { id: 62, tresc: "Dawno temu krolowal, ogromny, grozny — rex to jego imie.", odpowiedz: "DINOZAUR", szereg: "mix", poziom: 2, kategoria: "bajki" },
  { id: 63, tresc: "W kosmosie kreci sie maly, wysyla sygnaly na Ziemie.", odpowiedz: "SATELITA", szereg: "syczacy", poziom: 3, kategoria: "kosmos" },
  { id: 64, tresc: "Malutki pojazd jezdzi po Marsie, bada kamienie i piasek.", odpowiedz: "LAZIK", szereg: "mix", poziom: 2, kategoria: "kosmos" },
  { id: 65, tresc: "Plywa w rzece dlugi, zeby ostre, paszcza wielka jak walizka.", odpowiedz: "KROKODYL", szereg: "rotacyzm", poziom: 2, kategoria: "zwierzaki" },
  { id: 66, tresc: "W zimie dzieci nim zjezdzaja z gorki, plozy slizgaja sie po sniegu.", odpowiedz: "SANKI", szereg: "syczacy", poziom: 1, kategoria: "sport" },
  { id: 67, tresc: "Skaczesz, biegniesz, rzucasz pilka — na boisku grasz tam z ekipa.", odpowiedz: "SPORT", szereg: "mix", poziom: 1, kategoria: "sport" },
  { id: 68, tresc: "Kolorowy lata nad glowami, sznurek trzymasz mocno w dloni.", odpowiedz: "BALON", szereg: "mix", poziom: 1, kategoria: "zabawa" },
  { id: 69, tresc: "W lesie ma rude futro, kitę puszystą, orzeszki chowa na zime.", odpowiedz: "WIEWIORKA", szereg: "mix", poziom: 2, kategoria: "przyroda" },
  { id: 70, tresc: "W kuchni slychac sss i szsz, gotuje sie woda na herbate.", odpowiedz: "CZAJNIK", szereg: "szumiacy", poziom: 2, kategoria: "dom" },
];

// 16 zestawow — 70 podzielone 6x5 + 10x4
export type ZestawMeta = {
  slug: string; // zagadki-01 ... zagadki-16
  title: string;
  subtitle: string;
  color: string;
  level: string;
  zagadki: Zagadka[];
};

const COLORS = ["#7C3AED", "#2D6A4F", "#E11D48", "#0EA5E9", "#F59E0B", "#8B5CF6", "#10B981", "#EF4444", "#6366F1", "#06B6D4", "#84CC16", "#F97316", "#14B8A6", "#A855F7", "#EAB308", "#0F766E"];

const TITLES: Array<{ t: string; sub: string }> = [
  { t: "Zagadki Zwierzat I", sub: "Zwierzaki domowe i lesne • latwe" },
  { t: "Zagadki Zwierzat II", sub: "Safari i sawanna • s/z" },
  { t: "Smaki Kuchni", sub: "Jedzenie i owoce • s/c" },
  { t: "Domowe Tajemnice", sub: "Dom i ubrania • s/sz" },
  { t: "Pojazdy i Podroze", sub: "Auta i loty • s/r" },
  { t: "Kosmos i Gwiazdy", sub: "Rakiety i planety • r/s" },
  { t: "Lesne Echa", sub: "Las i szyszki • sz/s" },
  { t: "Ocean Szumi", sub: "Morze i ryby • sz/r" },
  { t: "Pory Roku", sub: "Pogoda i slonce • s/c" },
  { t: "Muzyka Gra", sub: "Instrumenty • s/cz" },
  { t: "Bajkowy Swiat", sub: "Smoki i dinozaury • mix" },
  { t: "Ogrod i Pole", sub: "Rosliny i owady • r/sz" },
  { t: "Miasto Tętni", sub: "Ulice i budynki • sz/r" },
  { t: "Sport i Zabawa", sub: "Ruch i pilka • mix" },
  { t: "Wyzwanie Mistrza I", sub: "5 zagadek • poziom 2-3" },
  { t: "Wyzwanie Mistrza II", sub: "5 zagadek • poziom 3 • mix" },
];

export const ZESTAWY: ZestawMeta[] = (() => {
  const out: ZestawMeta[] = [];
  let cursor = 0;
  for (let i = 0; i < 16; i++) {
    const count = i < 6 ? 5 : 4; // 6*5=30 +10*4=40 =>70
    const slice = ZAGADKI.slice(cursor, cursor + count);
    cursor += count;
    const slug = `zagadki-${String(i + 1).padStart(2, "0")}`;
    out.push({
      slug,
      title: TITLES[i]?.t ?? `Zagadki ${i + 1}`,
      subtitle: TITLES[i]?.sub ?? "Zagadki logopedyczne",
      color: COLORS[i % COLORS.length],
      level: i < 4 ? "latwy" : i < 10 ? "sredni" : i < 14 ? "trudny" : "mistrz",
      zagadki: slice,
    });
  }
  return out;
})();

export const zagadkiBySlug = (slug: string): ZestawMeta | undefined => ZESTAWY.find((z) => z.slug === slug);
export const allZagadkiSlugs = (): string[] => ZESTAWY.map((z) => z.slug);
