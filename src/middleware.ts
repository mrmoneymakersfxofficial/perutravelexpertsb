/**
 * Middleware — Manejo de draft mode para Sanity Visual Editing.
 * Las cabeceras CSP ahora se configuran en next.config.ts via headers().
 */
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirigir /admin a /admin/ si no termina en /
  // (evita problemas de asset paths en Sanity Studio)
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
