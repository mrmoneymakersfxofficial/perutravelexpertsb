import { redirect } from "next/navigation";

/**
 * Redirige al Sanity Studio hosteado por Sanity (no embedido en Next.js).
 * El Studio se despliega via `npx sanity deploy` desde la carpeta /studio.
 */
export default function AdminPage() {
  const studioUrl = "https://e1mckeul.sanity.studio";
  redirect(studioUrl);
}
