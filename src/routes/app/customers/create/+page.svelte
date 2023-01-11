<script lang="ts">
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import type { App } from "$src/app";
  import SelectCountry from "$src/lib/controls/country/SelectCountry.svelte";
  import PictureInput from "$src/lib/controls/PictureInput.svelte";
    import { ValidationRuleName } from "$src/lib/validate";
    import Button, { ButtonAlignment, ButtonVariant } from "$src/lib/controls/Button.svelte";
    import Checkbox from "$src/lib/controls/Checkbox.svelte";
    import { invoke } from "@tauri-apps/api/tauri";
    import { Customer, ProductType } from "$src/lib/api";
    import Select from "$src/lib/controls/Select.svelte";
    import { onMount } from "svelte";
    import Alert, { AlertVariant } from "$src/lib/general/Alert.svelte";
    import { _ } from "svelte-i18n";

  // IMPORT
  // PROPS
  // DATA
  let input: App.Models.Customer = {
    id: 0,
    fname: "",
    lname: "",
    street: "",
    house_number: "",
    postal_code: "",
    city: "",
    country_iso3: "",
    image: "",
    company: "",
    product_groups: [],
  };
  let productTypes: App.Models.ProductType[] = [];
  let selectedProductTypes: App.Models.ProductType[] = [];
  let country: App.Models.Country | undefined;
  let showSuccess = false;

  onMount(async () => {
    productTypes = await ProductType.index();
  });

  async function create() {
    console.log("createCustomer", input);
    input.product_groups = selectedProductTypes.map((pt) => pt.id);
    await Customer.create(input);
    showSuccess = true;
    input = {
      id: 0,
      fname: "",
      lname: "",
      street: "",
      house_number: "",
      postal_code: "",
      city: "",
      country_iso3: "",
      image: "",
      company: "",
      product_groups: [],
    };
  }
</script>

<template>
  <div id="customer_create">
    <h1 class="text heading col-span-3">{$_('routes.app.customers.create.title')}</h1>
    {#if showSuccess}
      <Alert
        variant={AlertVariant.Success}
        title="messages.success"
        text="routes.app.customers.create.created"/>
    {/if}
    <div class="col-span-3 hbox">
      <PictureInput bind:value={input.image} css="flex-initial self-start pt-5"/>
        <div class="flex-1 vbox">
          <TextInput
            bind:value={input.fname}
            name="first_name"
            icon={Icons.Home}
            rules={[
              [ValidationRuleName.Required],
              [ValidationRuleName.Range, 2, 5]
            ]}
          />
          <TextInput
            bind:value={input.lname}
            name="last_name"
          />
          <TextInput
            bind:value={input.company}
            name="company"
            icon={Icons.Home}
          />
        </div>
    </div>
        <TextInput
          bind:value={input.street}
          name="street"
          css="col-span-2"
          />
        <TextInput
          bind:value={input.house_number}
          name="house_number"
          alignRight
        />
        <TextInput
          bind:value={input.postal_code}
          type="number"
          name="postal_code"
        />
        <TextInput
          bind:value={input.city}
          name="city"
        />
        <SelectCountry
          bind:value={country}
          on:change={(e) => (input.country_iso3 = e.detail.item.iso3)}
        />
        <Select
          bind:values={selectedProductTypes}
          name="product_types"
          items={productTypes}
          searchKeysOrdered={["name"]}
          allowMultiple
        >
          <svelte:fragment slot="selected" let:items>
            <p class="text flex-1">{items.map(i => i.name).join(', ')}</p>
          </svelte:fragment>
          <svelte:fragment slot="item" let:item>
            <p class="text flex-1">{item.name}</p>
          </svelte:fragment>
        </Select>
        <div class="col-span-1"></div>
        <div>
          <p class="text label">&nbsp;</p>
          <Button
            icon={Icons.Home}
            text="routes.app.customers.create.create"
            variant={ButtonVariant.Primary}
            align={ButtonAlignment.Center}
            on:click={create}
            css="w-full"
            />
        </div>
  </div>
</template>

<style global lang="postcss">
  #customer_create {
    @apply min-w-0 grid grid-cols-3 gap-4
    items-center;
    & > .heading {
      @apply pb-2;
    }
  }
  .fullscreen #customer_create {
    & > .heading {
      @apply pb-4 text-center;
    }
  }
</style>
