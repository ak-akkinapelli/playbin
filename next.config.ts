const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true, // ✅ Cloudflare handles images properly
  },
  output: "standalone", // ✅ Required for dynamic music streaming platform
};

module.exports = nextConfig;
