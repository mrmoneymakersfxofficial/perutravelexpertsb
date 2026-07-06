/**
 * Middleware — Configura CSP headers para permitir Sanity Presentation Tool iframe.
 * 
 * La Sanity Presentation Tool abre el sitio público en un iframe para edición visual.
 * Necesitamos permitir framing desde el mismo origen y desde Sanity.
 */
import { NextResponse, type NextRequest } from "next/server";

const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT ||
  "";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo aplicar a rutas del sitio público
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/draft-mode") ||
    pathname.startsWith("/admin")
  ) {
    return NextResponse.next();
  }

  // Construir CSP — permite framing desde el mismo origen y Sanity
  const frameAncestors = [
    "'self'",
    "http://localhost:*",
    "https://*.sanity.dev",
    "https://*.sanity.build",
  ];
  if (SANITY_PROJECT_ID) {
    frameAncestors.push(`https://${SANITY_PROJECT_ID}.api.sanity.io`);
  }

  const csp = `frame-ancestors ${frameAncestors.join(" ")}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    // Skip static files, API routes (except draft-mode), admin panel
    "/((?!_next/static|_next/image|favicon.ico|admin|api/(?!draft-mode)).*)",
  ],
};
