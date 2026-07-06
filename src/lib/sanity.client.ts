import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";

function createSanityClient(options?: { perspective?: "published" | "previewDrafts" }): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
  const isDraft = options?.perspective === "previewDrafts";
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2025-01-01",
    useCdn: !isDraft,
    perspective: isDraft ? "previewDrafts" : "published",
    token: isDraft ? process.env.SANITY_API_READ_TOKEN : undefined,
    stega: { enabled: true, studioUrl: "/admin" },
  });
}

let _publishedClient: SanityClient | null = null;
export function getPublishedClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;
  if (!_publishedClient) _publishedClient = createSanityClient({ perspective: "published" });
  return _publishedClient;
}

function getDraftClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;
  return createSanityClient({ perspective: "previewDrafts" });
}

export function getClientForDraft(isDraft: boolean): SanityClient | null {
  return isDraft ? getDraftClient() : getPublishedClient();
}

export const sanityClient = {
  fetch: async <T = unknown>(query: string): Promise<T> => {
    const client = getPublishedClient();
    if (!client) return [] as unknown as T;
    return client.fetch<T>(query);
  },
} as Pick<SanityClient, "fetch">;

export function urlFor(source: Parameters<ImageUrlBuilder["image"]>[0]) {
  const client = getPublishedClient();
  if (!client) return { url: () => "" } as unknown as ReturnType<ImageUrlBuilder["image"]>;
  return createImageUrlBuilder(client).image(source);
}

// === TYPES ===
export interface SanityImage { asset?: { _ref: string; _type: string; _id?: string; url?: string }; alt?: string; caption?: string; hotspot?: { x: number; y: number; height: number; width: number }; crop?: { top: number; bottom: number; left: number; right: number }; }
export interface PortableTextBlock { _type: string; _key: string; children: Array<{ text: string; marks: string[] }>; style?: string; markDefs?: Array<{ _key: string; _type: string; href?: string }>; listItem?: string; level?: number; }

export interface SanitySiteSettings { _id: string; companyName?: string; slogan?: string; tagline?: string; logo?: SanityImage | null; logoWhite?: SanityImage | null; ogImage?: SanityImage | null; phone?: string; whatsapp?: string; email?: string; address?: string; businessHours?: string; facebookUrl?: string; instagramUrl?: string; tiktokUrl?: string; youtubeUrl?: string; tripAdvisorUrl?: string; mapLatitude?: number; mapLongitude?: number; mapZoom?: number; seoTitle?: string; seoDescription?: string; homeAboutTitle?: string; homeAboutDescription?: PortableTextBlock[]; homeAboutImage?: SanityImage | null; homeWhyChooseTitle?: string; homeCtaTitle?: string; homeCtaSubtitle?: string; homeCtaWhatsapp?: string; }
export interface SanityHeroSlide { _id: string; title: string; subtitle?: PortableTextBlock[]; backgroundImage?: SanityImage | null; ctaLabel?: string; ctaLink?: string; ctaType?: string; order?: number; }
export interface SanityDestination { _id: string; name: string; slug: string; heroImage?: SanityImage | null; description?: PortableTextBlock[]; shortDescription?: string; gallery?: SanityImage[]; mapLatitude?: number; mapLongitude?: number; climate?: string; bestTimeToVisit?: string; highlights?: string[]; featured?: boolean; order?: number; }
export interface SanityTour { _id: string; title: string; titleEn?: string; slug: string; coverImage?: SanityImage | null; gallery?: SanityImage[]; description?: PortableTextBlock[]; descriptionEn?: PortableTextBlock[]; excerpt?: string; excerptEn?: string; destination?: SanityDestination | null; duration: number; priceUSD?: number; difficulty?: string; groupSize?: number; includes?: string[]; includesEn?: string[]; notIncludes?: string[]; notIncludesEn?: string[]; itinerary?: Array<{ day: number; titleEs: string; titleEn?: string; descriptionEs?: PortableTextBlock[]; descriptionEn?: PortableTextBlock[]; meals?: string; accommodation?: string }>; startingPoint?: string; endingPoint?: string; featured?: boolean; order?: number; }
export interface SanityCustomizedTour { _id: string; nameEs: string; nameEn?: string; slug: string; image?: SanityImage | null; gallery?: SanityImage[]; descriptionEs?: PortableTextBlock[]; descriptionEn?: PortableTextBlock[]; duration: number; priceUSD?: number; destinations?: string[]; includesEs?: string[]; includesEn?: string[]; itineraryEs?: Array<{ day: number; titleEs: string; titleEn?: string; descriptionEs?: PortableTextBlock[]; descriptionEn?: PortableTextBlock[] }>; durationRange?: string; featured?: boolean; order?: number; }
export interface SanityTestimonial { _id: string; authorName: string; authorRole?: string; company?: string; quote?: PortableTextBlock[]; quoteEn?: PortableTextBlock[]; photo?: SanityImage | null; rating?: number; tour?: { _id: string; title: string; slug: string } | null; tripDate?: string; featured?: boolean; order?: number; }
export interface SanityStat { _id: string; label: string; labelEn?: string; value: number; suffix?: string; prefix?: string; order?: number; }
export interface SanityTeamMember { _id: string; name: string; role?: string; roleEn?: string; photo?: SanityImage | null; bio?: PortableTextBlock[]; bioEn?: PortableTextBlock[]; languages?: string[]; specialty?: string; email?: string; phone?: string; order?: number; }
export interface SanityPartner { _id: string; name: string; logo?: SanityImage | null; url?: string; order?: number; }
export interface SanityPageSection { _id: string; page: string; sectionId?: string; title?: string; titleEn?: string; subtitle?: string; subtitleEn?: string; content?: PortableTextBlock[]; contentEn?: PortableTextBlock[]; image?: SanityImage | null; ctaLabel?: string; ctaLabelEn?: string; ctaLink?: string; order?: number; visible?: boolean; }

export function plainText(blocks: PortableTextBlock[] | undefined | null): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks.map((b) => b._type === "block" && b.children ? b.children.map((c) => c.text).join("") : "").join("\n").trim();
}

export function getImageUrl(image: SanityImage | null | undefined, width = 800, height = 600): string | null {
  if (!image || !image.asset) return null;
  try { return urlFor(image).width(width).height(height).fit("crop").url(); } catch { return null; }
}