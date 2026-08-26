import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Self-hosted JPEGs are pre-compressed (npm run optimize-images).
    // Skipping runtime optimization keeps Render's 512MB free tier from
    // OOM-crashing when sharp processes multi-megabyte uploads.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/the-program", destination: "/program", permanent: true },
      { source: "/for-students", destination: "/students", permanent: true },
      { source: "/for-schools", destination: "/schools", permanent: true },
      { source: "/for-mentors", destination: "/mentors", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
