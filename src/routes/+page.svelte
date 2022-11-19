<script lang="ts">
  // IMPORT
  import SelectLanguage from "$src/lib/controls/locale/SelectLanguage.svelte";
  import SelectTheme from "$src/lib/controls/theme/SelectTheme.svelte";
  import { _ } from "svelte-i18n";
  // PROPS
  // EVENTS
  // HOOKS
  // FUNCTIONS
</script>

<template>
  <SelectTheme />
  <h1 class="text heading">{$_("text")}</h1>
  <SelectLanguage />
</template>

<style lang="postcss">
  h1 {
    @apply mt-8 pl-4;
  }
</style>
