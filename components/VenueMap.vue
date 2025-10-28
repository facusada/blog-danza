<template>
  <div>
    <div
      v-if="hasCoordinates"
      ref="mapContainer"
      class="h-72 w-full rounded-xl border border-gray-200 dark:border-gray-800"
      role="img"
      :aria-label="`Mapa del venue ${name}`"
    ></div>
    <p v-else class="text-sm text-gray-500 dark:text-gray-400">
      Mapa no disponible para este espacio.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Map } from 'maplibre-gl';

const props = defineProps<{
  name: string;
  lat?: number | null;
  lon?: number | null;
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
const mapInstance = ref<Map | null>(null);

const hasCoordinates = computed(() => typeof props.lat === 'number' && typeof props.lon === 'number');

onMounted(async () => {
  if (!hasCoordinates.value || !mapContainer.value) {
    return;
  }

  const maplibregl = await import('maplibre-gl');

  mapInstance.value = new maplibregl.Map({
    container: mapContainer.value,
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    center: [props.lon as number, props.lat as number],
    zoom: 13
  });

  new maplibregl.Marker({ color: '#d97706' })
    .setLngLat([props.lon as number, props.lat as number])
    .setPopup(new maplibregl.Popup().setText(props.name))
    .addTo(mapInstance.value);
});

onBeforeUnmount(() => {
  if (mapInstance.value) {
    mapInstance.value.remove();
  }
});
</script>
