import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  async redirects() {
    return [
      // Old /tour-packages/{destination} → new /our-tours/{destination}
      { source: '/tour-packages/cusco', destination: '/our-tours/cusco', permanent: true },
      { source: '/tour-packages/puno', destination: '/our-tours/puno', permanent: true },
      { source: '/tour-packages/amazon', destination: '/our-tours/amazon', permanent: true },
      { source: '/tour-packages/arequipa', destination: '/our-tours/arequipa', permanent: true },
      { source: '/tour-packages/lima-ica', destination: '/our-tours/lima-ica', permanent: true },
      // Old /tour-packages/{destination}/{slug} → new /our-tours/{destination}/{slug}
      { source: '/tour-packages/cusco/:slug', destination: '/our-tours/cusco/:slug', permanent: true },
      { source: '/tour-packages/puno/:slug', destination: '/our-tours/puno/:slug', permanent: true },
      { source: '/tour-packages/amazon/:slug', destination: '/our-tours/amazon/:slug', permanent: true },
      { source: '/tour-packages/arequipa/:slug', destination: '/our-tours/arequipa/:slug', permanent: true },
      { source: '/tour-packages/lima-ica/:slug', destination: '/our-tours/lima-ica/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
