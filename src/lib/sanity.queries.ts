const IMAGE_FIELDS = `asset->, alt, caption, hotspot, crop`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] { _id, companyName, slogan, tagline, logo { ${IMAGE_FIELDS} }, logoWhite { ${IMAGE_FIELDS} }, ogImage { ${IMAGE_FIELDS} }, phone, whatsapp, email, address, businessHours, facebookUrl, instagramUrl, tiktokUrl, youtubeUrl, tripAdvisorUrl, mapLatitude, mapLongitude, mapZoom, seoTitle, seoDescription, homeAboutTitle, homeAboutDescription, homeAboutImage { ${IMAGE_FIELDS} }, homeWhyChooseTitle, homeCtaTitle, homeCtaSubtitle, homeCtaWhatsapp }`;

export const ALL_HERO_SLIDES_QUERY = `*[_type == "heroSlide"] | order(order asc) { _id, title, subtitle, backgroundImage { ${IMAGE_FIELDS} }, ctaLabel, ctaLink, ctaType, order }`;

export const ALL_DESTINATIONS_QUERY = `*[_type == "destination"] | order(order asc) { _id, name, "slug": slug.current, heroImage { ${IMAGE_FIELDS} }, description, shortDescription, gallery[] { ${IMAGE_FIELDS} }, mapLatitude, mapLongitude, climate, bestTimeToVisit, highlights[], featured, order }`;

export const ALL_TOURS_QUERY = `*[_type == "tour"] | order(order asc) { _id, title, titleEn, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, gallery[] { ${IMAGE_FIELDS} }, description, descriptionEn, excerpt, excerptEn, destination-> { _id, name, "slug": slug.current }, duration, priceUSD, difficulty, groupSize, includes, includesEn, notIncludes, notIncludesEn, itinerary, startingPoint, endingPoint, featured, order }`;

export const FEATURED_TOURS_QUERY = `*[_type == "tour" && featured == true] | order(order asc) { _id, title, titleEn, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, excerpt, excerptEn, destination-> { _id, name, "slug": slug.current }, duration, priceUSD, difficulty, featured, order }[0..8]`;

export function tourBySlugQuery(slug: string) { return `*[_type == "tour" && slug.current == "${slug}"][0] { _id, title, titleEn, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, gallery[] { ${IMAGE_FIELDS} }, description, descriptionEn, excerpt, excerptEn, destination-> { _id, name, "slug": slug.current }, duration, priceUSD, difficulty, groupSize, includes, includesEn, notIncludes, notIncludesEn, itinerary, startingPoint, endingPoint, featured, order }`; }

export function toursByDestinationQuery(destSlug: string) { return `*[_type == "tour" && destination->slug.current == "${destSlug}"] | order(order asc) { _id, title, titleEn, "slug": slug.current, coverImage { ${IMAGE_FIELDS} }, excerpt, excerptEn, duration, priceUSD, difficulty, featured, order }`; }

export const ALL_CUSTOMIZED_TOURS_QUERY = `*[_type == "customizedTour"] | order(order asc) { _id, nameEs, nameEn, "slug": slug.current, image { ${IMAGE_FIELDS} }, gallery[] { ${IMAGE_FIELDS} }, descriptionEs, descriptionEn, duration, priceUSD, destinations[], includesEs, includesEn, itineraryEs, durationRange, featured, order }`;

export function customizedTourBySlugQuery(slug: string) { return `*[_type == "customizedTour" && slug.current == "${slug}"][0] { _id, nameEs, nameEn, "slug": slug.current, image { ${IMAGE_FIELDS} }, gallery[] { ${IMAGE_FIELDS} }, descriptionEs, descriptionEn, duration, priceUSD, destinations[], includesEs, includesEn, itineraryEs, durationRange, featured, order }`; }

export const ALL_TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc) { _id, authorName, authorRole, company, quote, quoteEn, photo { ${IMAGE_FIELDS} }, rating, tour-> { _id, title, "slug": slug.current }, tripDate, featured, order }`;

export const FEATURED_TESTIMONIALS_QUERY = `*[_type == "testimonial" && featured == true] | order(order asc) { _id, authorName, authorRole, company, quote, quoteEn, photo { ${IMAGE_FIELDS} }, rating, tour-> { _id, title, "slug": slug.current }, tripDate, featured, order }[0..6]`;

export const ALL_STATS_QUERY = `*[_type == "stat"] | order(order asc) { _id, label, labelEn, value, suffix, prefix, order }`;

export const ALL_TEAM_QUERY = `*[_type == "teamMember"] | order(order asc) { _id, name, role, roleEn, photo { ${IMAGE_FIELDS} }, bio, bioEn, languages[], specialty, email, phone, order }`;

export const ALL_PARTNERS_QUERY = `*[_type == "partner"] | order(order asc) { _id, name, logo { ${IMAGE_FIELDS} }, url, order }`;

export function pageSectionsQuery(page: string) { return `*[_type == "pageSection" && page == "${page}" && visible == true] | order(order asc) { _id, page, sectionId, title, titleEn, subtitle, subtitleEn, content, contentEn, image { ${IMAGE_FIELDS} }, ctaLabel, ctaLabelEn, ctaLink, order, visible }`; }