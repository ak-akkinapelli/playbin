const worker = {
  async fetch(request) {
    console.log(`Received request for: ${request.url}`);
    return new Response("Cloudflare Worker running!", {
      headers: { "Content-Type": "text/plain" },
    });
  },
};

export default worker;
