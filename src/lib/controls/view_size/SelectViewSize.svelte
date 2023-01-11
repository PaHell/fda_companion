<script lang="ts">
  import Select from "$lib/controls/Select.svelte";
    import { _ } from "svelte-i18n";
  import { viewSize, sizes } from "./store";
</script>

<template>
  <Select
    name="view_size"
    value={$viewSize}
    items={sizes}
    on:change={(e) => viewSize.set(e.detail.item)}
  >
    <p slot="selected" let:item class="text">{$_(item.text)}</p>
    <p slot="item" let:item class="text">{$_(item.text)}</p>
  </Select>
</template>

<style lang="postcss">
</style>
