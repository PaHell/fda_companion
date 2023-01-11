<script lang="ts">
    import type { App } from "$src/app";
    import { Customer } from "$src/lib/api";
    import Column from "$src/lib/table/Column.svelte";
    import Table from "$src/lib/table/Table.svelte";
    import { onMount } from "svelte";
    import { _ } from "svelte-i18n";

  let customers: App.Models.Customer[] = [];

  onMount(async () => {
    customers = await Customer.index();
  });
</script>

<template>
  <div id="users">
    <h1 class="text heading col-span-2">{$_("routes.app.customers.all.title")}</h1>
    <Table bind:items={customers} css="col-span-2" let:ctx>
      <Column title="ID" width="5rem" css="" sortByKey="id">
        <p class="text secondary font-mono text-right">{ctx.item.id ?? "-"}</p>
      </Column>
      <Column title="lib.controls.text_input.first_name.label" sortByKey="fname">
        <p class="text">{ctx.item.fname}</p>
      </Column>
      <Column title="lib.controls.text_input.last_name.label" sortByKey="lname">
        <p class="text">{ctx.item.lname}</p>
      </Column>
      <Column title="lib.controls.select.country" width="20%" sortByKey="country_iso3">
        <p class="text">{ctx.item.country_iso3}</p>
      </Column>
      <Column
        title="Postal"
        width="10%"
        css="font-mono"
        sortByKey="postal_code"
      >
        <p class="text secondary font-mono text-right">{ctx.item.postal_code}</p>
      </Column>
      <Column title="Address" width="15%" sortByKey="street">
        <p class="text">
          <span class="font-semibold">{ctx.item.street}</span>
          <span class="font-mono">{ctx.item.house_number}</span>
          <span>, {ctx.item.city}</span>
        </p>
      </Column>
      <Column title="Company" sortByKey="company">
        <p class="text">{ctx.item.company}</p>
      </Column>
      <Column title="Product Types">
        <p class="text">{ctx.item.product_groups?.join(', ')}</p>
      </Column>
    </Table>
  </div>
</template>

<style lang="postcss">
  #users {
    @apply min-w-0 grid grid-cols-2 gap-4
      items-center;
  }
</style>
