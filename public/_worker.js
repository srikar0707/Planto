export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Proxy Supabase storage requests seamlessly through custom domain
    if (url.pathname.startsWith('/storage/')) {
      const subpath = url.pathname.replace(/^\/storage\//, '');
      const supabaseUrl =
        env?.VITE_SUPABASE_URL || 'https://netaqfodhssuzssqdqhu.supabase.co';
      const targetUrl = `${supabaseUrl}/storage/v1/object/public/${subpath}`;

      try {
        const response = await fetch(targetUrl, {
          method: request.method,
          headers: {
            accept: request.headers.get('accept') || '*/*',
          },
        });

        const newHeaders = new Headers(response.headers);
        newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
        newHeaders.set('Access-Control-Allow-Origin', '*');

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      } catch {
        return new Response('Image not found', { status: 404 });
      }
    }

    // Default static assets handler for single-page React app
    return env.ASSETS.fetch(request);
  },
};
