import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intiquilla | Tours VIP en Cusco - Machu Picchu",
  description:
    "Experiencias exclusivas y tours VIP en Cusco y Machu Picchu. Tu agencia de turismo boutique de confianza. Exclusive VIP tours in Cusco and Machu Picchu.",
  keywords: [
    "Cusco",
    "Machu Picchu",
    "VIP tours",
    "Peru travel",
    "Sacred Valley",
    "Inca Trail",
    "Intiquilla",
    "luxury travel",
    "Cusco tours",
  ],
  authors: [{ name: "Intiquilla" }],
  openGraph: {
    title: "Intiquilla | Tours VIP en Cusco - Machu Picchu",
    description:
      "Experiencias exclusivas y tours VIP en Cusco y Machu Picchu. Exclusive VIP tours in Cusco and Machu Picchu.",
    siteName: "Intiquilla",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: '#FAF8F5' }}
      >
        <LanguageProvider>
          <FavoritesProvider>
            {children}
            <Toaster />
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
