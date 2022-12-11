<svelte:options accessors />

<script lang="ts" context="module">
  import {
    getContext,
    onDestroy,
    onMount,
    setContext,
    SvelteComponent,
  } from "svelte";
  import type { App } from "$src/app";

  export enum RowState {
    Unmodified,
    Added,
    Modified,
    Deleted,
  }

  export const classes = {
    [RowState.Unmodified]: "unmodified",
    [RowState.Modified]: "modified",
    [RowState.Added]: "added",
    [RowState.Deleted]: "deleted",
  };

  export const translations = {
    [RowState.Unmodified]: "unmodified",
    [RowState.Modified]: "modified",
    [RowState.Added]: "added",
    [RowState.Deleted]: "deleted",
  };
</script>

<script lang="ts">
  type T = $$Generic;
  interface $$Slots {
    default: {};
  }
  export let item: T;
  export let index: number = -1;

  const table = getContext<App.General.TableContext<T>>("table");
  let context = table.getRowContext(item, index, changed);
  setContext<App.General.RowContext<T>>("row", context);

  function changed() {
    console.log("Row Changed");
    context = table.getRowContext(item, index, changed);
  }
</script>

<template>
  <tr class={classes[context.state]}>
    <td class="state">
      <div />
    </td>
    <slot />
  </tr>
</template>

<style global lang="postcss">
</style>
