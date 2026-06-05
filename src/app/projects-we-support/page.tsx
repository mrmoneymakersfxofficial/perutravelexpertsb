import type { Metadata } from 'next';
import ProjectsWeSupportClient from './ProjectsWeSupportClient';

const BASE_URL = 'https://intiquilla.com';

export const metadata: Metadata = {
  title: 'Projects We Support | Intiquilla - Social Responsibility',
  description:
    'Intiquilla actively supports community projects that preserve Andean culture and improve the quality of life for local families in Peru.',
  openGraph: {
    title: 'Projects We Support | Intiquilla',
    description: 'Committed to the development of Andean communities.',
    url: `${BASE_URL}/projects-we-support`,
    siteName: 'Intiquilla',
    type: 'website',
  },
};

export default function ProjectsWeSupportPage() {
  return <ProjectsWeSupportClient />;
}
