import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const r2BaseUrl = process.env.R2_PUBLIC_BASE_URL;
const r2Hostname = r2BaseUrl ? new URL(r2BaseUrl).hostname : null;

const remotePatterns: RemotePattern[] = [
  {
    protocol: "https",
    hostname: "**.r2.dev",
    pathname: "/**",
  },
];

if (r2Hostname) {
  remotePatterns.push({
    protocol: "https",
    hostname: r2Hostname,
    pathname: "/**",
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
