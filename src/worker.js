export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ✅ Fetch song list from R2 securely
    if (url.pathname === "/api/getAllSongs") {
      const publicUrl = env.R2_PUBLIC_URL; // ✅ Now securely accessed
      const songList = await env.SONG_BUCKET.list();
      
      if (!songList.objects.length) {
        return new Response(JSON.stringify({ error: "No songs found!" }), { status: 404 });
      }

      const songs = songList.objects.map((song) => ({
        id: song.name,
        name: song.name,
        url: `${publicUrl}/${song.name}`, // ✅ Constructs public song URL
        size: song.size,
      }));

      return new Response(JSON.stringify({ songs }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Worker running!", { status: 200 });
  },
};
