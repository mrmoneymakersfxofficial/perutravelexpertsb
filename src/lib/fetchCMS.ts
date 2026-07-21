import { getClientForDraft } from "@/lib/sanity.client";

/**
 * Fetch de Sanity — usa siempre datos publicados.
 * Seguro durante build (static generation).
 */
export async function fetchCMS<T>(query: string): Promise<T | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !process.env.NEXT_PUBLIC_SANITY_PROJECT) return null;
    const client = getClientForDraft(false);
    if (!client) return null;
    const data = await client.fetch<T>(query);
    return data ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch de Sanity CON soporte de Draft Mode para Visual Editing.
 * 
 * - En draft mode: usa sanityFetch (stega encoding activo → overlay funciona)
 * - Sin draft mode: usa cliente publicado (como fetchCMS)
 * - Durante build: captura error de draftMode() y usa publicado
 * 
 * Solo usar en server components (page.tsx).
 */
export async function fetchCMSDraft<T>(query: string): Promise<{ data: T | null; sourceMap?: any }> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !process.env.NEXT_PUBLIC_SANITY_PROJECT) {
      return { data: null };
    }

    // Intentar detectar draft mode — falla durante build, lo capturamos
    let isDraft = false;
    try {
      const { draftMode } = await import("next/headers");
      const dm = await draftMode();
      isDraft = dm.isEnabled;
    } catch {
      // Durante build (static generation) no hay request context
      // Usar published
    }

    if (isDraft) {
      // Draft mode: usar sanityFetch con stega encoding
      const { sanityFetch } = await import("@/sanity/live");
      const result = await sanityFetch<any>({ query });
      return { data: (result?.data ?? null) as T | null, sourceMap: result?.sourceMap };
    }

    // Published: usar cliente normal
    const client = getClientForDraft(false);
    if (!client) return { data: null };
    const data = await client.fetch<T>(query);
    return { data: data ?? null };
  } catch {
    return { data: null };
  }
}
