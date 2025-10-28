<template>
  <div>
    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(image, index) in images" :key="image.src">
        <button
          type="button"
          class="group block overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          @click="openLightbox(index)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="h-48 w-full transform object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </button>
      </li>
    </ul>

    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="isOpen"
          ref="overlayRef"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          :aria-label="activeImage?.alt"
          @keydown.esc.prevent="closeLightbox"
        >
          <button
            type="button"
            class="absolute top-4 right-4 rounded-full bg-white/90 p-2 text-gray-900 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            @click="closeLightbox"
            ref="closeButtonRef"
            aria-label="Cerrar galería"
          >
            ✕
          </button>

          <button
            type="button"
            class="absolute left-4 hidden rounded-full bg-white/90 p-3 text-gray-900 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:block"
            @click="previous"
            aria-label="Ver imagen anterior"
          >
            ‹
          </button>

          <figure class="max-h-full w-full max-w-4xl">
            <img
              v-if="activeImage"
              :src="activeImage.src"
              :alt="activeImage.alt"
              class="max-h-[80vh] w-full rounded-lg object-contain"
            />
            <figcaption class="mt-4 text-center text-sm text-white/80">{{ activeImage?.alt }}</figcaption>
          </figure>

          <button
            type="button"
            class="absolute right-4 hidden rounded-full bg-white/90 p-3 text-gray-900 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:block"
            @click="next"
            aria-label="Ver imagen siguiente"
          >
            ›
          </button>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string;
  alt: string;
}

import { nextTick } from 'vue';

const props = defineProps<{ images: GalleryImage[] }>();

const activeIndex = ref<number | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);
const overlayRef = ref<HTMLDivElement | null>(null);

const isOpen = computed(() => activeIndex.value !== null);

const activeImage = computed(() => {
  if (activeIndex.value === null) {
    return null;
  }
  return props.images[activeIndex.value];
});

const openLightbox = (index: number) => {
  activeIndex.value = index;
  nextTick(() => {
    closeButtonRef.value?.focus();
  });
  if (process.client) {
    document.body.style.overflow = 'hidden';
  }
};

const closeLightbox = () => {
  activeIndex.value = null;
  if (process.client) {
    document.body.style.overflow = '';
  }
};

const previous = () => {
  if (activeIndex.value === null) {
    return;
  }
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length;
};

const next = () => {
  if (activeIndex.value === null) {
    return;
  }
  activeIndex.value = (activeIndex.value + 1) % props.images.length;
};

watch(isOpen, (value) => {
  if (!value && process.client) {
    document.body.style.overflow = '';
  }
});

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) {
    return;
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    previous();
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    next();
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    closeLightbox();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
