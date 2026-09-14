import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Logopedia • Biblioteka Kart Pracy — 67 PDF do Druku",
  description:
    "67 kolorowych kart logopedycznych dla dzieci: szeregi syczący/szumiący/ciszący, rotacyzm, płynność, gry planszowe, dialog, oddech + 56 tematycznych (kosmos, zwierzaki, ocean...). PDF A4, personalizacja imienia, tryb EKO, gotowe do laminowania.",
  openGraph: {
    title: "Logopedia • Biblioteka 67 Kart PDF",
    description: "Dodle zamiast nudnych tabel. Pobierz PDF A4 za darmo — kolor + EKO, XP i naklejki.",
    locale: "pl_PL",
    type: "website",
  },
  keywords: ["logopedia", "karty pracy", "PDF", "szereg syczący", "rotacyzm", "gry logopedyczne", "do druku"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${baloo.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
