import type { Metadata } from 'next';
import { tours } from '@/lib/tours-data';
import TourSlugClient from './TourSlugClient';

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) return { title: 'Tour not found' };
  return {
    title: `${tour.nameEn} | PeruTravelExpertsB`,
    description: tour.descriptionEn.substring(0, 160),
  };
}

export default async function TourSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  return <TourSlugClient tour={tour} />;
}
