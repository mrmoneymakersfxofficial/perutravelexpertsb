import type { Metadata } from 'next';
import CustomizedToursClient from './CustomizedToursClient';
import { getCustomizedTours } from '@/lib/sanity-adapter';
import { customizedTours as localCustomizedTours } from '@/lib/tours-data';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'Tour Packages | PeruTravelExpertsB - Multi-Destination Packages',
  description: 'Discover Machu Picchu in one unforgettable day. Browse our curated multi-destination tour packages across Peru.',
  openGraph: { title: 'Tour Packages | PeruTravelExpertsB', description: 'Discover Machu Picchu in one unforgettable day.', url: `${BASE_URL}/tour-packages`, siteName: 'PeruTravelExpertsB', type: 'website' },
};

export default async function TourPackagesPage() {
  const sanityPkgs = await getCustomizedTours();
  const packages = (sanityPkgs && sanityPkgs.length > 0) ? sanityPkgs : localCustomizedTours;
  return <CustomizedToursClient packages={packages} />;
}
