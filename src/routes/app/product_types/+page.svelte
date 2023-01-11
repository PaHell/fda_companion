<script lang="ts">
  import type { App } from "$src/app";
    import { ProductType } from "$src/lib/api";
  import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
    import Select from "$src/lib/controls/Select.svelte";
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import Column from "$src/lib/table/Column.svelte";
  import { RowState } from "$src/lib/table/Row.svelte";
  import Table from "$src/lib/table/Table.svelte";
    import { _ } from "svelte-i18n";
  import { onMount } from "svelte/internal";

  let selected : App.Models.ProductType[] = [];
  let product_types: App.Models.ProductType[] = [];

  onMount(async () => {
    product_types = await ProductType.index();
  });
</script>

<template>
  <div id="product_types">
    <h1 class="text heading col-span-2">{$_("routes.app.product_types.title")}</h1>
    <Table bind:items={product_types} css="col-span-2" let:ctx>
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
