<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
    <a href="#contenido" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand focus:text-white rounded-md">Saltar al contenido</a>
    <SiteHeader :is-dark="isDark" @toggle-color-mode="toggleColorMode" />
    <main id="contenido" class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
const modeKey = 'blog-danza-color-mode';
const isDark = ref(false);

const setDocumentMode = (value: boolean) => {
  if (process.client) {
    document.documentElement.classList.toggle('dark', value);
  }
};

onMounted(() => {
  const stored = process.client ? window.localStorage.getItem(modeKey) : null;
  if (stored === 'dark') {
    isDark.value = true;
  } else if (stored === 'light') {
    isDark.value = false;
  } else if (process.client && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true;
  }
  setDocumentMode(isDark.value);
});

watch(isDark, (value) => {
  if (process.client) {
    window.localStorage.setItem(modeKey, value ? 'dark' : 'light');
  }
  setDocumentMode(value);
});

const toggleColorMode = () => {
  isDark.value = !isDark.value;
};
</script>
