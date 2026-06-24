import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 414, 640, 750, 828, 1080, 1200, 1440, 1920],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;