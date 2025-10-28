<template>
  <div class="mx-auto max-w-5xl space-y-8 px-4 py-12">
    <header class="space-y-3 text-center sm:text-left">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">Prensa</h1>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Selección de artículos, entrevistas y críticas que acompañan las producciones de la compañía.
      </p>
    </header>

    <div class="grid gap-6 md:grid-cols-2">
      <PressItem v-for="item in pressItems" :key="item.slug" :press="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: press } = await useAsyncData('press-list', () =>
  queryCollection('press')
    .select('slug', 'outlet', 'author', 'date', 'url', 'excerpt', 'relatedProductionSlug')
    .order('date', 'DESC')
    .all()
);

const pressItems = computed(() => press.value ?? []);

useSeo({
  title: 'Prensa',
  description: 'Artículos y entrevistas sobre la Compañía de Danza Contemporánea.',
  path: '/press'
});
</script>
