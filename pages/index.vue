<template>
  <div class="space-y-16 pb-16">
    <section class="relative overflow-hidden">
      <img src="/charanda_2.jpg" alt="Intérpretes de la compañía en escena" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-gray-900/60"></div>
      <div class="relative mx-auto flex max-w-5xl flex-col gap-6 px-4 py-24 text-white sm:py-32">
        <span class="text-sm uppercase tracking-widest text-brand">Danza contemporánea</span>
        <h1 class="text-4xl font-bold text-white drop-shadow-md sm:text-5xl lg:text-6xl">Historias que se mueven y transforman</h1>
        <p class="max-w-2xl text-lg text-white/90">
          Producciones originales, giras nacionales e internacionales y programas educativos para acercar la danza a nuevas audiencias.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink to="/hire-us" class="btn-primary">Contrataciones</NuxtLink>
          <NuxtLink to="/productions" class="inline-flex items-center justify-center rounded-md border border-white/70 px-4 py-2 text-sm font-medium text-white transition hover:border-white">
            Ver producciones
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="mx-auto flex max-w-6xl flex-col gap-8 px-4">
      <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Últimas funciones</h2>
        <NuxtLink to="/events" class="text-sm font-medium text-brand hover:text-brand-dark">Ver agenda completa</NuxtLink>
      </header>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CardEvent v-for="event in eventsWithRelations" :key="event.slug" :event="event" />
      </div>
    </section>

    <section class="bg-gray-50 py-12 dark:bg-gray-900">
      <div class="mx-auto flex max-w-6xl flex-col gap-8 px-4">
        <header>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Producciones destacadas</h2>
          <p class="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            Obras premiadas que combinan investigación corporal, dramaturgia contemporánea y dispositivos multimedia.
          </p>
        </header>
        <div class="grid gap-6 md:grid-cols-2">
          <CardProduction v-for="production in productionsList" :key="production.slug" :production="production" />
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl space-y-6 px-4">
      <header class="flex flex-col gap-2">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Recorridos en imágenes</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300">Momentos capturados durante residencias, ensayos y funciones.</p>
      </header>
      <div class="flex gap-4 overflow-x-auto pb-4">
        <img
          v-for="image in gallery"
          :key="image.src"
          :src="image.src"
          :alt="image.alt"
          class="h-48 w-72 flex-shrink-0 rounded-xl object-cover"
          loading="lazy"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { data: eventsData } = await useAsyncData('home-events', () =>
  queryCollection('events')
    .select('title', 'slug', 'date', 'venueSlug', 'city', 'country', 'productionSlug', 'flyer', 'gallery')
    .order('date', 'DESC')
    .limit(3)
    .all()
);

const { data: productionsData } = await useAsyncData('home-productions', () =>
  queryCollection('productions')
    .select('title', 'slug', 'year', 'duration', 'synopsis', 'cover', 'tags')
    .order('year', 'DESC')
    .limit(2)
    .all()
);

const { data: venuesData } = await useAsyncData('home-venues', () =>
  queryCollection('venues').select('slug', 'name').all()
);

const productionsList = computed(() => productionsData.value ?? []);

const productionsMap = computed(() => {
  return (productionsData.value ?? []).reduce<Record<string, any>>((acc, item) => {
    acc[item.slug] = item;
    return acc;
  }, {});
});

const venuesMap = computed(() => {
  return (venuesData.value ?? []).reduce<Record<string, any>>((acc, item) => {
    acc[item.slug] = item;
    return acc;
  }, {});
});

const eventsWithRelations = computed(() => {
  return (eventsData.value ?? []).map((event) => ({
    ...event,
    venueName: venuesMap.value[event.venueSlug]?.name,
    productionTitle: productionsMap.value[event.productionSlug]?.title
  }));
});

const gallery = [
  { src: '/gallery/danzacontempo.jpg', alt: 'Interpretes de la compañía saltando en sala histórica' },
  { src: '/gallery/danzacontempo2.jpg', alt: 'Danza contemporánea con luces cálidas' },
  { src: '/gallery/danzacontempo3.jpg', alt: 'Ensayo grupal con vestuario colorido' }
];

useSeo({
  title: 'Inicio',
  description: 'Portfolio y agenda de la Compañía de Danza Contemporánea: producciones, funciones y residencias.',
  path: '/'
});
</script>
