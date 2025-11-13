<template>
  <div class="mx-auto max-w-5xl space-y-12 px-4 py-12">
    <header class="space-y-4">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">Sobre la compañía</h1>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Somos una plataforma de creación colectiva que investiga nuevas narrativas escénicas, cruces con tecnología y experiencias inmersivas.
      </p>
    </header>

    <section class="grid gap-6 md:grid-cols-2">
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Visión</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Trabajamos en residencias, programas de formación y laboratorios abiertos para integrar a comunidades locales en cada producción. Creemos en la danza como herramienta de transformación social.
        </p>
      </div>
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Programas</h2>
        <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>Residencias site-specific en todo el país.</li>
          <li>Seminarios de improvisación y creación colectiva.</li>
          <li>Laboratorios de experimentación con luz y video mapping.</li>
        </ul>
      </div>
    </section>

    <section v-if="team.length" class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Equipo</h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <article
          v-for="person in team"
          :key="person.name"
          class="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <img
            v-if="person.photo"
            :src="person.photo"
            :alt="`Retrato de ${person.name}`"
            class="h-40 w-full rounded-lg object-cover"
            loading="lazy"
          />
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">{{ person.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ person.role }}</p>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ person.bio }}</p>
          <ul v-if="person.links?.length" class="flex flex-wrap gap-3 text-sm">
            <li v-for="link in person.links" :key="link.url">
              <a :href="link.url" target="_blank" rel="noopener noreferrer" class="text-brand hover:text-brand-dark">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const assetUrl = useAssetUrl();

const { data: people } = await useAsyncData('people-list', () =>
  queryCollection('people').select('name', 'role', 'bio', 'photo', 'links').order('name', 'ASC').all()
);

const team = computed(() => {
  return (people.value ?? []).map((person) => ({
    ...person,
    photo: person.photo ? assetUrl(person.photo) : undefined
  }));
});

useSeo({
  title: 'Sobre la compañía',
  description: 'Historia, visión y equipo de la Compañía de Danza Contemporánea.',
  path: '/about'
});
</script>
