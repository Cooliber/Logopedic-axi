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
  title: "Logopedia • Karty Pracy — Dodle, Grywalizacja, PDF do Druku",
  description:
    "Kolorowe karty logopedyczne dla dzieci: szeregi syczący/szumiący/ciszący, rotacyzm, płynność, gry planszowe, dialog i oddech. PDF A4 gotowe do druku — pdfcn + Takumi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${baloo.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
