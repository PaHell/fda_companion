<script lang="ts">
  import type { App } from "$src/app";
    import { Customer } from "$src/lib/api";
  import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
  import SelectCountry from "$src/lib/controls/country/SelectCountry.svelte";
  import Select from "$src/lib/controls/Select.svelte";
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import Icon, { Icons } from "$src/lib/general/Icon.svelte";
  import Column from "$src/lib/table/Column.svelte";
  import { RowState } from "$src/lib/table/Row.svelte";
  import Table from "$src/lib/table/Table.svelte";
    import { onMount } from "svelte";

  let customers: App.Models.Customer[] = [];

  onMount(async () => {
    customers = await Customer.index();
  });
</script>

<template>
  <div id="users">
    <h1 class="text heading col-span-2">All Customers</h1>

    <Table bind:items={customers} css="col-span-2" let:ctx>
      <Column title="ID" width="5rem" css="" sortByKey="id">
        <p class="text secondary font-mono text-right">{ctx.item.id ?? "-"}</p>
      </Column>
      <Column title="First Name" sortByKey="fname">
        <p class="text">{ctx.item.fname}</p>
      </Column>
      <Column title="Last Name" sortByKey="lname">
        <p class="text">{ctx.item.lname}</p>
      </Column>
      <Column title="Country" width="20%" sortByKey="country_iso3">
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
        <p class="text">{ctx.item.product_types?.join(', ')}</p>
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
