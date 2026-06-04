export interface Tour {
  id: string;
  slug: string;
  image: string;
  gallery: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  duration: number;
  difficulty: 'beginner' | 'moderate' | 'advanced';
  priceUSD: number;
  highSeasonPrice: number | null;
  includesEs: string;
  includesEn: string;
  active: boolean;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface TourView {
  id: string;
  slug: string;
  image: string;
  gallery: string[];
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  duration: number;
  difficulty: 'beginner' | 'moderate' | 'advanced';
  priceUSD: number;
  highSeasonPrice: number | null;
  includesEs: string[];
  includesEn: string[];
  active: boolean;
  featured: boolean;
  sortOrder: number;
}

export interface Testimonial {
  id: string;
  textEs: string;
  textEn: string;
  author: string;
  country: string;
  flag: string;
  rating: number;
}

export interface NavItem {
  key: string;
  href: string;
}

export type Locale = 'es' | 'en';

export interface Translations {
  nav: {
    tours: string;
    about: string;
    testimonials: string;
    contact: string;
    book: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    highlight1Title: string;
    highlight1Desc: string;
    highlight2Title: string;
    highlight2Desc: string;
    highlight3Title: string;
    highlight3Desc: string;
    mission: string;
    vision: string;
  };
  tours: {
    title: string;
    subtitle: string;
    favorites: string;
    allTours: string;
    duration: string;
    difficulty: string;
    price: string;
    perPerson: string;
    viewDetails: string;
    bookNow: string;
    removeFromFavorites: string;
    addToFavorites: string;
    beginner: string;
    moderate: string;
    advanced: string;
    days: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  stats: {
    travelers: string;
    tours: string;
    years: string;
    satisfaction: string;
  };
  contact: {
    title: string;
    subtitle: string;
    whatsapp: string;
    email: string;
    location: string;
    sendWhatsApp: string;
  };
  cta: {
    title: string;
    subtitle: string;
    bookNow: string;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
    credit: string;
  };
  booking: {
    title: string;
    summary: string;
    name: string;
    email: string;
    travelers: string;
    date: string;
    message: string;
    send: string;
    close: string;
    tourDetails: string;
  };
  pageHeaders: {
    aboutUs: string;
    customizedTours: string;
    tourPackages: string;
    toursCities: string;
    projectsWeSupport: string;
    contact: string;
  };
  destinations: {
    cusco: string;
    puno: string;
    amazon: string;
    arequipa: string;
    'lima-ica': string;
  };
  tourDetail: {
    includes: string;
    itinerary: string;
    day: string;
    relatedTours: string;
    gallery: string;
    bookThisTour: string;
    viewAllTours: string;
    toursIn: string;
    destinations: string;
    ourDestinations: string;
    viewTours: string;
    toursCount: string;
  };
  customized: {
    title: string;
    subtitle: string;
    viewPackage: string;
  };
  projects: {
    title: string;
    subtitle: string;
  };
  communityTours: {
    title: string;
    subtitle: string;
  };
  home: {
    featuredTours: string;
    whyChooseUs: string;
    viewAllPackages: string;
  };
}
