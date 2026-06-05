import type { Metadata } from 'next';
import ToursCitiesDetailClient from './ToursCitiesDetailClient';
import { communityTours, getCommunityTourBySlug } from '@/lib/tours-data';

const BASE_URL = 'https://intiquilla.com';

export function generateStaticParams() {
  return communityTours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getCommunityTourBySlug(slug);

  if (!tour) {
    return { title: 'Tour Not Found | Intiquilla' };
  }

  return {
    title: `${tour.nameEn} | Intiquilla Community Tours`,
    description: tour.descriptionEn.slice(0, 160),
    openGraph: {
      title: `${tour.nameEn} | Intiquilla`,
      description: tour.descriptionEn.slice(0, 160),
      url: `${BASE_URL}/tours-cities/${slug}`,
      siteName: 'Intiquilla',
      type: 'article',
      images: [{ url: tour.image, width: 1200, height: 630 }],
    },
  };
}

export default function ToursCitiesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ToursCitiesDetailClient params={params} />;
}
