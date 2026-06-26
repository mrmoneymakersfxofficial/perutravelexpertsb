import type { Metadata } from 'next';
import ProjectDetailClient from './ProjectDetailClient';
import { projects, getProjectBySlug } from '@/lib/tours-data';

const BASE_URL = 'https://perutravelexpertsb.com';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found | PeruTravelExpertsB' };
  }

  return {
    title: `${project.nameEn} | PeruTravelExpertsB Projects`,
    description: project.descriptionEn.slice(0, 160),
    openGraph: {
      title: `${project.nameEn} | PeruTravelExpertsB`,
      description: project.descriptionEn.slice(0, 160),
      url: `${BASE_URL}/projects-we-support/${slug}`,
      siteName: 'PeruTravelExpertsB',
      type: 'article',
      images: [{ url: project.image, width: 1200, height: 630 }],
    },
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProjectDetailClient params={params} />;
}
