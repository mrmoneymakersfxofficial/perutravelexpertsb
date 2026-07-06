import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.SANITY_API_READ_TOKEN || "";
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

  if (!token || !projectId) {
    return NextResponse.json({ token: "", projectId: "" });
  }

  return NextResponse.json({ token, projectId }, {
    headers: { "Cache-Control": "private, no-store, no-cache, must-revalidate" },
  });
}