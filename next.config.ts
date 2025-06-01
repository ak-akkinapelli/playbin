import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // ✅ Ensure static export for Cloudflare Pages
  trailingSlash: true, // ✅ Fix potential missing trailing slashes
  reactStrictMode: true,
};

export default nextConfig;

