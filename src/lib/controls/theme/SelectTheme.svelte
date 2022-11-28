<script lang="ts">
  import Select from "$lib/controls/Select.svelte";
  import { theme, themes } from "./store";
</script>

<template>
  <Select
    name="theme"
    value={$theme}
    items={themes}
    on:change={(e) => theme.set(e.detail.item)}
  >
    <p slot="selected" let:item class="text">{item.text}</p>
    <p slot="item" let:item class="text">{item.text}</p>
  </Select>
</template>

<style lang="postcss">
</style>
