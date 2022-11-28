<script lang="ts">
  import Select from "$lib/controls/Select.svelte";
  import { locale, locales } from "./store";
</script>

<template>
  <Select
    name="language"
    value={$locale}
    items={locales}
    on:change={(e) => locale.set(e.detail.item)}
  >
    <p slot="selected" let:item class="text">
      {item.name}
      <span class="secondary">({item.iso2})</span>
    </p>
    <p slot="item" let:item class="text">
      {item.name}
      <span class="secondary">({item.iso2})</span>
    </p>
  </Select>
</template>

<style lang="postcss">
</style>
