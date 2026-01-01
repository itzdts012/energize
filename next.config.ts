import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  redirects: async () => [
    {
      source: "/",
      destination: "/month-view",
      permanent: false,
    },
  ],
  // ← ADD THESE TWO BLOCKS:
  typescript: {
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
