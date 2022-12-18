<script lang="ts">
    import SelectViewSize from "$src/lib/controls/view_size/SelectViewSize.svelte";
  import SelectLanguage from "$src/lib/controls/locale/SelectLanguage.svelte";
  import SelectTheme from "$src/lib/controls/theme/SelectTheme.svelte";
</script>

<template>
  <div id="settings">
    <h1 class="text heading col-span-2">Settings</h1>
    <h2 class="text headline col-span-2">General</h2>
    <SelectLanguage />
    <h2 class="text headline col-span-2">Display & Appearance</h2>
    <SelectTheme />
    <SelectViewSize />
  </div>
</template>

<style lang="postcss">
    #settings {
    @apply min-w-0 grid grid-cols-2 gap-4
    items-center;
  }
</style>
