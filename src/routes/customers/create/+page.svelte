<script lang="ts">
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import type { App } from "$src/app";
  import SelectCountry from "$src/lib/controls/country/SelectCountry.svelte";
  import PictureInput from "$src/lib/controls/PictureInput.svelte";
    import { ValidationRuleName } from "$src/lib/validate";
    import { fullscreen } from "$src/store";
    import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
    import Checkbox from "$src/lib/controls/Checkbox.svelte";

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
  };
  let country: App.Models.Country | undefined;
  let acceptTerms = false;
  // EVENTS
  // HOOKS
  // FUNCTIONS
</script>

<template>
  <div id="customer_create" class:fullscreen={$fullscreen}>
    <h1 class="text heading col-span-3">Create Customer</h1>
    <div class="col-span-3 hbox">
      <PictureInput bind:value={input.image} css="flex-initial self-end"/>
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
        on:click={() => console.log(input)}
        rtl
        />
  </div>
</template>

<style global lang="postcss">
  #customer_create {
    @apply min-w-0 grid grid-cols-3 gap-4
    items-center;
  }
</style>
