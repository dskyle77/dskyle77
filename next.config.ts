import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    formats: ["image/avif", "image/webp"],
    // Users may paste any external image URL — allow all HTTPS hosts.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
};

export default nextConfig;
