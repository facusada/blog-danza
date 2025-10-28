<template>
  <header class="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
      <NuxtLink to="/" class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">CD</span>
        <span>Compañía de Danza - Calle 46</span>
      </NuxtLink>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden dark:border-gray-700 dark:text-gray-200"
        @click="isMenuOpen = !isMenuOpen"
        :aria-expanded="isMenuOpen"
        aria-controls="main-navigation"
      >
        <span class="sr-only">Abrir menú</span>
        ☰
      </button>

      <nav id="main-navigation" class="hidden items-center gap-6 md:flex">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-sm font-medium text-gray-700 hover:text-brand dark:text-gray-200 dark:hover:text-brand">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <button
        type="button"
        class="hidden items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:inline-flex dark:border-gray-700 dark:text-gray-200"
        @click="emit('toggle-color-mode')"
        :aria-pressed="isDark"
      >
        <span class="sr-only">Alternar modo oscuro</span>
        <span aria-hidden="true">{{ isDark ? '🌙' : '☀️' }}</span>
        <span class="hidden lg:inline">Modo {{ isDark ? 'oscuro' : 'claro' }}</span>
      </button>
    </div>

    <transition name="slide-fade">
      <div v-if="isMenuOpen" class="border-t border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-950 md:hidden">
        <nav class="flex flex-col gap-4">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium text-gray-700 hover:text-brand dark:text-gray-200 dark:hover:text-brand"
            @click="isMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <button
          type="button"
          class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-gray-700 dark:text-gray-200"
          @click="toggleModeAndClose"
          :aria-pressed="isDark"
        >
          <span aria-hidden="true">{{ isDark ? '🌙' : '☀️' }}</span>
          Modo {{ isDark ? 'oscuro' : 'claro' }}
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{ isDark: boolean }>();
const emit = defineEmits<{ 'toggle-color-mode': [] }>();

const isDark = computed(() => props.isDark);

const links = [
  { to: '/productions', label: 'Producciones' },
  { to: '/events', label: 'Funciones' },
  { to: '/venues', label: 'Teatros' },
  { to: '/press', label: 'Prensa' },
  { to: '/about', label: 'Nosotros' },
  { to: '/hire-us', label: 'Contrataciones' }
];

const isMenuOpen = ref(false);
const route = useRoute();

const toggleModeAndClose = () => {
  emit('toggle-color-mode');
  isMenuOpen.value = false;
};

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  }
);
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
