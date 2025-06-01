export default {
  async fetch(request) {
    return new Response("Cloudflare Worker running!", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};
