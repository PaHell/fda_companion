<script lang="ts">
  import Select from "$lib/controls/Select.svelte";
  import { countries } from "./store";
  import type { App } from "$src/app";

  export let value : App.Models.Country | undefined = undefined;

  interface $$Events {
    change: CustomEvent<{
      item: App.Models.Country;
      index: number;
    }>;
  }
</script>

<template>
  <p class="text label">Country</p>
  <Select
    bind:value={value}
    items={$countries}
    on:change
  >
    <svelte:fragment slot="selected" let:item>
      <div class="flag">
        <img src={item.flag} alt="Flag of {item.name} ({item.iso3})"/>
      </div>
      <p class="text">
        {item.name}
        <span class="secondary">({item.iso3})</span>
      </p>
    </svelte:fragment>
    <svelte:fragment slot="item" let:item>
      <div class="flag">
        <img src={item.flag} alt="Flag of {item.name} ({item.iso3})"/>
      </div>
      <p class="text">
        {item.name}
        <span class="secondary">({item.iso3})</span>
      </p>
    </svelte:fragment>
  </Select>
</template>

<style lang="postcss">
  .flag {
    @apply
    overflow-hidden
    w-6 h-6
    rounded;
    & > img {
      @apply h-6 object-cover;
    }
  }
</style>
