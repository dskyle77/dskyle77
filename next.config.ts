import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Same as sitenix: keep firebase-admin external so CJS deps resolve at runtime.
  serverExternalPackages: ["firebase-admin"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
