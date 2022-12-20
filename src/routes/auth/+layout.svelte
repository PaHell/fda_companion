<script lang="ts" context="module">
  import type { App } from "$src/app";
</script>

<script lang="ts">
</script>

<template>
  <div id="auth-layout">
    <header>
      <img src="/logo.svg" alt="Logo"/>
      <p class="text headline">{import.meta.env.VITE_APP_NAME}</p>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <p class="text caption secondary">{@html import.meta.env.VITE_COPYRIGHT}</p>
    </footer>
  </div>
</template>

<style global lang="postcss">
  #auth-layout {
    @apply flex flex-col justify-center items-center
    min-h-screen;
    & > header {
      @apply flex flex-col items-center space-y-2;
      & > img {
        @apply w-24 h-24;
      }
    }
    & > main {
      @apply flex flex-col
      w-full max-w-xl p-4 my-6
      rounded-lg shadow-lg
      border border-gray-300 dark:border-gray-700
      bg-gray-100 dark:bg-gray-800;
    }
    & > footer {
      @apply text-center;
    }
  }
</style>
