import { serverQueryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const siteUrl = (config.public.siteUrl as string | undefined)?.replace(/\/$/, '') || '';
  const baseRoutes = ['/', '/productions', '/events', '/venues', '/press', '/about', '/hire-us'];

  const getCollectionPaths = async (collection: 'productions' | 'events' | 'venues' | 'press') => {
    const rows = await serverQueryCollection(event, collection).select('path').all();
    return rows.map((row: { path?: string }) => row.path).filter(Boolean) as string[];
  };

  const [productions, eventsItems, venues, pressItems] = await Promise.all([
    getCollectionPaths('productions'),
    getCollectionPaths('events'),
    getCollectionPaths('venues'),
    getCollectionPaths('press')
  ]);

  const dynamicRoutes = [...productions, ...eventsItems, ...venues, ...pressItems].filter(Boolean);

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
