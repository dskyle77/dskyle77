import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep firebase-admin outside the Turbopack/webpack bundle so its
  // CJS deps (jwks-rsa → jose) resolve correctly on Vercel.
  serverExternalPackages: ["firebase-admin"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
