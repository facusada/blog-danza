import { queryCollection as serverQueryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const siteUrl = (config.public.siteUrl as string | undefined)?.replace(/\/$/, '') || '';
  const baseRoutes = ['/', '/productions', '/events', '/venues', '/press', '/about', '/hire-us'];

  const [productionSlugs, eventSlugs, venueSlugs] = await Promise.all([
    serverQueryCollection(event, 'productions').select('slug').all(),
    serverQueryCollection(event, 'events').select('slug').all(),
    serverQueryCollection(event, 'venues').select('slug').all()
  ]);

  const dynamicRoutes = [
    ...productionSlugs.map((item: { slug?: string }) => (item.slug ? `/productions/${item.slug}` : null)),
    ...eventSlugs.map((item: { slug?: string }) => (item.slug ? `/events/${item.slug}` : null)),
    ...venueSlugs.map((item: { slug?: string }) => (item.slug ? `/venues/${item.slug}` : null))
  ].filter(Boolean) as string[];

  const routes = Array.from(new Set([...baseRoutes, ...dynamicRoutes]));
  const lastmod = new Date().toISOString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const loc = siteUrl ? `${siteUrl}${route}` : route;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  })
  .join('\n')}
</urlset>`;

  event.node.res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  return body;
});
