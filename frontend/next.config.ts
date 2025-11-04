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
        hostname: '*.strapiapp.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
