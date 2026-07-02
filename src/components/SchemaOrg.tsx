import type { TourData, ItineraryDay } from '@/lib/tours-data';

const SITE_URL = 'https://perutravelexpertsb.vercel.app';

// ─── Organization + LocalBusiness + WebSite (root layout) ────────────

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function SchemaOrg() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: 'PeruTravelExpertsB',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.jpg`,
    description:
      'Luxury VIP travel experiences in Peru - Machu Picchu, Cusco, Sacred Valley, Amazon & more.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cusco',
      addressRegion: 'Cusco',
      addressCountry: 'PE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -13.5319,
      longitude: -71.9675,
    },
    telephone: '+51984215157',
    priceRange: '$$$$',
    areaServed: [
      { '@type': 'City', name: 'Cusco' },
      { '@type': 'City', name: 'Lima' },
      { '@type': 'City', name: 'Arequipa' },
      { '@type': 'City', name: 'Puno' },
    ],
    sameAs: [],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PeruTravelExpertsB',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/tour-packages?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={websiteSchema} />
    </>
  );
}

// ─── TouristTrip (tour detail pages) ─────────────────────────────────

export function TourSchema({
  tour,
  destination,
  slug,
}: {
  tour: TourData;
  destination: string;
  slug: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.nameEn,
    description: tour.descriptionEn,
    url: `${SITE_URL}/tour-packages/${destination}/${slug}`,
    image: tour.image,
    offers: {
      '@type': 'Offer',
      price: tour.priceUSD,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    touristType: 'Luxury travel',
    itinerary: tour.itineraryEn?.map((day: ItineraryDay, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: day.titleEn || `Day ${i + 1}`,
    })),
  };

  return <JsonLd data={schema} />;
}

// ─── BreadcrumbList ──────────────────────────────────────────────────

export function BreadcrumbsSchema({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return <JsonLd data={schema} />;
}

// ─── FAQPage ─────────────────────────────────────────────────────────

export function FAQSchema({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return <JsonLd data={schema} />;
}