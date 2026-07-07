import { getClientForDraft } from "@/lib/sanity.client";

/**
 * Fetch data from Sanity CMS con fallback.
 * Siempre usa datos publicados durante el build (static generation).
 * En runtime, el draft mode se maneja via los server components (page.tsx) 
 * que llaman al adapter.
 */
export async function fetchCMS<T>(query: string): Promise<T | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !process.env.NEXT_PUBLIC_SANITY_PROJECT) return null;

    // Durante build (static generation), siempre usar cliente publicado
    // draftMode() no está disponible fuera de request context
    const client = getClientForDraft(false);
    if (!client) return null;
    const data = await client.fetch<T>(query);
    return data ?? null;
  } catch (error) {
    console.warn("[CMS] Fetch failed, using fallback:", error);
    return null;
  }
}

/**
 * Fetch con draft mode — solo usar en server components en runtime.
 * Requiere request context (draftMode() disponible).
 */
export async function fetchCMSDraft<T>(query: string): Promise<T | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !process.env.NEXT_PUBLIC_SANITY_PROJECT) return null;

    let isDraft = false;
    try {
      const { draftMode } = await import("next/headers");
      const dm = await draftMode();
      isDraft = dm.isEnabled;
    } catch {
      // No request context (build time) — usar published
    }

    if (isDraft) {
      const { sanityFetch } = await import("@/sanity/live");
      const result = await sanityFetch<any>({ query });
      return (result?.data ?? null) as T | null;
    }

    const client = getClientForDraft(false);
    if (!client) return null;
    const data = await client.fetch<T>(query);
    return data ?? null;
  } catch (error) {
    console.warn("[CMS] Draft fetch failed, using fallback:", error);
    return null;
  }
}
