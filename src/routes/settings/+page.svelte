<script lang="ts">
  import SelectLanguage from "$src/lib/controls/locale/SelectLanguage.svelte";
  import SelectTheme from "$src/lib/controls/theme/SelectTheme.svelte";
</script>

<template>
  <div id="settings">
    <h1 class="text heading col-span-2">Settings</h1>
    <SelectTheme />
    <SelectLanguage />
  </div>
</template>

<style lang="postcss">
    #settings {
    @apply min-w-0 grid grid-cols-2 gap-4
    items-center;
  }
</style>
