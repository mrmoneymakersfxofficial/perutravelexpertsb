import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/";

  try {
    const draft = await draftMode();
    draft.disable();
    console.log("[Draft Mode] Disabled — redirecting to", redirectUrl);
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error("[Draft Mode] Error disabling:", error);
    return NextResponse.json(
      { error: "Error al desactivar modo borrador" },
      { status: 500 }
    );
  }
}
