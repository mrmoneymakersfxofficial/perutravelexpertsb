import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS — PeruTravelExpertsB",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout intentionally does NOT include Header, Footer, BottomNavigation,
  // FloatingPanel, BottomTabModals, ParticleTrail, ReadingProgressBar, etc.
  // The CMS (Sanity Studio) is a standalone interface.
  return (
    <div id="sanity-root" style={{ position: 'fixed', inset: 0, zIndex: 999999 }}>
      {children}
    </div>
  );
}