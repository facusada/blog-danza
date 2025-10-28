<template>
  <div class="relative w-full overflow-hidden rounded-xl bg-black" :style="`padding-top: ${aspectRatio}%`">
    <iframe
      class="absolute inset-0 h-full w-full"
      :src="embedUrl"
      :title="iframeTitle"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    youtubeId: string;
    title?: string;
    ratio?: number;
  }>(),
  {
    ratio: 56.25
  }
);

const iframeTitle = computed(() => props.title ?? 'Video de YouTube de la compañía');
const embedUrl = computed(() => `https://www.youtube.com/embed/${props.youtubeId}?rel=0&modestbranding=1`);
const aspectRatio = computed(() => props.ratio);
</script>
