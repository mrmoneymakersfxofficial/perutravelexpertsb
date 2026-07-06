// @ts-nocheck
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Peru Travel Experts B";
export const STUDIO_TITLE = `${COMPANY_NAME} CMS`;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
export const BRAND_COLORS = { primary: "#C5A55A", accent: "#D4A843", dark: "#0F0F0F" } as const;