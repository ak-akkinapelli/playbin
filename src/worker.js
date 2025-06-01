export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve Next.js static files
    if (url.pathname.startsWith("/_next")) {
      return fetch(`https://your-cloudflare-pages-url${url.pathname}`);
    }

    // API route to get all songs
    if (url.pathname === "/api/getAllSongs") {
      return new Response(JSON.stringify({ message: "Fetched songs from R2!" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Default: Serve homepage
    return fetch("https://your-cloudflare-pages-url/");
  },
};
