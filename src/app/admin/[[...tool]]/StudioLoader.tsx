"use client";
import { NextStudio } from "next-sanity/studio";

// This file is ONLY loaded on /admin routes (never on the public site).
// The sanity.config and all schemas are imported here to prevent
// Turbopack/webpack from including them in the public site bundle.
import config from "../../../../sanity.config";

export default function StudioLoader() {
  return <NextStudio config={config.default || config} />;
}