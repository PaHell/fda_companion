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
    import Form from "$src/lib/controls/Form.svelte";
    import { productTypes } from "$src/store";
    import { readFile, writeFile } from "$src/lib/http";

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
  let selectedProductTypes: App.Models.ProductType[] = [];
  let country: App.Models.Country | undefined;
  let showSuccess = false;
  let allValid = false;
  let error = "";

  setTimeout(() => {
    allValid = true;
  }, 2000)

  async function create() {
    console.log("createCustomer", input);
    showSuccess = false;
    error = "";
    input.product_groups = selectedProductTypes.map((pt) => pt.id);
    Customer.create(input)
      .then(() => {
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
        allValid = false;
      })
      .catch((msg) => {
        console.error("error", msg);
        error = msg.error;
        readFile<App.Models.Customer[]>("/customers.json")
          .then(customers => {
            customers.push(input);
            writeFile("/customers.json", JSON.stringify(customers));
          })
          .catch(err => {
            writeFile("/customers.json", JSON.stringify([input]));
          })
      });
  }
</script>

<template>
  <Form id="customer_create" bind:allValid>
    <h1 class="text heading col-span-3">{$_('routes.app.customers.create.title')}</h1>
    <div class="col-span-3 hbox">
      <PictureInput bind:value={input.image} css="flex-initial self-start pt-5"/>
        <div class="flex-1 vbox">
          <TextInput
            bind:value={input.fname}
            name="first_name"
            rules={[
              [ValidationRuleName.Required],
              [ValidationRuleName.Range, 2, 255]
            ]}
            autofocus
          />
          <TextInput
            bind:value={input.lname}
            rules={[
              [ValidationRuleName.Required],
              [ValidationRuleName.Range, 2, 255]
            ]}
            name="last_name"
          />
          <TextInput
            bind:value={input.company}
            name="company"
            icon={Icons.Company}
          />
        </div>
    </div>
        <TextInput
          bind:value={input.street}
          name="street"
          rules={[
            [ValidationRuleName.Required],
            [ValidationRuleName.Range, 2, 255]
          ]}
          css="col-span-2"
          />
        <TextInput
          bind:value={input.house_number}
          name="house_number"
          rules={[
            [ValidationRuleName.Required],
            [ValidationRuleName.Range, 1, 127]
          ]}
          alignRight
        />
        <TextInput
          bind:value={input.postal_code}
          type="number"
          name="postal_code"
          rules={[
            [ValidationRuleName.Required],
            [ValidationRuleName.Range, 2, 255]
          ]}
        />
        <TextInput
          bind:value={input.city}
          name="city"
          rules={[
            [ValidationRuleName.Required],
            [ValidationRuleName.Range, 2, 255]
          ]}
        />
        <SelectCountry
          bind:value={country}
          on:change={(e) => (input.country_iso3 = e.detail.item.iso3)}
          required
        />
        <Select
          bind:values={selectedProductTypes}
          name="product_types"
          items={$productTypes}
          searchKeysOrdered={["name"]}
          allowMultiple
          required
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
            icon={Icons.Add}
            text="routes.app.customers.create.create"
            variant={ButtonVariant.Primary}
            align={ButtonAlignment.Center}
            on:click={create}
            css="w-full"
            disabled={!allValid}
            />
        </div>
        {#if error}
          <Alert
            variant={AlertVariant.Danger}
            title="messages.errors.error"
            text={error}
            css="col-span-3"/>
        {/if}
        {#if showSuccess}
          <Alert
            variant={AlertVariant.Success}
            title="messages.success"
            text="routes.app.customers.create.created"
            css="col-span-3"/>
        {/if}
  </Form>
</template>

<style global lang="postcss">
  #customer_create {
    @apply min-w-0 grid grid-cols-3 gap-4
    items-start;
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
