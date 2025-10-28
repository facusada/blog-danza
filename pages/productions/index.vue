<template>
  <div class="mx-auto max-w-6xl space-y-10 px-4 py-12">
    <header class="space-y-3 text-center sm:text-left">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">Producciones</h1>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Obras originales que combinan investigación corporal, música en vivo y dispositivos escénicos inmersivos.
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
      <CardProduction v-for="production in paginatedItems" :key="production._id" :production="production" />
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
const { data: productionsData } = await useAsyncData('productions-list', () =>
  queryContent('productions').sort({ year: -1 }).find()
);
const { data: eventsData } = await useAsyncData('production-events', () => queryContent('events').find());
const { data: venuesData } = await useAsyncData('production-venues', () => queryContent('venues').find());

const venuesMap = computed(() => {
  return (venuesData.value ?? []).reduce<Record<string, any>>((acc, venue) => {
    acc[venue.slug] = venue;
    return acc;
  }, {});
});

const eventsByProduction = computed(() => {
  const map = new Map<string, { cities: Set<string>; venues: Set<string> }>();
  (eventsData.value ?? []).forEach((event) => {
    if (!map.has(event.productionSlug)) {
      map.set(event.productionSlug, { cities: new Set(), venues: new Set() });
    }
    const entry = map.get(event.productionSlug);
    if (entry) {
      if (event.city) {
        entry.cities.add(event.city);
      }
      if (event.venueSlug) {
        entry.venues.add(event.venueSlug);
      }
    }
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
  items: () => productionsData.value ?? [],
  getYear: (item) => item.year,
  getCity: (item) => Array.from(eventsByProduction.value.get(item.slug)?.cities ?? []),
  getVenue: (item) => Array.from(eventsByProduction.value.get(item.slug)?.venues ?? []),
  getVenueLabel: (slug) => venuesMap.value[slug]?.name ?? slug,
  searchIn: (item) => [item.title, item.synopsis, ...(item.tags ?? [])],
  pageSize: 4
});

useSeo({
  title: 'Producciones',
  description: 'Catálogo de producciones contemporáneas con giras nacionales e internacionales.',
  path: '/productions'
});
</script>
