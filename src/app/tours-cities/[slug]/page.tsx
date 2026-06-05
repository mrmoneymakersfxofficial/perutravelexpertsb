import type { Metadata } from 'next';
import ToursCitiesDetailClient from './ToursCitiesDetailClient';
import { communityTours, getCommunityTourBySlug } from '@/lib/tours-data';

const BASE_URL = 'https://perutravelexpertsb.com';

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
    return { title: 'Tour Not Found | PeruTravelExpertsB' };
  }

  return {
    title: `${tour.nameEn} | PeruTravelExpertsB Community Tours`,
    description: tour.descriptionEn.slice(0, 160),
    openGraph: {
      title: `${tour.nameEn} | PeruTravelExpertsB`,
      description: tour.descriptionEn.slice(0, 160),
      url: `${BASE_URL}/tours-cities/${slug}`,
      siteName: 'PeruTravelExpertsB',
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
