// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-10-28',
  experimental: {
    appManifest: false
  },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  css: ['~/styles/tailwind.css', 'maplibre-gl/dist/maplibre-gl.css'],
  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE_URL || '/',
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      titleTemplate: '%s · Compañía de Danza Contemporánea',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Producciones contemporáneas, funciones y prensa de la compañía de danza.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_AR' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Work+Sans:wght@400;500;600&display=swap'
        }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  content: {
    highlight: {
      theme: { default: 'github-light', dark: 'github-dark' }
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com'
    }
  }
});
