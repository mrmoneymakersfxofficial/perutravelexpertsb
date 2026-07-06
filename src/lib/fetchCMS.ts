import { draftMode } from "next/headers";
import { getClientForDraft } from "@/lib/sanity.client";
import { sanityFetch } from "@/sanity/live";

export async function fetchCMS<T>(query: string): Promise<T | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !process.env.NEXT_PUBLIC_SANITY_PROJECT) return null;
    let isDraft = false;
    try { const dm = await draftMode(); isDraft = dm.isEnabled; } catch {}

    if (isDraft) {
      const result = await sanityFetch<any>({ query });
      return (result?.data ?? null) as T | null;
    }

    const client = getClientForDraft(false);
    if (!client) return null;
    const data = await client.fetch<T>(query);
    return data ?? null;
  } catch (error) { console.warn("[CMS] Fetch failed, using fallback:", error); return null; }
}