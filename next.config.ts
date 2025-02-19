import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true
      },
      {
        source: '/register',
        destination: '/auth/register',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/auth/login/:path*',
        destination: '/auth/login',
      }
    ]
  }
};

export default nextConfig;
