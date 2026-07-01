import type { Metadata } from 'next';
import CustomizedTourDetailClient from './CustomizedTourDetailClient';
import { customizedTours, getCustomizedTourBySlug } from '@/lib/tours-data';

const BASE_URL = 'https://perutravelexpertsb.com';

export function generateStaticParams() {
  return customizedTours.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getCustomizedTourBySlug(slug);

  if (!pkg) {
    return { title: 'Package Not Found | PeruTravelExpertsB' };
  }

  return {
    title: `${pkg.nameEn} | PeruTravelExpertsB Custom Tours`,
    description: pkg.descriptionEn.slice(0, 160),
    openGraph: {
      title: `${pkg.nameEn} | PeruTravelExpertsB`,
      description: pkg.descriptionEn.slice(0, 160),
      url: `${BASE_URL}/tour-packages/${slug}`,
      siteName: 'PeruTravelExpertsB',
      type: 'article',
      images: [{ url: pkg.image, width: 1200, height: 630 }],
    },
  };
}

export default function CustomizedTourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <CustomizedTourDetailClient params={params} />;
}
