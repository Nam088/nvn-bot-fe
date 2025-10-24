import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/nvn-fe',
  assetPrefix: '/nvn-fe',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
