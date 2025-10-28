<template>
  <footer class="border-t border-gray-200 bg-white py-10 dark:border-gray-800 dark:bg-gray-950">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="max-w-md space-y-3">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Compañía de Danza Contemporánea</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Obras originales, residencias y programas educativos que conectan a la danza con nuevas audiencias.
        </p>
        <a href="mailto:hola@companiadanza.com" class="text-sm font-medium text-brand hover:text-brand-dark">hola@companiadanza.com</a>
      </div>
      <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <p class="font-semibold text-gray-900 dark:text-gray-100">Seguinos</p>
        <ul class="space-y-1">
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="hover:text-brand">Instagram</a></li>
          <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="hover:text-brand">YouTube</a></li>
          <li><a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" class="hover:text-brand">Vimeo</a></li>
        </ul>
      </div>
      <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <p class="font-semibold text-gray-900 dark:text-gray-100">Explorá</p>
        <ul class="space-y-1">
          <li><NuxtLink to="/productions" class="hover:text-brand">Producciones</NuxtLink></li>
          <li><NuxtLink to="/events" class="hover:text-brand">Funciones</NuxtLink></li>
          <li><NuxtLink to="/hire-us" class="hover:text-brand">Contrataciones</NuxtLink></li>
        </ul>
      </div>
    </div>
    <div class="mt-8 px-4 text-center text-xs text-gray-500 dark:text-gray-500">
      © {{ new Date().getFullYear() }} Compañía de Danza Contemporánea. Todos los derechos reservados.
    </div>
  </footer>
</template>
