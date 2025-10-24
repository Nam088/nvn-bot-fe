import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tạm thời bỏ basePath để fix lỗi static files
  // basePath: '/nvn-fe',
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
