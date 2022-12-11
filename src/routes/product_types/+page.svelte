<script lang="ts">
  import type { App } from "$src/app";
  import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import Column from "$src/lib/table/Column.svelte";
  import { RowState } from "$src/lib/table/Row.svelte";
  import Table from "$src/lib/table/Table.svelte";
  import { getContext } from "svelte";
  import { claim_text } from "svelte/internal";
  import { get } from "svelte/store";

  let product_types: App.Models.ProductType[] = [
    {
      id: "1",
      name: "Information Technology",
    },
    {
      id: "2",
      name: "Human Resources",
    },
    {
      id: "3",
      name: "Sales",
    },
    {
      id: "4",
      name: "Marketing",
    },
  ];

</script>

<template>
  <div id="product_types">
    <h1 class="text heading col-span-2">All Product Types</h1>
    <Table bind:items={product_types} css="col-span-2" let:ctx>
      <Column title="ID" width="4rem" css="" sortByKey="id">
        <p class="text secondary font-mono text-right">{ctx.item.id ?? "-"}</p>
      </Column>
      <Column title="lib.controls.text_input.product_type.label">
        <TextInput
          value={ctx.item.name}
          on:change={(event) => {
            ctx.item.name = event.detail;
            ctx.changed();
          }}
          name="product_type"
        />
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
