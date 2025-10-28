<template>
  <div v-if="event" class="mx-auto max-w-4xl space-y-10 px-4 py-12">
    <header class="space-y-4">
      <p class="text-sm uppercase tracking-widest text-brand dark:text-brand/90">{{ formattedDate }}</p>
      <h1 class="text-4xl font-semibold text-gray-900 dark:text-gray-100">{{ event.title }}</h1>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        {{ venue?.name || event.venueSlug }} · {{ event.city }}, {{ event.country }}
      </p>
      <p v-if="production" class="text-sm text-gray-500 dark:text-gray-400">
        Parte de la producción <NuxtLink :to="`/productions/${production.slug}`" class="font-medium text-brand hover:text-brand-dark">{{ production.title }}</NuxtLink>
      </p>
      <img
        v-if="event.flyer"
        :src="event.flyer"
        :alt="`Flyer de la función ${event.title}`"
        class="h-80 w-full rounded-2xl object-cover"
      />
    </header>

    <section v-if="event.gallery?.length" class="space-y-3">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Galería</h2>
      <Gallery :images="event.gallery" />
    </section>

    <section v-if="venue" class="space-y-3">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Venue</h2>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ venue.address }}</p>
      <ClientOnly>
        <VenueMap :name="venue.name" :lat="venue.lat" :lon="venue.lon" />
      </ClientOnly>
    </section>

    <section v-if="event.pressLinks?.length" class="space-y-3">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Cobertura de prensa</h2>
      <ul class="space-y-2">
        <li v-for="link in event.pressLinks" :key="link.url">
          <a :href="link.url" target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-brand hover:text-brand-dark">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </section>
  </div>
  <div v-else class="px-4 py-12">
    <p class="text-sm text-gray-600 dark:text-gray-300">Función no encontrada.</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { data: event } = await useAsyncData(`event-${slug}`, () =>
  queryCollection('events').where('slug', '=', slug).first()
);

if (!event.value) {
  throw createError({ statusCode: 404, statusMessage: 'Función no encontrada' });
}

const { data: venue } = await useAsyncData(`event-venue-${event.value.venueSlug}`, () =>
  queryCollection('venues').where('slug', '=', event.value?.venueSlug || '').first()
);

const { data: production } = await useAsyncData(`event-production-${event.value.productionSlug}`, () =>
  queryCollection('productions').where('slug', '=', event.value?.productionSlug || '').first()
);

const formattedDate = computed(() => {
  try {
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'full' }).format(new Date(event.value!.date));
  } catch (error) {
    return event.value!.date;
  }
});

useSeo({
  title: event.value.title,
  description: `${event.value.city}, ${event.value.country} · ${formattedDate.value}`,
  image: event.value.flyer,
  path: `/events/${slug}`,
  type: 'event'
});
</script>
