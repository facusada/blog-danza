<template>
  <section class="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:flex-row md:items-end">
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200" for="search">
        Búsqueda
      </label>
      <input
        id="search"
        type="search"
        :value="modelValue.search"
        @input="updateField('search', ($event.target as HTMLInputElement).value)"
        placeholder="Buscar por título, ciudad o teatro"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand dark:border-gray-700 dark:bg-gray-950"
      />
    </div>

    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200" for="filter-year">
        Año
      </label>
      <select
        id="filter-year"
        :value="modelValue.year"
        @change="updateField('year', ($event.target as HTMLSelectElement).value)"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950"
        :disabled="!years.length"
      >
        <option value="">Todos</option>
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200" for="filter-city">
        Ciudad
      </label>
      <select
        id="filter-city"
        :value="modelValue.city"
        @change="updateField('city', ($event.target as HTMLSelectElement).value)"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950"
        :disabled="!cities.length"
      >
        <option value="">Todas</option>
        <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
      </select>
    </div>

    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-200" for="filter-venue">
        Teatro
      </label>
      <select
        id="filter-venue"
        :value="modelValue.venue"
        @change="updateField('venue', ($event.target as HTMLSelectElement).value)"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950"
        :disabled="!venues.length"
      >
        <option value="">Todos</option>
        <option v-for="venue in venues" :key="venue.value" :value="venue.value">{{ venue.label }}</option>
      </select>
    </div>

    <div class="flex items-center gap-2">
      <button type="button" class="btn-primary" @click="emit('reset')">
        Limpiar
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { FilterState, VenueOption } from '~/composables/useFilters';

const props = defineProps<{
  modelValue: FilterState;
  years: string[];
  cities: string[];
  venues: VenueOption[];
}>();

const emit = defineEmits<{
  'update:modelValue': [FilterState];
  reset: [];
}>();

const modelValue = computed(() => props.modelValue);

const updateField = (key: keyof FilterState, value: string) => {
  emit('update:modelValue', { ...modelValue.value, [key]: value });
};
</script>
