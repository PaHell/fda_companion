<script lang="ts" context="module">
  import type { App } from "$src/app";
  import Text from "$lib/general/Text.svelte";
</script>

<script lang="ts">
</script>

<template>
  <div id="auth-layout">
    <header>
      <Text/>
      <p class="text headline secondary">{import.meta.env.VITE_APP_NAME}</p>
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
      & > svg {
        @apply h-12;
        & > path {
          @apply fill-accent-500;
        }
      }
    }
    & > main {
      @apply flex flex-col
      w-full max-w-md py-8 px-4 my-6
      rounded-lg shadow-lg
      border border-gray-300 dark:border-gray-700
      bg-gray-100 dark:bg-gray-800;
    }
    & > footer {
      @apply text-center;
    }
  }
</style>
