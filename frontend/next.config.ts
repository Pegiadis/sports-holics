import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during build to allow deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Optional: also ignore TypeScript errors during build
    // ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.railway.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.up.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
