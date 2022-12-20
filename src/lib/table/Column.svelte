<svelte:options accessors />

<script lang="ts">
  import {
    getContext,
    onDestroy,
    onMount,
    setContext,
    SvelteComponent,
  } from "svelte";
  import type { App } from "$src/app";

  type T = $$Generic;
  interface $$Slots {
    default: {};
  }

  export let title: string = "";
  export let width: string = "auto";
  export let css: string = "";
  export let sortByKey: keyof T | null = null;

  const index = getContext<number>("index");
  if (index === 0) {
    const table = getContext<App.General.TableContext<T>>("table");
    table.registerColumn(title, width, css, sortByKey);
  }
</script>

<template>
  <td class={css}>
    <slot />
  </td>
</template>

<style global lang="postcss">
</style>
