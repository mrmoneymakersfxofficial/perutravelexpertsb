// @ts-nocheck
/**
 * Consultas GROQ para todos los tipos de contenido de Sanity.
 * Usar con fetchCMS() o sanityFetch()
 */

// ─── Site Settings ───────────────────────────────────
export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  companyName, slogan, tagline,
  "logoUrl": logo.asset->url,
  "logoWhiteUrl": logoWhite.asset->url,
  phone, whatsapp, email, address, businessHours,
  facebookUrl, instagramUrl, tiktokUrl, youtubeUrl, tripAdvisorUrl,
  mapLatitude, mapLongitude, mapZoom,
  seoTitle, seoDescription,
  homeAboutTitle, homeAboutDescription,
  "homeAboutImageUrl": homeAboutImage.asset->url,
  homeWhyChooseTitle,
  homeCtaTitle, homeCtaSubtitle, homeCtaWhatsapp
}`;

// ─── Hero Slides ────────────────────────────────────
export const heroSlidesQuery = `*[_type == "heroSlide"] | order(order asc){
  title, subtitle, ctaLabel, ctaLink, ctaType,
  "backgroundImageUrl": backgroundImage.asset->url,
  order
}`;

// ─── Destinations ────────────────────────────────────
export const destinationsQuery = `*[_type == "destination"] | order(order asc){
  name, nameEn, slug, shortDescription, shortDescriptionEn,
  "heroImageUrl": heroImage.asset->url,
  "galleryUrls": gallery[].asset->url,
  mapLatitude, mapLongitude,
  climate, bestTimeToVisit, highlights,
  featured, order
}`;

export const destinationBySlugQuery = (slug: string) => `*[_type == "destination" && slug.current == "${slug}"][0]{
  name, nameEn, slug, shortDescription, shortDescriptionEn,
  description, descriptionEn,
  "heroImageUrl": heroImage.asset->url,
  "galleryUrls": gallery[].asset->url,
  mapLatitude, mapLongitude,
  climate, bestTimeToVisit, highlights,
  featured, order
}`;

// ─── Tours ────────────────────────────────────────────
export const toursQuery = `*[_type == "tour"] | order(order asc){
  title, titleEn, subtitleEs, subtitleEn, slug, excerpt, excerptEn,
  "coverImageUrl": coverImage.asset->url,
  "galleryUrls": gallery[].asset->url,
  "destination": destination->{name, nameEn, "slug": slug.current},
  duration, priceUSD, highSeasonPrice, difficulty, groupSize,
  includes, includesEn, notIncludes, notIncludesEn,
  highlightsEs, highlightsEn,
  whatToBringEs, whatToBringEn,
  pricingNoteEs, pricingNoteEn,
  startingPoint, endingPoint,
  featured, order
}`;

export const featuredToursQuery = `*[_type == "tour" && featured == true] | order(order asc){
  title, titleEn, subtitleEs, subtitleEn, slug, excerpt, excerptEn,
  "coverImageUrl": coverImage.asset->url,
  "destination": destination->{name, nameEn, "slug": slug.current},
  duration, priceUSD, highSeasonPrice, difficulty, groupSize,
  includes, includesEn, notIncludes, notIncludesEn,
  highlightsEs, highlightsEn,
  startingPoint, endingPoint,
  featured, order
}[0...6]`;

export const tourBySlugQuery = (slug: string) => `*[_type == "tour" && slug.current == "${slug}"][0]{
  title, titleEn, subtitleEs, subtitleEn, slug, excerpt, excerptEn,
  description, descriptionEn,
  "coverImageUrl": coverImage.asset->url,
  "galleryUrls": gallery[].asset->url,
  "destination": destination->{name, nameEn, "slug": slug.current},
  duration, priceUSD, highSeasonPrice, difficulty, groupSize,
  includes, includesEn, notIncludes, notIncludesEn,
  highlightsEs, highlightsEn,
  whatToBringEs, whatToBringEn,
  pricingNoteEs, pricingNoteEn,
  itinerary,
  startingPoint, endingPoint,
  featured, order
}`;

export const toursByDestinationQuery = (destSlug: string) => `*[_type == "tour" && destination->slug.current == "${destSlug}"] | order(order asc){
  title, titleEn, subtitleEs, subtitleEn, slug, excerpt, excerptEn,
  "coverImageUrl": coverImage.asset->url,
  "galleryUrls": gallery[].asset->url,
  duration, priceUSD, highSeasonPrice, difficulty, groupSize,
  includes, includesEn, highlightsEs, highlightsEn,
  featured, order
}`;

// ─── Customized Tours ────────────────────────────────
export const customizedToursQuery = `*[_type == "customizedTour"] | order(order asc){
  nameEs, nameEn, slug,
  "imageUrl": image.asset->url,
  "galleryUrls": gallery[].asset->url,
  descriptionEs, descriptionEn,
  duration, priceUSD, destinations,
  includesEs, includesEn,
  itineraryEs, itineraryEn,
  durationRange, featured, order
}`;

export const customizedTourBySlugQuery = (slug: string) => `*[_type == "customizedTour" && slug.current == "${slug}"][0]{
  nameEs, nameEn, slug,
  "imageUrl": image.asset->url,
  "galleryUrls": gallery[].asset->url,
  descriptionEs, descriptionEn,
  duration, priceUSD, destinations,
  includesEs, includesEn,
  itineraryEs, itineraryEn,
  durationRange, featured, order
}`;

// ─── Testimonials ────────────────────────────────────
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  authorName, authorRole, company, flag,
  textEs, textEn, quote, quoteEn,
  "photoUrl": photo.asset->url,
  rating,
  "tour": tour->{title, "slug": slug.current},
  tripDate, featured, order
}`;

export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] | order(order asc){
  authorName, authorRole, company, flag,
  textEs, textEn, quote, quoteEn,
  "photoUrl": photo.asset->url,
  rating,
  "tour": tour->{title, "slug": slug.current},
  tripDate, featured, order
}[0...6]`;

// ─── Stats ────────────────────────────────────────────
export const statsQuery = `*[_type == "stat"] | order(order asc){
  label, labelEn, value, suffix, prefix, order
}`;

// ─── Team Members ────────────────────────────────────
export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc){
  name, role, roleEn,
  "photoUrl": photo.asset->url,
  bio, bioEn, languages, specialty, email, phone, order
}`;

// ─── Partners ─────────────────────────────────────────
export const partnersQuery = `*[_type == "partner"] | order(order asc){
  name, "logoUrl": logo.asset->url, url, order
}`;

// ─── Page Sections ────────────────────────────────────
export const pageSectionsQuery = (page: string) => `*[_type == "pageSection" && page == "${page}"] | order(order asc){
  page, sectionId, title, titleEn, subtitle, subtitleEn,
  content, contentEn,
  "imageUrl": image.asset->url,
  ctaLabel, ctaLabelEn, ctaLink, order, visible
}`;

// ─── FAQ ──────────────────────────────────────────────
export const faqQuery = `*[_type == "faq"] | order(order asc){
  question, questionEn, answer, answerEn, category, order
}`;

// ─── Community Tours ─────────────────────────────────
export const communityToursQuery = `*[_type == "communityTour"] | order(order asc){
  nameEs, nameEn, slug,
  "imageUrl": image.asset->url,
  descriptionEs, descriptionEn,
  duration, priceUSD, includesEs, includesEn,
  location, featured, order
}`;

export const communityTourBySlugQuery = (slug: string) => `*[_type == "communityTour" && slug.current == "${slug}"][0]{
  nameEs, nameEn, slug,
  "imageUrl": image.asset->url,
  descriptionEs, descriptionEn,
  duration, priceUSD, includesEs, includesEn,
  location, featured, order
}`;

// ─── Projects ────────────────────────────────────────
export const projectsQuery = `*[_type == "project"] | order(order asc){
  nameEs, nameEn, slug,
  "imageUrl": image.asset->url,
  descriptionEs, descriptionEn,
  impactLabel, websiteUrl, featured, order
}`;

export const projectBySlugQuery = (slug: string) => `*[_type == "project" && slug.current == "${slug}"][0]{
  nameEs, nameEn, slug,
  "imageUrl": image.asset->url,
  descriptionEs, descriptionEn,
  impactLabel, websiteUrl, featured, order
}`;
