import type { Metadata } from 'next';
import TourPackagesClient from './TourPackagesClient';
import { getDestinations } from '@/lib/sanity-adapter';
import { destinations as localDestinations } from '@/lib/tours-data';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'Our Tours | PeruTravelExpertsB - Explore Peru',
  description: 'Explore our curated tour packages across Peru: Cusco, Machu Picchu, Sacred Valley, Rainbow Mountain, Lake Titicaca, Amazon, Arequipa and more.',
  openGraph: { title: 'Our Tours | PeruTravelExpertsB', description: 'Discover our curated tour packages across Peru\'s most incredible destinations.', url: `${BASE_URL}/our-tours`, siteName: 'PeruTravelExpertsB', type: 'website' },
};

export default async function OurToursPage() {
  const sanityDests = await getDestinations();
  const dests = (sanityDests && sanityDests.length > 0) ? sanityDests : localDestinations;
  return <TourPackagesClient destinations={dests} />;
}
