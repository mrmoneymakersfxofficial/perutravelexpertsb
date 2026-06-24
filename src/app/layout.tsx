import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { RecentlyViewedProvider } from "@/components/RecentlyViewedProvider";
import { ModalProvider } from "@/components/ModalContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNavigation from "@/components/BottomNavigation";
import { Toaster } from "@/components/ui/sonner";
import FloatingPanel from "@/components/FloatingPanel";
import BottomTabModals from "@/components/BottomTabModals";
import SchemaOrg from "@/components/SchemaOrg";

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
  twitter: {
    card: 'summary_large_image' as const,
    title: 'PeruTravelExpertsB | Luxury Tours in Peru',
    description: 'Exclusive luxury travel experiences in Peru. Machu Picchu, Cusco, Sacred Valley, Amazon & more.',
    images: ['https://perutravelexpertsb.vercel.app/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: '#F8F6F2' }}
      >
        <SchemaOrg />
        <LanguageProvider>
          <FavoritesProvider>
            <RecentlyViewedProvider>
              <ModalProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1 pt-16 md:pt-[68px] lg:pt-[72px] pb-[66px] sm:pb-[72px] lg:pb-0">
                    {children}
                  </main>
                  <Footer />
                </div>
                <Toaster />
                <FloatingPanel />
                <BottomNavigation />
                <div className="lg:hidden"><BottomTabModals /></div>
              </ModalProvider>
            </RecentlyViewedProvider>
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
