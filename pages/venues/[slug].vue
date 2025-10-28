<template>
  <div v-if="venue" class="mx-auto max-w-4xl space-y-10 px-4 py-12">
    <header class="space-y-4">
      <h1 class="text-4xl font-semibold text-gray-900 dark:text-gray-100">{{ venue.name }}</h1>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ venue.address }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ venue.city }}, {{ venue.country }}</p>
    </header>

    <section class="space-y-3">
      <ClientOnly>
        <VenueMap :name="venue.name" :lat="venue.lat" :lon="venue.lon" />
      </ClientOnly>
      <p class="text-xs text-gray-500 dark:text-gray-400">Navegá con el teclado usando tab y enter para abrir el popup.</p>
    </section>

    <section v-if="venue.photos?.length" class="space-y-3">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Galería</h2>
      <Gallery :images="venue.photos" />
    </section>

    <section v-if="events.length" class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Funciones en este espacio</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <CardEvent v-for="event in events" :key="event.slug" :event="event" />
      </div>
    </section>
  </div>
  <div v-else class="px-4 py-12">
    <p class="text-sm text-gray-600 dark:text-gray-300">Espacio no encontrado.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { data: venue } = await useAsyncData(`venue-${slug}`, () =>
  queryCollection('venues').where('slug', '=', slug).first()
);

if (!venue.value) {
  throw createError({ statusCode: 404, statusMessage: 'Espacio no encontrado' });
}

const { data: eventsData } = await useAsyncData(`venue-events-${slug}`, () =>
  queryCollection('events').where('venueSlug', '=', slug).order('date', 'DESC').all()
);

const { data: productionsData } = await useAsyncData('venue-productions', () => queryCollection('productions').all());
const productionsMap = computed(() => {
  return (productionsData.value ?? []).reduce<Record<string, any>>((acc, production) => {
    acc[production.slug] = production;
    return acc;
  }, {});
});

const events = computed(() => {
  return (eventsData.value ?? []).map((event) => ({
    ...event,
    venueName: venue.value?.name,
    productionTitle: productionsMap.value[event.productionSlug]?.title
  }));
});

useSeo({
  title: venue.value.name,
  description: `${venue.value.address} · ${venue.value.city}, ${venue.value.country}`,
  path: `/venues/${slug}`
});
</script>
