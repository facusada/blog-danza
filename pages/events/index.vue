<template>
  <div class="mx-auto max-w-6xl space-y-10 px-4 py-12">
    <header class="space-y-3 text-center sm:text-left">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">Agenda de funciones</h1>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Gira nacional e internacional con fechas confirmadas y reseñas destacadas.
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

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <CardEvent v-for="event in paginatedItems" :key="event._id" :event="event" />
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
const { data: eventsData } = await useAsyncData('events-list', () =>
  queryContent('events').sort({ date: -1 }).find()
);
const { data: venuesData } = await useAsyncData('events-venues', () => queryContent('venues').find());
const { data: productionsData } = await useAsyncData('events-productions', () => queryContent('productions').find());

const venuesMap = computed(() => {
  return (venuesData.value ?? []).reduce<Record<string, any>>((acc, venue) => {
    acc[venue.slug] = venue;
    return acc;
  }, {});
});

const productionsMap = computed(() => {
  return (productionsData.value ?? []).reduce<Record<string, any>>((acc, production) => {
    acc[production.slug] = production;
    return acc;
  }, {});
});

const enrichedEvents = computed(() => {
  return (eventsData.value ?? []).map((event) => ({
    ...event,
    year: event.date ? new Date(event.date).getFullYear() : undefined,
    venueName: venuesMap.value[event.venueSlug]?.name,
    productionTitle: productionsMap.value[event.productionSlug]?.title
  }));
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
  items: () => enrichedEvents.value,
  getYear: (item) => item.year,
  getCity: (item) => item.city,
  getVenue: (item) => item.venueSlug,
  getVenueLabel: (slug) => venuesMap.value[slug]?.name ?? slug,
  searchIn: (item) => [item.title, item.city, item.venueName, item.productionTitle],
  pageSize: 6
});

useSeo({
  title: 'Funciones',
  description: 'Fechas, teatros y ciudades de las funciones de la compañía.',
  path: '/events'
});
</script>
