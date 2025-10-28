import { useHead, useRuntimeConfig } from '#imports';

interface SeoPayload {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  type?: string;
}

export const useSeo = ({ title, description, image, path, type = 'website' }: SeoPayload) => {
  const runtimeConfig = useRuntimeConfig();
  const siteUrl: string = runtimeConfig.public.siteUrl?.replace(/\/$/, '') || '';
  const canonical = path ? `${siteUrl}${path}` : siteUrl;

  const meta = [
    description ? { name: 'description', content: description } : null,
    { property: 'og:title', content: title },
    description ? { property: 'og:description', content: description } : null,
    { property: 'og:type', content: type },
    canonical ? { property: 'og:url', content: canonical } : null,
    image ? { property: 'og:image', content: image } : null,
    { name: 'twitter:title', content: title },
    description ? { name: 'twitter:description', content: description } : null,
    image ? { name: 'twitter:image', content: image } : null
  ].filter(Boolean) as Array<Record<string, string>>;

  useHead({
    title,
    link: canonical
      ? [
          {
            rel: 'canonical',
            href: canonical
          }
        ]
      : [],
    meta
  });
};
