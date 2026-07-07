import type { Metadata } from 'next';
import DestinationClient from './DestinationClient';
import { destinations as localDestinations, getDestinationBySlug } from '@/lib/tours-data';
import { getDestinations, getToursByDestinationFn } from '@/lib/sanity-adapter';

const BASE_URL = 'https://perutravelexpertsb.com';

export async function generateStaticParams() {
  const sanityDests = await getDestinations();
  const dests = (sanityDests && sanityDests.length > 0) ? sanityDests : localDestinations;
  return dests.map((dest: any) => ({ destination: dest.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ destination: string }> }) {
  const { destination: destSlug } = await params;
  const sanityDests = await getDestinations();
  const dests = (sanityDests && sanityDests.length > 0) ? sanityDests : localDestinations;
  const dest = dests.find((d: any) => d.slug === destSlug) || getDestinationBySlug(destSlug);
  if (!dest) return { title: 'Destination not found' };
  return {
    title: `${dest.nameEn || dest.nameEs} Tours | PeruTravelExpertsB`,
    description: (dest.descriptionEn || dest.descriptionEs || '').substring(0, 160),
    openGraph: { title: `${dest.nameEn || dest.nameEs} Tours | PeruTravelExpertsB`, url: `${BASE_URL}/our-tours/${destSlug}`, siteName: 'PeruTravelExpertsB', type: 'website' },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ destination: string }> }) {
  const { destination: destSlug } = await params;
  const [sanityDests, sanityTours] = await Promise.all([
    getDestinations(),
    getToursByDestinationFn(destSlug),
  ]);
  const dests = (sanityDests && sanityDests.length > 0) ? sanityDests : localDestinations;
  const dest = dests.find((d: any) => d.slug === destSlug) || getDestinationBySlug(destSlug);
  return <DestinationClient destination={dest} tours={sanityTours} />;
}
