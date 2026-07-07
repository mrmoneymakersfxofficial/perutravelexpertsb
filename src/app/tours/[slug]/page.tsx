import type { Metadata } from 'next';
import { tours as localTours } from '@/lib/tours-data';
import { getTourBySlugFn } from '@/lib/sanity-adapter';
import TourSlugClient from './TourSlugClient';

export async function generateStaticParams() {
  return localTours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlugFn(slug);
  if (!tour) return { title: 'Tour not found' };
  return {
    title: `${tour.nameEn || tour.nameEs} | PeruTravelExpertsB`,
    description: (tour.descriptionEn || tour.descriptionEs || '').substring(0, 160),
  };
}

export default async function TourSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = await getTourBySlugFn(slug);
  return <TourSlugClient tour={tour} />;
}
