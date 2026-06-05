import type { Metadata } from 'next';
import TourDetailClient from './TourDetailClient';
import { tours, getDestinationBySlug, getTourBySlug } from '@/lib/tours-data';

const BASE_URL = 'https://intiquilla.com';

export function generateStaticParams() {
  return tours.filter((t) => t.active).map((tour) => ({
    destination: tour.destination,
    slug: tour.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string; slug: string }>;
}): Promise<Metadata> {
  const { destination, slug } = await params;
  const dest = getDestinationBySlug(destination);
  const tour = getTourBySlug(slug);

  if (!tour || !dest) {
    return { title: 'Tour Not Found | Intiquilla' };
  }

  return {
    title: `${tour.nameEn} | Intiquilla - ${dest.nameEn}`,
    description: tour.descriptionEn.slice(0, 160),
    openGraph: {
      title: `${tour.nameEn} | Intiquilla`,
      description: tour.descriptionEn.slice(0, 160),
      url: `${BASE_URL}/tour-packages/${destination}/${slug}`,
      siteName: 'Intiquilla',
      type: 'article',
      images: [{ url: tour.image, width: 1200, height: 630 }],
    },
  };
}

export default function TourDetailPage({
  params,
}: {
  params: Promise<{ destination: string; slug: string }>;
}) {
  return <TourDetailClient params={params} />;
}
