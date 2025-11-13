<template>
  <div v-if="production" class="mx-auto max-w-5xl space-y-12 px-4 py-12">
    <header class="space-y-6">
      <img
        :src="production.cover"
        :alt="`Imagen promocional de ${production.title}`"
        class="h-72 w-full rounded-2xl object-cover"
      />
      <div class="space-y-3">
        <p class="text-sm uppercase tracking-widest text-brand dark:text-brand/90">{{ production.year }}</p>
        <h1 class="text-4xl font-semibold text-gray-900 dark:text-gray-100">{{ production.title }}</h1>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ production.synopsis }}</p>
        <div class="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span v-if="production.duration" class="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">Duración: {{ production.duration }}</span>
          <span
            v-for="tag in production.tags"
            :key="tag"
            class="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </header>

    <article class="prose prose-neutral max-w-none dark:prose-invert">
      <ContentRenderer :value="production" />
    </article>

    <section v-if="production.youtubeId" class="space-y-3">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Trailer</h2>
      <VideoEmbed :youtube-id="production.youtubeId" :title="`Video de ${production.title}`" />
    </section>

    <section v-if="production.gallery?.length" class="space-y-3">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Galería</h2>
      <Gallery :images="production.gallery" />
    </section>

    <section v-if="production.crew?.length" class="space-y-3">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Equipo creativo</h2>
      <ul class="grid gap-4 sm:grid-cols-2">
        <li v-for="member in production.crew" :key="member.name" class="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ member.name }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ member.role }}</p>
        </li>
      </ul>
    </section>

    <section v-if="relatedEvents.length" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Próximas funciones</h2>
        <NuxtLink to="/events" class="text-sm font-medium text-brand hover:text-brand-dark">Ver agenda</NuxtLink>
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <CardEvent v-for="event in relatedEvents" :key="event.slug" :event="event" />
      </div>
    </section>
  </div>
  <div v-else class="px-4 py-12">
    <p class="text-sm text-gray-600 dark:text-gray-300">Producción no encontrada.</p>
  </div>
</template>

<script setup lang="ts">
const assetUrl = useAssetUrl();
const route = useRoute();
const slug = route.params.slug as string;

const { data: production } = await useAsyncData(`production-${slug}`, () =>
  queryCollection('productions').where('slug', '=', slug).first()
);

if (!production.value) {
  throw createError({ statusCode: 404, statusMessage: 'Producción no encontrada' });
}

production.value.cover = assetUrl(production.value.cover);
if (production.value.gallery?.length) {
  production.value.gallery = production.value.gallery.map((image) => ({
    ...image,
    src: assetUrl(image.src)
  }));
}

const { data: eventsData } = await useAsyncData(`production-events-${slug}`, () =>
  queryCollection('events').where('productionSlug', '=', slug).order('date', 'ASC').all()
);

const { data: venuesData } = await useAsyncData('venues-map-detail', () =>
  queryCollection('venues').select('slug', 'name').all()
);
const venuesMap = computed(() => {
  return (venuesData.value ?? []).reduce<Record<string, any>>((acc, venue) => {
    acc[venue.slug] = venue;
    return acc;
  }, {});
});

const relatedEvents = computed(() => {
  return (eventsData.value ?? []).map((event) => ({
    ...event,
    venueName: venuesMap.value[event.venueSlug]?.name,
    productionTitle: production.value?.title
  }));
});

useSeo({
  title: production.value.title,
  description: production.value.synopsis,
  image: production.value.cover,
  path: `/productions/${slug}`,
  type: 'article'
});
</script>
