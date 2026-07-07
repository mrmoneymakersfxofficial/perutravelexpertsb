import type { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';
import { getTeamMembers, getSiteSettings } from '@/lib/sanity-adapter';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'About Us | PeruTravelExpertsB - Your Boutique Travel Agency in Cusco',
  description: 'Learn about PeruTravelExpertsB, your trusted boutique travel agency in Cusco. Expert local guides, VIP service, and authentic Andean experiences.',
  openGraph: { title: 'About Us | PeruTravelExpertsB', description: 'Your trusted boutique travel agency in Cusco, Peru.', url: `${BASE_URL}/about-us`, siteName: 'PeruTravelExpertsB', type: 'website' },
};

export default async function AboutPage() {
  const [team, settings] = await Promise.all([getTeamMembers(), getSiteSettings()]);
  return <AboutUsClient sanityTeam={team} sanitySettings={settings} />;
}
