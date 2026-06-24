import type { Metadata } from 'next';
import ProjectsWeSupportClient from './ProjectsWeSupportClient';

const BASE_URL = 'https://perutravelexpertsb.vercel.app';

export const metadata: Metadata = {
  title: 'Projects We Support | PeruTravelExpertsB - Social Responsibility',
  description:
    'PeruTravelExpertsB actively supports community projects that preserve Andean culture and improve the quality of life for local families in Peru.',
  openGraph: {
    title: 'Projects We Support | PeruTravelExpertsB',
    description: 'Committed to the development of Andean communities.',
    url: `${BASE_URL}/projects-we-support`,
    siteName: 'PeruTravelExpertsB',
    type: 'website',
  },
};

export default function ProjectsWeSupportPage() {
  return <ProjectsWeSupportClient />;
}
