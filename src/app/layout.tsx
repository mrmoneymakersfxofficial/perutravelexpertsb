import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "PeruTravelExpertsB | Luxury Tours in Peru - Machu Picchu & Cusco",
  description:
    "Exclusive luxury travel experiences in Peru. Machu Picchu, Cusco, Sacred Valley, Amazon & more. Premium VIP tours with expert local guides.",
  keywords: [
    "Peru travel",
    "Machu Picchu tours",
    "luxury travel Peru",
    "Cusco tours",
    "VIP tours Peru",
    "Sacred Valley",
    "Inca Trail",
    "PeruTravelExpertsB",
  ],
  authors: [{ name: "PeruTravelExpertsB" }],
  openGraph: {
    title: "PeruTravelExpertsB | Luxury Tours in Peru - Machu Picchu & Cusco",
    description:
      "Exclusive luxury travel experiences in Peru. Premium VIP tours with expert local guides.",
    siteName: "PeruTravelExpertsB",
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
        style={{ backgroundColor: '#F8F6F2' }}
      >
        <LanguageProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <ScrollToTop />
            <WhatsAppButton />
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
