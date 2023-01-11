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
    import { Customer } from "$src/lib/api";
    import Select from "$src/lib/controls/Select.svelte";

  // IMPORT
  // PROPS
  // DATA
  let input: App.Models.CustomerInput = {
    fname: "",
    lname: "",
    street: "",
    house_number: "",
    postal_code: "",
    city: "",
    country_iso3: "",
    image: "",
    company: "",
    product_types: [],
  };
  let productTypes: App.Models.ProductType[] = [
    {
      id: 1,
      name: "Information Technology",
    },
    {
      id: 2,
      name: "Human Resources",
    },
    {
      id: 3,
      name: "Sales",
    },
    {
      id: 4,
      name: "Marketing",
    },
  ];
  let selectedProductTypes: App.Models.ProductType[] = [];
  let country: App.Models.Country | undefined;
  let acceptTerms = false;
  // EVENTS
  // HOOKS
  // FUNCTIONS
  async function create() {
    console.log("createCustomer", input);
    Customer.create(input).then((res) => {
      console.log("res", res);
    }).catch((err) => {
      console.log("err", err);
    });
  }
</script>

<template>
  <div id="customer_create">
    <h1 class="text heading col-span-3">Create Customer</h1>
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
            disabled={true}
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
        <div class="col-span-2"></div>
        <Checkbox
          icon={Icons.Home}
          bind:value={acceptTerms}
          css="col-span-2">
          <p class="text">I accept the </p>
          <a class="link" href="https://google.com" target="_BLANK">Terms and Conditions</a>
          <p class="text">.</p>
        </Checkbox>
      <Button
        icon={Icons.Home}
        text="Create"
        variant={ButtonVariant.Primary}
        align={ButtonAlignment.Center}
        on:click={create}
        />
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
