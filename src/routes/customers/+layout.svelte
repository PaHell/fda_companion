<script lang="ts">
  // IMPORT
  import Select from "$lib/controls/Select.svelte";
  import SelectTheme from "$src/lib/controls/theme/SelectTheme.svelte";
  // EVENTS
  // HOOKS
  // FUNCTIONS
</script>

<template>
  <main>
    <slot />
  </main>
</template>

<style lang="postcss">
  main {
    @apply flex justify-center items-center;
  }
</style>
