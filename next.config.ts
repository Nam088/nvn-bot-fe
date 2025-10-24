import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/nvn-fe',
  assetPrefix: '/nvn-fe',
  trailingSlash: true,
  images: {
    path: '/nvn-fe/_next/image',
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
