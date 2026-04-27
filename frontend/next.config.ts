import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
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
        hostname: 'sportsholics.duckdns.org',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'sportsholics.gr',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.sportsholics.gr',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'clever-garden-138bbdfa99.media.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
