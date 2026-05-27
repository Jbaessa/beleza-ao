import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beleza.AO — Marketplace Premium de Beleza em Angola",
    template: "%s | Beleza.AO",
  },
  description:
    "Descubra e reserve os melhores salões, clínicas e spas de Angola. Marcações online em segundos.",
  keywords: ["beleza", "angola", "salão", "spa", "marcação", "manicure", "cabelo", "estética"],
  openGraph: {
    title: "Beleza.AO — Marketplace Premium de Beleza em Angola",
    description: "Descubra e reserve os melhores salões e spas de Angola.",
    locale: "pt_AO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-noir-975">{children}</body>
    </html>
  );
}
