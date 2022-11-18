<script lang="ts">
  // IMPORT
  import Select from "$lib/controls/Select.svelte";
  import { theme, themes } from "$lib/../store";
  // PROPS
  // EVENTS
  // HOOKS
  // FUNCTIONS
</script>

<template>
  <p class="text caption pl-2">Theme</p>
  <Select
    value={$theme}
    items={themes}
    on:change={(e) => theme.set(e.detail.item)}
  >
    <svelte:fragment slot="selected" let:item>
      <p class="text">{item.text}</p>
    </svelte:fragment>
    <svelte:fragment slot="item" let:item>
      <p class="text">{item.text}</p>
    </svelte:fragment>
  </Select>
</template>

<style lang="postcss">
</style>
