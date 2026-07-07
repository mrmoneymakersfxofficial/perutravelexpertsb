import type { Metadata } from 'next';
import ProjectsWeSupportClient from './ProjectsWeSupportClient';
import { getProjects } from '@/lib/sanity-adapter';
import { projects as localProjects } from '@/lib/tours-data';

const BASE_URL = 'https://perutravelexpertsb.com';

export const metadata: Metadata = {
  title: 'Projects We Support | PeruTravelExpertsB - Social Responsibility',
  description: 'PeruTravelExpertsB actively supports community projects that preserve Andean culture and improve the quality of life for local families in Peru.',
  openGraph: { title: 'Projects We Support | PeruTravelExpertsB', description: 'Committed to the development of Andean communities.', url: `${BASE_URL}/projects-we-support`, siteName: 'PeruTravelExpertsB', type: 'website' },
};

export default async function ProjectsPage() {
  const sanityProj = await getProjects();
  const projs = (sanityProj && sanityProj.length > 0) ? sanityProj : localProjects;
  return <ProjectsWeSupportClient projects={projs} />;
}
