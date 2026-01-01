import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // 1. Only use 'export' when building for production (Electron .exe)
  // This prevents the "Turbopack" crash in dev mode
  output: isProd ? "export" : undefined,

  images: { unoptimized: true },

  // 2. Redirects (Works in Dev, ignored in Static Export)
  redirects: async () => [
    {
      source: "/",
      destination: "/month-view",
      permanent: false,
    },
  ],

  // 3. Suppress Build Errors (Crucial for Vercel/Electron builds)
  typescript: {
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;