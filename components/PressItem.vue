<template>
  <article class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
    <header class="flex flex-col gap-1">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ press.outlet }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ press.author }} · {{ formattedDate }}
      </p>
    </header>
    <p class="mt-3 text-sm text-gray-600 dark:text-gray-300">{{ press.excerpt }}</p>
    <footer class="mt-4">
      <a
        :href="press.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-medium text-brand hover:text-brand-dark"
      >
        Leer artículo
      </a>
    </footer>
  </article>
</template>

<script setup lang="ts">
interface PressItemProps {
  outlet: string;
  author: string;
  date: string;
  url: string;
  excerpt: string;
}

const props = defineProps<{ press: PressItemProps }>();

const formattedDate = computed(() => {
  try {
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' }).format(new Date(props.press.date));
  } catch (error) {
    return props.press.date;
  }
});
</script>
