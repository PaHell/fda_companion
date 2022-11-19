<script lang="ts">
  import Select from "$lib/controls/Select.svelte";
  import { locale, locales } from "./store";
</script>

<template>
  <p class="text label">Language</p>
  <Select
    value={$locale}
    items={locales}
    valueUndefined="Loading ..."
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
