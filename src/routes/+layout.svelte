<script lang="ts" context="module">
  // import css bootstrap
  import "../app.postcss";
  // other imports
  import {
    initLocale,
    localeInitialized,
  } from "$src/lib/controls/locale/store";
  import FullscreenLoading from "$src/lib/general/FullscreenLoading.svelte";
</script>

<script lang="ts">

  initLocale();

</script>

<template>
  {#if $localeInitialized}
    <slot />
  {:else}
    <FullscreenLoading />
  {/if}
</template>

<style global lang="postcss">
</style>
