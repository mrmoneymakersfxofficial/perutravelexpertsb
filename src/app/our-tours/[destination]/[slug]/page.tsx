import type { Metadata } from 'next';
import TourDetailClient from './TourDetailClient';
import { tours as localTours, getTourBySlug } from '@/lib/tours-data';
import { getTourBySlugFn } from '@/lib/sanity-adapter';

const BASE_URL = 'https://perutravelexpertsb.com';

export async function generateStaticParams() {
  return localTours.filter((t) => t.active).map((tour) => ({
    destination: tour.destination,
    slug: tour.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ destination: string; slug: string }> }) {
  const { slug } = await params;
  const tour = await getTourBySlugFn(slug);
  if (!tour) return { title: 'Tour not found' };
  return {
    title: `${tour.nameEn || tour.nameEs} | PeruTravelExpertsB`,
    description: (tour.descriptionEn || tour.descriptionEs || '').substring(0, 160),
    openGraph: { title: `${tour.nameEn || tour.nameEs} | PeruTravelExpertsB`, url: `${BASE_URL}/our-tours/${tour.destination}/${slug}`, siteName: 'PeruTravelExpertsB', type: 'website' },
  };
}

export default async function TourDetailPage({ params }: { params: Promise<{ destination: string; slug: string }> }) {
  // Pass params to client component — it handles data lookup internally
  return <TourDetailClient params={params} />;
}
