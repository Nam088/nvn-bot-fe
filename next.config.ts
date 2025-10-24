import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Chỉ dùng basePath khi build production
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/nvn-fe',
    assetPrefix: '/nvn-fe',
    trailingSlash: true,
  }),
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
