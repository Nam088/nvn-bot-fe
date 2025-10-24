import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Chỉ dùng assetPrefix để thêm /nvn-fe vào static files
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
