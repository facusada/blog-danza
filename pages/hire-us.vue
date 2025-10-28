<template>
  <div class="mx-auto max-w-4xl space-y-10 px-4 py-12">
    <header class="space-y-4">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">Contrataciones</h1>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Programá funciones, talleres o residencias con la Compañía de Danza Contemporánea. Diseñamos propuestas a medida para teatros, festivales y espacios culturales.
      </p>
    </header>

    <section class="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Solicitá una propuesta</h2>
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Completá el formulario con la información de tu espacio y nos pondremos en contacto en un plazo de 48 horas.
      </p>
      <div class="flex flex-wrap gap-4">
        <a
          href="https://forms.gle/ejemplo-formulario"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary"
        >
          Abrir formulario
        </a>
        <a href="/dossier.pdf" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center rounded-md border border-brand px-4 py-2 text-sm font-medium text-brand hover:bg-brand hover:text-white">
          Descargar dossier PDF
        </a>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Qué ofrecemos</h2>
      <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <li>Producciones completas con equipo técnico y plan de prensa.</li>
        <li>Laboratorios de creación y talleres formativos.</li>
        <li>Programas educativos para escuelas y universidades.</li>
      </ul>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Contacto directo</h2>
      <p class="text-sm text-gray-600 dark:text-gray-300">Escribinos a <a href="mailto:produccion@companiadanza.com" class="text-brand hover:text-brand-dark">produccion@companiadanza.com</a> o llamanos al <a href="tel:+5491122334455" class="text-brand hover:text-brand-dark">+54 9 11 2233 4455</a>.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeo({
  title: 'Contrataciones',
  description: 'Solicitá funciones, talleres o residencias de la Compañía de Danza Contemporánea.',
  path: '/hire-us'
});
</script>
