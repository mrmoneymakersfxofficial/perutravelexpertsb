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
  return {
    id: item._id || item.slug?.current || "",
    slug: item.slug?.current || "",
    active: true,
    featured: item.featured || false,
    order: item.order || 100,
    nameEs: item.title || "",
    nameEn: item.titleEn || "",
    subtitleEs: item.subtitleEs || "",
    subtitleEn: item.subtitleEn || "",
    descriptionEs: item.excerpt || plainText(item.description || item.descriptionEs) || "",
    descriptionEn: item.excerptEn || plainText(item.descriptionEn) || "",
    image: item.coverImageUrl || "",
    gallery: item.galleryUrls || [],
    duration: item.duration || 1,
    difficulty: item.difficulty || "moderate",
    priceUSD: item.priceUSD || 0,
    highSeasonPrice: item.highSeasonPrice,
    groupSize: item.groupSize,
    destination: item.destination?.slug || "",
    includesEs: item.includes || [],
    includesEn: item.includesEn || [],
    excludesEs: item.notIncludes || [],
    excludesEn: item.notIncludesEn || [],
    highlightsEs: item.highlightsEs || [],
    highlightsEn: item.highlightsEn || [],
    whatToBringEs: item.whatToBringEs || [],
    whatToBringEn: item.whatToBringEn || [],
    itineraryEs: (item.itinerary || []).map(d => ({
      day: d.dayNumber || 0,
      titleEs: d.title || "",
      titleEn: d.titleEn || "",
      descriptionEs: plainText(d.description) || "",
      descriptionEn: plainText(d.descriptionEn) || "",
      meals: d.meals || "",
      accommodation: d.accommodation || "",
    })),
    itineraryEn: (item.itinerary || []).map(d => ({
      day: d.dayNumber || 0,
      titleEs: d.title || "",
      titleEn: d.titleEn || "",
      descriptionEs: plainText(d.description) || "",
      descriptionEn: plainText(d.descriptionEn) || "",
      meals: d.meals || "",
      accommodation: d.accommodation || "",
    })),
    startingPoint: item.startingPoint || "",
    endingPoint: item.endingPoint || "",
    pricingNoteEs: item.pricingNoteEs || "",
    pricingNoteEn: item.pricingNoteEn || "",
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
