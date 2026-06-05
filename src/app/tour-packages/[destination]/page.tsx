import type { Metadata } from 'next';
import DestinationClient from './DestinationClient';
import { destinations, getDestinationBySlug } from '@/lib/tours-data';

const BASE_URL = 'https://intiquilla.com';

export function generateStaticParams() {
  return destinations.map((dest) => ({
    destination: dest.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string }>;
}): Promise<Metadata> {
  const { destination } = await params;
  const dest = getDestinationBySlug(destination);

  if (!dest) {
    return { title: 'Destination Not Found | Intiquilla' };
  }

  return {
    title: `Tours in ${dest.nameEn} | Intiquilla`,
    description: dest.descriptionEn.slice(0, 160),
    openGraph: {
      title: `Tours in ${dest.nameEn} | Intiquilla`,
      description: dest.descriptionEn.slice(0, 160),
      url: `${BASE_URL}/tour-packages/${destination}`,
      siteName: 'Intiquilla',
      type: 'website',
      images: [{ url: dest.image, width: 1200, height: 630 }],
    },
  };
}

export default function DestinationPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  return <DestinationClient params={params} />;
}
