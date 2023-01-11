<script lang="ts">
  import Column from "$src/lib/table/Column.svelte";
  import Table from "$src/lib/table/Table.svelte";
  import { productTypes } from "$src/store";
  import { _ } from "svelte-i18n";
</script>

<template>
  <div id="product_types">
    <h1 class="text heading col-span-2">{$_("routes.app.product_types.title")}</h1>
    <Table bind:items={$productTypes} css="col-span-2" let:ctx>
      <Column title="ID" width="5rem" css="" sortByKey="id">
        <p class="text secondary font-mono text-right">{ctx.item.id ?? "-"}</p>
      </Column>
      <Column title="lib.controls.text_input.product_type.label" sortByKey="name">
        <p class="text">{ctx.item.name}</p>
      </Column>
    </Table>
  </div>
</template>

<style lang="postcss">
  #product_types {
    @apply min-w-0 grid grid-cols-2 gap-4
      items-center;
  }
</style>
