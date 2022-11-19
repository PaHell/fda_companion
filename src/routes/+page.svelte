<script lang="ts">
  // IMPORT
  import SelectLanguage from "$src/lib/controls/locale/SelectLanguage.svelte";
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import SelectTheme from "$src/lib/controls/theme/SelectTheme.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import { _ } from "svelte-i18n";
  // PROPS
  let value: string | undefined;
  // EVENTS
  // HOOKS
  // FUNCTIONS
</script>

<template>
  <SelectTheme />
  <h1 class="text heading">{$_("text")}</h1>
  <SelectLanguage />
  <h1 class="text heading">{value}</h1>
  <TextInput bind:value label="Label" placeholder="Placeholder" />
  <TextInput bind:value icon={Icons.Home} placeholder="Placeholder" />
</template>

<style lang="postcss">
  h1 {
    @apply mt-8 pl-4;
  }
</style>
