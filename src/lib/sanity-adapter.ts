// @ts-nocheck
/**
 * Adaptador de datos Sanity — Puente entre los datos locales y Sanity CMS.
 * 
 * Cada función intenta obtener datos de Sanity primero (via fetchCMS).
 * Si Sanity no está configurado o retorna vacío, cae a datos locales.
 * 
 * Esto permite migración gradual: los datos en Sanity reemplazan a los locales
 * automáticamente cuando se configuran las variables de entorno.
 */

import { fetchCMSDraft } from "./fetchCMS";
import { plainText } from "./sanity.client";
import * as queries from "@/sanity/queries";
import {
  destinations as localDestinations,
  tours as localTours,
  customizedTours as localCustomizedTours,
  communityTours as localCommunityTours,
  projects as localProjects,
  getFeaturedTours,
  getTourBySlug,
  getToursByDestination,
  getDestinationBySlug,
  getCustomizedTourBySlug,
  getCommunityTourBySlug,
  getProjectBySlug,
  getRelatedTours,
  type TourData,
  type DestinationData,
  type CustomizedTourData,
  type CommunityTourData,
  type ProjectData,
} from "./tours-data";

// ─── Helpers ───────────────────────────────────────

function isSanityConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT);
}

function mapSanityTour(item: any): TourData {
  // Find matching local tour for fallback data (images, gallery, etc.)
  const slug = item.slug?.current || "";
  const localTour = localTours.find(t => t.slug === slug);

  return {
    id: item._id || slug,
    slug,
    active: true,
    featured: item.featured || false,
    order: item.order || 100,
    nameEs: item.title || localTour?.nameEs || "",
    nameEn: item.titleEn || localTour?.nameEn || "",
    subtitleEs: item.subtitleEs || localTour?.subtitleEs || "",
    subtitleEn: item.subtitleEn || localTour?.subtitleEn || "",
    descriptionEs: item.excerpt || plainText(item.description || item.descriptionEs) || localTour?.descriptionEs || "",
    descriptionEn: item.excerptEn || plainText(item.descriptionEn) || localTour?.descriptionEn || "",
    image: item.coverImageUrl || localTour?.image || "",
    gallery: (item.galleryUrls && item.galleryUrls.length > 0) ? item.galleryUrls : (localTour?.gallery || []),
    duration: item.duration || localTour?.duration || 1,
    difficulty: item.difficulty || localTour?.difficulty || "moderate",
    priceUSD: item.priceUSD || localTour?.priceUSD || 0,
    highSeasonPrice: item.highSeasonPrice ?? localTour?.highSeasonPrice,
    groupSize: item.groupSize,
    destination: item.destination?.slug || localTour?.destination || "",
    includesEs: (item.includes && item.includes.length > 0) ? item.includes : (localTour?.includesEs || []),
    includesEn: (item.includesEn && item.includesEn.length > 0) ? item.includesEn : (localTour?.includesEn || []),
    excludesEs: (item.notIncludes && item.notIncludes.length > 0) ? item.notIncludes : (localTour?.excludesEs || []),
    excludesEn: (item.notIncludesEn && item.notIncludesEn.length > 0) ? item.notIncludesEn : (localTour?.excludesEn || []),
    highlightsEs: (item.highlightsEs && item.highlightsEs.length > 0) ? item.highlightsEs : (localTour?.highlightsEs || []),
    highlightsEn: (item.highlightsEn && item.highlightsEn.length > 0) ? item.highlightsEn : (localTour?.highlightsEn || []),
    whatToBringEs: (item.whatToBringEs && item.whatToBringEs.length > 0) ? item.whatToBringEs : (localTour?.whatToBringEs || []),
    whatToBringEn: (item.whatToBringEn && item.whatToBringEn.length > 0) ? item.whatToBringEn : (localTour?.whatToBringEn || []),
    itineraryEs: (item.itinerary && item.itinerary.length > 0)
      ? item.itinerary.map(d => ({
          day: d.dayNumber || 0,
          titleEs: d.title || "",
          titleEn: d.titleEn || "",
          descriptionEs: plainText(d.description) || "",
          descriptionEn: plainText(d.descriptionEn) || "",
          meals: d.meals || "",
          accommodation: d.accommodation || "",
        }))
      : (localTour?.itineraryEs || []),
    itineraryEn: (item.itinerary && item.itinerary.length > 0)
      ? item.itinerary.map(d => ({
          day: d.dayNumber || 0,
          titleEs: d.title || "",
          titleEn: d.titleEn || "",
          descriptionEs: plainText(d.description) || "",
          descriptionEn: plainText(d.descriptionEn) || "",
          meals: d.meals || "",
          accommodation: d.accommodation || "",
        }))
      : (localTour?.itineraryEn || []),
    startingPoint: item.startingPoint || localTour?.startingPoint || "",
    endingPoint: item.endingPoint || localTour?.endingPoint || "",
    pricingNoteEs: item.pricingNoteEs || localTour?.pricingNoteEs || "",
    pricingNoteEn: item.pricingNoteEn || localTour?.pricingNoteEn || "",
  };
}

function mapSanityDestination(item: any): DestinationData {
  return {
    id: item._id || item.slug?.current || "",
    slug: item.slug?.current || "",
    nameEs: item.name || "",
    nameEn: item.nameEn || "",
    descriptionEs: item.shortDescription || "",
    descriptionEn: item.shortDescriptionEn || "",
    image: item.heroImageUrl || "",
    order: item.order || 100,
  };
}

function mapSanityCustomizedTour(item: any): CustomizedTourData {
  return {
    id: item._id || item.slug?.current || "",
    slug: item.slug?.current || "",
    nameEs: item.nameEs || "",
    nameEn: item.nameEn || "",
    image: item.imageUrl || "",
    gallery: item.galleryUrls || [],
    descriptionEs: item.descriptionEs || [],
    descriptionEn: item.descriptionEn || [],
    duration: item.duration || 1,
    priceUSD: item.priceUSD || 0,
    destinations: item.destinations || [],
    includesEs: item.includesEs || [],
    includesEn: item.includesEn || [],
    itineraryEs: (item.itineraryEs || []).map(d => ({
      day: d.dayNumber || 0,
      titleEs: d.titleEs || "",
      titleEn: d.titleEn || "",
      descriptionEs: plainText(d.descriptionEs) || "",
      descriptionEn: plainText(d.descriptionEn) || "",
    })),
    itineraryEn: (item.itineraryEn || []).map(d => ({
      day: d.dayNumber || 0,
      titleEs: d.titleEs || "",
      titleEn: d.titleEn || "",
      descriptionEs: plainText(d.descriptionEs) || "",
      descriptionEn: plainText(d.descriptionEn) || "",
    })),
    durationRange: item.durationRange || "",
    featured: item.featured || false,
    order: item.order || 100,
  };
}

function mapSanityCommunityTour(item: any): CommunityTourData {
  return {
    id: item._id || item.slug?.current || "",
    slug: item.slug?.current || "",
    nameEs: item.nameEs || "",
    nameEn: item.nameEn || "",
    image: item.imageUrl || "",
    descriptionEs: item.descriptionEs || [],
    descriptionEn: item.descriptionEn || [],
    duration: item.duration || 1,
    priceUSD: item.priceUSD || 0,
    includesEs: item.includesEs || [],
    includesEn: item.includesEn || [],
    featured: item.featured || false,
    order: item.order || 100,
  };
}

function mapSanityProject(item: any): ProjectData {
  return {
    id: item._id || item.slug?.current || "",
    slug: item.slug?.current || "",
    nameEs: item.nameEs || "",
    nameEn: item.nameEn || "",
    image: item.imageUrl || "",
    descriptionEs: item.descriptionEs || [],
    descriptionEn: item.descriptionEn || [],
    featured: item.featured || false,
    order: item.order || 100,
  };
}

// ─── Data Adapter Functions ─────────────────────────

export async function getDestinations(): Promise<DestinationData[]> {
  if (!isSanityConfigured()) return localDestinations;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.destinationsQuery);
    if (data && data.length > 0) return data.map(mapSanityDestination);
  } catch {}
  return localDestinations;
}

export async function getDestinationBySlugFn(slug: string): Promise<DestinationData | null> {
  if (!isSanityConfigured()) return getDestinationBySlug(slug) || null;
  try {
    const { data } = await fetchCMSDraft<any>(queries.destinationBySlugQuery(slug));
    if (data) return mapSanityDestination(data);
  } catch {}
  return getDestinationBySlug(slug) || null;
}

export async function getAllTours(): Promise<TourData[]> {
  if (!isSanityConfigured()) return localTours;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.toursQuery);
    if (data && data.length > 0) return data.map(mapSanityTour);
  } catch {}
  return localTours;
}

export async function getFeaturedToursFn(): Promise<TourData[]> {
  if (!isSanityConfigured()) return getFeaturedTours();
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.featuredToursQuery);
    if (data && data.length > 0) return data.map(mapSanityTour);
  } catch {}
  return getFeaturedTours();
}

export async function getTourBySlugFn(slug: string): Promise<TourData | null> {
  if (!isSanityConfigured()) return getTourBySlug(slug) || null;
  try {
    const { data } = await fetchCMSDraft<any>(queries.tourBySlugQuery(slug));
    if (data) return mapSanityTour(data);
  } catch {}
  return getTourBySlug(slug) || null;
}

export async function getToursByDestinationFn(destSlug: string): Promise<TourData[]> {
  if (!isSanityConfigured()) return getToursByDestination(destSlug);
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.toursByDestinationQuery(destSlug));
    if (data && data.length > 0) return data.map(mapSanityTour);
  } catch {}
  return getToursByDestination(destSlug);
}

export async function getCustomizedTours(): Promise<CustomizedTourData[]> {
  if (!isSanityConfigured()) return localCustomizedTours;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.customizedToursQuery);
    if (data && data.length > 0) return data.map(mapSanityCustomizedTour);
  } catch {}
  return localCustomizedTours;
}

export async function getCustomizedTourBySlugFn(slug: string): Promise<CustomizedTourData | null> {
  if (!isSanityConfigured()) return getCustomizedTourBySlug(slug) || null;
  try {
    const { data } = await fetchCMSDraft<any>(queries.customizedTourBySlugQuery(slug));
    if (data) return mapSanityCustomizedTour(data);
  } catch {}
  return getCustomizedTourBySlug(slug) || null;
}

export async function getCommunityTours(): Promise<CommunityTourData[]> {
  if (!isSanityConfigured()) return localCommunityTours;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.communityToursQuery);
    if (data && data.length > 0) return data.map(mapSanityCommunityTour);
  } catch {}
  return localCommunityTours;
}

export async function getCommunityTourBySlugFn(slug: string): Promise<CommunityTourData | null> {
  if (!isSanityConfigured()) return getCommunityTourBySlug(slug) || null;
  try {
    const { data } = await fetchCMSDraft<any>(queries.communityTourBySlugQuery(slug));
    if (data) return mapSanityCommunityTour(data);
  } catch {}
  return getCommunityTourBySlug(slug) || null;
}

export async function getProjects(): Promise<ProjectData[]> {
  if (!isSanityConfigured()) return localProjects;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.projectsQuery);
    if (data && data.length > 0) return data.map(mapSanityProject);
  } catch {}
  return localProjects;
}

export async function getProjectBySlugFn(slug: string): Promise<ProjectData | null> {
  if (!isSanityConfigured()) return getProjectBySlug(slug) || null;
  try {
    const { data } = await fetchCMSDraft<any>(queries.projectBySlugQuery(slug));
    if (data) return mapSanityProject(data);
  } catch {}
  return getProjectBySlug(slug) || null;
}

export async function getAllTestimonials() {
  if (!isSanityConfigured()) return null;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.testimonialsQuery); return data;
  } catch { return null; }
}

export async function getFeaturedTestimonials() {
  if (!isSanityConfigured()) return null;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.featuredTestimonialsQuery); return data;
  } catch { return null; }
}

export async function getStats() {
  if (!isSanityConfigured()) return null;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.statsQuery); return data;
  } catch { return null; }
}

export async function getTeamMembers() {
  if (!isSanityConfigured()) return null;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.teamMembersQuery); return data;
  } catch { return null; }
}

export async function getFAQItems() {
  if (!isSanityConfigured()) return null;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.faqQuery); return data;
  } catch { return null; }
}

export async function getSiteSettings() {
  if (!isSanityConfigured()) return null;
  try {
    const { data } = await fetchCMSDraft<any>(queries.siteSettingsQuery); return data;
  } catch { return null; }
}

export async function getPageSections(page: string) {
  if (!isSanityConfigured()) return null;
  try {
    const { data } = await fetchCMSDraft<any[]>(queries.pageSectionsQuery(page)); return data;
  } catch { return null; }
}

// Re-export local functions as fallbacks
export { getRelatedTours } from "./tours-data";
