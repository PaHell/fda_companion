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
    import Column from "./Column.svelte";
    import Button, { ButtonVariant } from "../controls/Button.svelte";
    import { Icons } from "../general/Icon.svelte";

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
  export let index: number = -1;
  export let item: T;

  const table = getContext<App.General.TableContext<T>>("table");
  let context = table.getRowContext(index, item);
  setContext<App.General.RowContext<T>>("row", context);

  $: {
    console.warn("$$$ row", {item});
    context = table.getRowContext(index, item);
    setContext<App.General.RowContext<T>>("row", context);
  }
    
  function changed() {
    console.log("changed", {item});
  }

  function toggleDelete() {
    context.changed(
      context.state == RowState.Deleted
        ? context.initialState
        : RowState.Deleted
    );
  }
</script>

<template>
  <tr class={classes[context.state]}>
    <Column title="" css="state" width="1.5rem">
      <div></div>
    </Column>
    <slot />
    <Column title="" width="2.25rem">
      <Button
        icon={context.state == RowState.Deleted ? Icons.UndoDelete : Icons.Delete}
        variant={ButtonVariant.Secondary}
        on:click={toggleDelete}
      />
    </Column>
  </tr>
</template>

<style global lang="postcss">
</style>
