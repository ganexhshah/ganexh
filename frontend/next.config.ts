import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  transpilePackages: ["sanity", "next-sanity", "@sanity/vision", "@sanity/image-url", "@sanity/sdk-react", "@sanity/workbench"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "assets.ganeshshah.com",
      },
      {
        protocol: "https",
        hostname: "ganeshshah.com",
      },
      {
        protocol: "https",
        hostname: "pub-1ccd4de4be1c4425b05bfbbde47ef4e5.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pub-3ecae00ed691451da4b557c40303c0d5.r2.dev",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;
