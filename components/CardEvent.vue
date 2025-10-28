<template>
  <article class="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
    <NuxtLink :to="`/events/${event.slug}`" class="flex flex-col gap-4">
      <img
        v-if="primaryImage"
        :src="primaryImage"
        :alt="primaryAlt"
        class="h-40 w-full rounded-lg object-cover"
        loading="lazy"
      />
      <header>
        <p class="text-sm font-medium uppercase tracking-wide text-brand dark:text-brand/90">{{ formattedDate }}</p>
        <h3 class="mt-1 text-xl font-semibold">{{ event.title }}</h3>
      </header>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        {{ event.venueName || event.venueSlug }} · {{ event.city }}, {{ event.country }}
      </p>
      <p v-if="event.productionTitle" class="text-sm text-gray-500 dark:text-gray-400">
        Basada en <span class="font-medium text-gray-700 dark:text-gray-200">{{ event.productionTitle }}</span>
      </p>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
interface EventCard {
  title: string;
  slug: string;
  date: string;
  venueSlug: string;
  venueName?: string;
  city: string;
  country: string;
  productionSlug?: string;
  productionTitle?: string;
  flyer?: string;
  gallery?: Array<{ src: string; alt?: string }>;
}

const props = defineProps<{ event: EventCard }>();

const formattedDate = computed(() => {
  try {
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' }).format(new Date(props.event.date));
  } catch (error) {
    return props.event.date;
  }
});

const primaryImage = computed(() => {
  if (props.event.flyer) {
    return props.event.flyer;
  }
  return props.event.gallery?.[0]?.src ?? '';
});

const primaryAlt = computed(() => {
  if (props.event.flyer) {
    return `Flyer de ${props.event.title}`;
  }
  return props.event.gallery?.[0]?.alt || `Imagen de ${props.event.title}`;
});
</script>
