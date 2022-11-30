<script lang="ts">
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import type { App } from "$src/app";
  import SelectCountry from "$src/lib/controls/country/SelectCountry.svelte";
  import PictureInput from "$src/lib/controls/PictureInput.svelte";
    import { ValidationRuleName } from "$src/lib/validate";

  // IMPORT
  // PROPS
  // DATA
  let input: App.Models.CustomerIn = {
    fname: "",
    lname: "",
    street: "",
    house_number: 0,
    postal_code: "",
    city: "",
    country_iso3: "",
    image: "",
    company: "",
  };
  let country: App.Models.Country | undefined;
  // EVENTS
  // HOOKS
  // FUNCTIONS
</script>

<template>
  <div class="vbox">
    <h1 class="text heading">Create Customer</h1>
    <div class="flex flex-col space-y-4">
      <PictureInput bind:value={input.image} />
      <div class="flex-1">
        <div class="flex space-x-2">
          <div class="flex-1">
            <TextInput
              bind:value={input.fname}
              name="first_name"
              icon={Icons.Home}
              rules={[
                [ValidationRuleName.Required],
                [ValidationRuleName.Range, 2, 5]
              ]}
            />
          </div>
          <div class="flex-1">
            <TextInput
              bind:value={input.lname}
              name="last_name"
            />
          </div>
        </div>
        <div class="flex space-x-2">
          <div class="flex-1">
            <TextInput
              bind:value={input.company}
              name="company"
              disabled={true}
              icon={Icons.Home}
            />
          </div>
          <div class="flex-1" />
        </div>
        <div class="flex space-x-2">
          <div class="flex-[2]">
            <TextInput
              bind:value={input.street}
              name="street"
            />
          </div>
          <div class="flex-1">
            <TextInput
              bind:value={input.house_number}
              type="number"
              name="house_number"
              alignRight
            />
          </div>
        </div>
        <div class="flex space-x-2">
          <div class="flex-1">
            <TextInput
              bind:value={input.postal_code}
              type="number"
              name="postal_code"
            />
          </div>
          <div class="flex-1">
            <TextInput
              bind:value={input.city}
              name="city"
            />
          </div>
          <div class="flex-1">
            <SelectCountry
              bind:value={country}
              on:change={(e) => (input.country_iso3 = e.detail.item.iso3)}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
</style>
