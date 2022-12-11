<script lang="ts">
  import type { App } from "$src/app";
  import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
  import SelectCountry from "$src/lib/controls/country/SelectCountry.svelte";
  import Select from "$src/lib/controls/Select.svelte";
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import Icon, { Icons } from "$src/lib/general/Icon.svelte";
  import Column from "$src/lib/table/Column.svelte";
  import { RowState } from "$src/lib/table/Row.svelte";
  import Table from "$src/lib/table/Table.svelte";

  let customers: App.Models.Customer[] = [
    {
      id: "1",
      fname: "Xi",
      lname: "Jin Ping",
      street: "Tsingato St",
      house_number: 5,
      postal_code: "45123",
      country_iso3: "CHN",
      image: "https://picsum.photos/200/300",
      company_id: "1",
    },
    {
      id: "2",
      fname: "Joe",
      lname: "Biden",
      street: "Main St",
      house_number: 80,
      postal_code: "89345",
      country_iso3: "USA",
      image: "https://picsum.photos/200/300",
      company_id: "2",
    },
    {
      id: "3",
      fname: "Olaf",
      lname: "Scholz",
      street: "Bundesstraße",
      house_number: 42,
      postal_code: "34598",
      country_iso3: "DEU",
      image: "https://picsum.photos/200/300",
      company_id: "3",
    },
    {
      id: "3",
      fname: "Olaf",
      lname: "Scholz",
      street: "Bundesstraße",
      house_number: 41,
      postal_code: "34598",
      country_iso3: "DEU",
      image: "https://picsum.photos/200/300",
      company_id: "3",
    },
    {
      id: "4",
      fname: "Vladimir",
      lname: "Putin",
      street: "Red Place",
      house_number: 45,
      postal_code: "12345",
      country_iso3: "RUS",
      image: "https://picsum.photos/200/300",
      company_id: "4",
    },
  ];
  const companies: App.Models.Company[] = [
    {
      id: "1",
      name: "Apple",
    },
    {
      id: "2",
      name: "Microsoft",
    },
    {
      id: "3",
      name: "Google",
    },
    {
      id: "4",
      name: "Amazon",
    },
    {
      id: "5",
      name: "Facebook",
    },
  ];

  customers.forEach((customer) => {
    customer._company = companies.find(
      (company) => company.id == customer.company_id
    );
  });
</script>

<template>
  <div id="users">
    <h1 class="text heading col-span-2">All Customers</h1>
    <Table bind:items={customers} css="col-span-2" let:ctx>
      <Column title="ID" width="4rem" css="" sortByKey="id">
        <p class="text secondary font-mono text-right">{ctx.item.id ?? "-"}</p>
      </Column>
      <Column title="First Name" sortByKey="fname">
        <TextInput
          value={ctx.item.fname}
          on:change={(event) => {
            ctx.item.fname = event.detail;
            ctx.changed();
          }}
          name="first_name"
          css="col-span-2"
          autofocus={ctx.state == RowState.Added}
        />
      </Column>
      <Column title="Last Name" sortByKey="lname">
        <TextInput
          value={ctx.item.lname}
          on:change={(event) => {
            ctx.item.lname = event.detail;
            ctx.changed();
          }}
          name="last_name"
          css="col-span-2"
        />
      </Column>
      <Column title="Country" width="20%" sortByKey="country_iso3">
        <SelectCountry
          iso3={ctx.item.country_iso3}
          on:change={(event) => {
            ctx.item.country_iso3 = event.detail.item.iso3;
            ctx.changed();
          }}
        />
      </Column>
      <Column
        title="Postal"
        width="10%"
        css="font-mono"
        sortByKey="postal_code"
      >
        <p class="text text-right">{ctx.index}</p>
      </Column>
      <Column title="Address" width="15%" sortByKey="street">
        <p class="text">
          <span class="font-semibold">{ctx.item.street}</span>
          <span class="font-mono">{ctx.item.house_number}</span>
        </p>
      </Column>
      <Column title="Company">
        <Select
          value={ctx.item._company}
          name="country"
          items={companies}
          searchKeysOrdered={["name"]}
          enableSearch={true}
          searchName="search_company"
          on:change={(event) => {
            ctx.item._company = event.detail.item;
            ctx.item.company_id = event.detail.item.id;
            ctx.changed();
          }}
        >
          <svelte:fragment slot="selected" let:item>
            <p class="text">{item.name}</p>
          </svelte:fragment>
          <svelte:fragment slot="item" let:item>
            <p class="text">{item.name}</p>
          </svelte:fragment>
        </Select>
      </Column>
      <Column title="" width="2.25rem">
        <Button
          icon={ctx.state == RowState.Deleted ? Icons.UndoDelete : Icons.Delete}
          variant={ButtonVariant.Secondary}
          on:click={() => {
            ctx.changed(
              ctx.state == RowState.Deleted
                ? ctx.initialState
                : RowState.Deleted
            );
          }}
        />
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
