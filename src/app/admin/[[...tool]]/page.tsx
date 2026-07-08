import { redirect } from "next/navigation";

/**
 * Redirige al Sanity Studio desplegado en Sanity's CDN.
 * Tiene Presentation Tool con overlay Visual Editing.
 */
export default function AdminCatchAll() {
  redirect("https://perutravelexpertsb-cms.sanity.studio");
}
