import { env } from "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  /* Sends the frontend cookies or requests to the backend */
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
      },
      {
      source: "/api/:path*",
      destination: `${env.NEXT_PUBLIC_BACKEND_URL}/:path*`,
    },
    ];
  },
};

export default nextConfig;
