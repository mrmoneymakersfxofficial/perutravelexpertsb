import { redirect } from "next/navigation";

/**
 * Redirects to the Sanity Studio deployed on Sanity's CDN.
 * Uses Presentation Tool with Visual Editing overlay.
 */
export default function AdminCatchAll() {
  redirect("https://perutravelexpertsb-cms.sanity.studio");
}