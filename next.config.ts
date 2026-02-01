import type { NextConfig } from "next";

const r2BaseUrl = process.env.R2_PUBLIC_BASE_URL;
const r2Hostname = r2BaseUrl ? new URL(r2BaseUrl).hostname : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.dev",
        pathname: "/**",
      },
      ...(r2Hostname
        ? [
            {
              protocol: "https",
              hostname: r2Hostname,
              pathname: "/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
