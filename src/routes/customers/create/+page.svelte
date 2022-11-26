<script lang="ts">
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import type { App } from "$src/app";
  import SelectCountry from "$src/lib/controls/country/SelectCountry.svelte";
  import PictureInput from "$src/lib/controls/PictureInput.svelte";

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
    <div class="flex space-x-4">
      <div class="flex-initial flex-shrink-0">
        <p class="text label">&nbsp;</p>
        <PictureInput />
      </div>
      <div class="flex-1">
        <div class="flex space-x-2">
          <div class="flex-1">
            <TextInput
              bind:value={input.fname}
              label="First Name"
              icon={Icons.Home}
              placeholder="Karen"
            />
          </div>
          <div class="flex-1">
            <TextInput
              bind:value={input.lname}
              label="Last Name"
              placeholder="Smith"
            />
          </div>
        </div>
        <div class="flex space-x-2">
          <div class="flex-1">
            <TextInput
              bind:value={input.company}
              label="Company"
              icon={Icons.Home}
              placeholder="FDA Ltd."
            />
          </div>
          <div class="flex-1" />
        </div>
        <div class="flex space-x-2">
          <div class="flex-[2]">
            <TextInput
              bind:value={input.street}
              label="Street"
              placeholder="Moonshine Ave"
            />
          </div>
          <div class="flex-1">
            <TextInput
              bind:value={input.house_number}
              type="number"
              label="House Number"
              placeholder="42"
              alignRight
            />
          </div>
        </div>
        <div class="flex space-x-2">
          <div class="flex-1">
            <TextInput
              bind:value={input.postal_code}
              type="number"
              label="Postal Code"
              placeholder="34512"
            />
          </div>
          <div class="flex-1">
            <TextInput
              bind:value={input.city}
              label="City"
              placeholder="New Haven"
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
  main {
  }
</style>
