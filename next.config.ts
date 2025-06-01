/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true, // ✅ Ensures Cloudflare handles images properly
  },
  output: "standalone", // ✅ Required for running Next.js in Workers
};

module.exports = nextConfig;
