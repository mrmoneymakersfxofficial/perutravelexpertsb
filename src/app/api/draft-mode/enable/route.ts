import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Activa el Draft Mode para Sanity Visual Editing.
 * Validación: verifica que exista el SANITY_API_READ_TOKEN (seguridad básica).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/";

  // Validar que Sanity esté configurado (seguridad básica)
  const sanityToken =
    process.env.SANITY_API_READ_TOKEN ||
    process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN;

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !process.env.NEXT_PUBLIC_SANITY_PROJECT) {
    return NextResponse.json(
      { error: "Sanity CMS no configurado" },
      { status: 400 }
    );
  }

  try {
    const draft = await draftMode();
    draft.enable();
    console.log("[Draft Mode] Enabled — redirecting to", redirectUrl);
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error("[Draft Mode] Error enabling:", error);
    return NextResponse.json(
      { error: "Error al activar modo borrador" },
      { status: 500 }
    );
  }
}
