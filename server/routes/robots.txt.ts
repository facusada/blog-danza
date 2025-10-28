export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  const siteUrl = (config.public.siteUrl as string | undefined)?.replace(/\/$/, '') || '';
  const sitemapUrl = siteUrl ? `${siteUrl}/sitemap.xml` : '/sitemap.xml';

  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}`;
});
