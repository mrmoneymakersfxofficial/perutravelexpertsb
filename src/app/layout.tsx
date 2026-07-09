import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { RecentlyViewedProvider } from "@/components/RecentlyViewedProvider";
import { ModalProvider } from "@/components/ModalContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNavigation from "@/components/BottomNavigation";
import SchemaOrg from "@/components/SchemaOrg";
import { Toaster } from "@/components/ui/sonner";
import FloatingPanel from "@/components/FloatingPanel";
import BottomTabModals from "@/components/BottomTabModals";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ParticleTrail from "@/components/ParticleTrail";
import { VisualEditing } from "@/components/VisualEditing";
import { SanityLive } from "@/sanity/live";
import { SanityLiveWithToken } from "@/components/SanityLiveWithToken";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: '#0F0F0F' }}
      >
        {isDraftMode && <VisualEditing />}
        {isDraftMode && <SanityLive />}
        {isDraftMode && <SanityLiveWithToken includeDrafts />}
        <SchemaOrg />
        <LanguageProvider>
          <FavoritesProvider>
            <RecentlyViewedProvider>
              <ModalProvider>
                <div className="min-h-screen flex flex-col">
                  <ReadingProgressBar />
                  <ParticleTrail />
                  <Header />
                  <main className="flex-1 pb-[66px] sm:pb-[72px] lg:pb-0">
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
