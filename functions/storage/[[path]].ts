interface Env {
  VITE_SUPABASE_URL?: string;
}

export const onRequest = async (context: {
  request: Request;
  params: { path?: string | string[] };
  env: Env;
}) => {
  const params = context.params.path;
  const subpath = Array.isArray(params) ? params.join('/') : params || '';
  const supabaseUrl = context.env?.VITE_SUPABASE_URL || 'https://netaqfodhssuzssqdqhu.supabase.co';
  const targetUrl = `${supabaseUrl}/storage/v1/object/public/${subpath}`;

  try {
    const response = await fetch(targetUrl, {
      method: context.request.method,
      headers: {
        accept: context.request.headers.get('accept') || '*/*',
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
};
