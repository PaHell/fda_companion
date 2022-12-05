<script lang="ts" context="module">
  import Logo from "$src/lib/general/Logo.svelte";
</script>

<script lang="ts">
</script>

<template>
  <div class="fullscreen-loading">
    <div class="logo">
      <Logo/>
    </div>
    <h1 class="text heading">{import.meta.env.VITE_APP_NAME.split(" ")[1]}</h1>
  </div>
</template>

<style global lang="postcss">
  .fullscreen-loading {
    @apply fixed inset-0 z-50
    flex flex-col justify-center items-center
    bg-white dark:bg-gray-900
    transition-colors duration-300;
    & > .logo {
      @apply w-32 overflow-hidden;
      & > svg {
        @apply w-full h-auto;

        & > polygon {
          @apply fill-accent-600 dark:fill-accent-500;
        }
        & > path {
          @apply fill-white dark:fill-gray-900;
        }
      }
    }
    & > .text {
      @apply mt-4 text-grayText-tri dark:text-grayTextDark-tri;
    }
  }
</style>
