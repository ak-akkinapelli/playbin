/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeServerRendering: true, // ✅ Helps reduce large build files
  },
  output: "standalone", // ✅ Allows API routes to work correctly on Cloudflare Pages
};

module.exports = nextConfig;
