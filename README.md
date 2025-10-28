# Compañía de Danza Contemporánea

Sitio JAMstack construido con Nuxt 3, @nuxt/content y Tailwind CSS para presentar producciones, agenda de funciones, prensa y contrataciones de la compañía.

## Características principales
- Contenido plano en Markdown gestionado por @nuxt/content con colecciones para producciones, funciones, teatros, prensa y equipo.
- UI responsive mobile-first con Tailwind CSS, modo claro/oscuro persistido en `localStorage` y componentes reutilizables.
- Listados con filtros por año, ciudad y teatro más paginación simple.
- Componentes multimedia: galería con lightbox accesible, videos de YouTube y mapa de venues con MapLibre.
- SEO listo para producción: metadatos dinámicos, sitemap, robots.txt y soporte para OpenGraph/Twitter Cards.
- Integración con Decap CMS (`/admin`) para editar contenido con autenticación GitHub.
- Workflow de despliegue para GitHub Pages usando `npm run generate`.

## Estructura del proyecto
```
content/            Colecciones en Markdown (productions, events, venues, press, people)
components/         UI (cards, filtros, galería, mapa, header/footer, etc.)
composables/        Hooks personalizados (`useFilters`, `useSeo`)
layouts/            Layout principal con header/footer y modo oscuro
pages/              Rutas públicas (home, listado/detalle, about, hire-us)
public/             Assets estáticos (imágenes, dossier, hero, favicon)
styles/             Tailwind base (`tailwind.css`)
admin/              Configuración Decap CMS (`index.html`, `config.yml`)
.github/workflows/  Pipeline GitHub Pages (`deploy.yml`)
server/routes/      `sitemap.xml` y `robots.txt` generados dinámicamente
```

## Requisitos
- Node.js 20+
- npm 9+

## Desarrollo local
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Levantar el entorno de desarrollo:
   ```bash
   npm run dev
   ```
3. Abrí `http://localhost:3000` para navegar el sitio.

### Edición de contenido con Decap CMS
1. Con el server de desarrollo activo, ingresá a `http://localhost:3000/admin`.
2. Autenticá con GitHub (repositorio configurado en `admin/config.yml`).
3. Creá y editá entradas en las colecciones disponibles.
4. Guardá cambios para que se generen PRs/commits según la configuración de Decap.

## Scripts disponibles
- `npm run dev`: servidor de desarrollo con hot module replacement.
- `npm run build`: build tradicional de Nuxt (render server-side).
- `npm run generate`: genera la versión estática en `.output/public` (usado para producción/GitHub Pages).
- `npm run preview`: sirve la app generada para verificación previa al despliegue.

## Despliegue en GitHub Pages
1. Ajustá `runtimeConfig.public.siteUrl` en `nuxt.config.ts` con tu dominio real.
2. Habilitá GitHub Pages desde *Settings > Pages* seleccionando **GitHub Actions**.
3. Hacé push a la rama `main`. El workflow `.github/workflows/deploy.yml` ejecutará `npm run generate` y publicará el contenido.

## Notas y próximos pasos sugeridos
- Actualizá imágenes y videos en `public/` con material de producción real manteniendo textos alternativos.
- Revisá el estilo de MapLibre (`VenueMap.vue`) si necesitás un tema custom o tiles self-hosted.
- Configurá los permisos OAuth de Decap CMS con tu propio repositorio y dominio de administración.
- Ajustá `public/dossier.pdf` con la versión final del dossier de la compañía.
