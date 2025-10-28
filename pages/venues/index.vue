<template>
  <div class="mx-auto max-w-6xl space-y-10 px-4 py-12">
    <header class="space-y-3 text-center sm:text-left">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">Teatros y espacios aliados</h1>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Una red de salas y centros culturales que acompañan cada producción en gira.
      </p>
    </header>

    <FiltersBar
      :model-value="filters"
      :years="years"
      :cities="cities"
      :venues="venues"
      @update:modelValue="(value) => Object.assign(filters, value)"
      @reset="resetFilters"
    />

    <div class="grid gap-6 md:grid-cols-2">
      <article
        v-for="venue in paginatedItems"
        :key="venue._id"
        class="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
      >
        <img
          v-if="venue.photos?.length"
          :src="venue.photos[0].src"
          :alt="venue.photos[0].alt"
          class="h-48 w-full rounded-lg object-cover"
          loading="lazy"
        />
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            <NuxtLink :to="`/venues/${venue.slug}`" class="hover:text-brand">{{ venue.name }}</NuxtLink>
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ venue.address }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ venue.city }}, {{ venue.country }}</p>
        </div>
        <NuxtLink :to="`/venues/${venue.slug}`" class="text-sm font-medium text-brand hover:text-brand-dark">
          Ver detalles
        </NuxtLink>
      </article>
    </div>

    <nav class="flex items-center justify-between gap-4">
      <button
        type="button"
        class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:border-brand hover:text-brand disabled:opacity-40 dark:border-gray-700 dark:text-gray-200"
        :disabled="page === 1"
        @click="setPage(page - 1)"
      >
        Anterior
      </button>
      <span class="text-sm text-gray-600 dark:text-gray-300">Página {{ page }} de {{ totalPages }}</span>
      <button
        type="button"
        class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:border-brand hover:text-brand disabled:opacity-40 dark:border-gray-700 dark:text-gray-200"
        :disabled="page === totalPages"
        @click="setPage(page + 1)"
      >
        Siguiente
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { data: venuesData } = await useAsyncData('venues-list', () => queryContent('venues').find());
const { data: eventsData } = await useAsyncData('venues-events', () => queryContent('events').find());

const yearsByVenue = computed(() => {
  const map = new Map<string, Set<string>>();
  (eventsData.value ?? []).forEach((event) => {
    if (!event.venueSlug || !event.date) {
      return;
    }
    if (!map.has(event.venueSlug)) {
      map.set(event.venueSlug, new Set());
    }
    const year = String(new Date(event.date).getFullYear());
    map.get(event.venueSlug)?.add(year);
  });
  return map;
});

const {
  filters,
  years,
  cities,
  venues,
  page,
  totalPages,
  paginatedItems,
  setPage,
  resetFilters
} = useFilters({
  items: () => venuesData.value ?? [],
  getYear: (item) => Array.from(yearsByVenue.value.get(item.slug) ?? []),
  getCity: (item) => item.city,
  getVenue: (item) => item.slug,
  getVenueLabel: (slug) => venuesData.value?.find((venue) => venue.slug === slug)?.name ?? slug,
  searchIn: (item) => [item.name, item.address, item.city],
  pageSize: 4
});

useSeo({
  title: 'Teatros',
  description: 'Directorio de teatros y espacios culturales donde se presenta la compañía.',
  path: '/venues'
});
</script>
