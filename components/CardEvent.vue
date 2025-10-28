<template>
  <article class="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
    <NuxtLink :to="`/events/${event.slug}`" class="flex flex-col gap-4">
      <img
        v-if="event.flyer"
        :src="event.flyer"
        :alt="`Flyer de ${event.title}`"
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
}

const props = defineProps<{ event: EventCard }>();

const formattedDate = computed(() => {
  try {
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' }).format(new Date(props.event.date));
  } catch (error) {
    return props.event.date;
  }
});
</script>
