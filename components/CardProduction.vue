<template>
  <article class="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
    <NuxtLink :to="`/productions/${production.slug}`" class="flex flex-col h-full">
      <img
        :src="production.cover"
        :alt="`Portada de ${production.title}`"
        class="h-48 w-full rounded-t-xl object-cover"
        loading="lazy"
      />
      <div class="flex flex-1 flex-col gap-3 p-5">
        <header>
          <p class="text-sm uppercase tracking-wide text-brand dark:text-brand/90">{{ production.year }}</p>
          <h3 class="mt-1 text-xl font-semibold">{{ production.title }}</h3>
        </header>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ production.synopsis }}</p>
        <div class="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span v-if="production.duration">{{ production.duration }}</span>
          <ul class="flex flex-wrap gap-2">
            <li v-for="tag in production.tags" :key="tag" class="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
interface Production {
  title: string;
  slug: string;
  year?: number | string;
  duration?: string;
  synopsis?: string;
  cover: string;
  tags?: string[];
}

const props = defineProps<{ production: Production }>();
</script>
