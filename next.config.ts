const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true, // ✅ Ensures Cloudflare handles images properly
  },
  output: "export", // ✅ Required for static exports
};

module.exports = nextConfig;
