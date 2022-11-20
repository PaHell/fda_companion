<script lang="ts">
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import type { App } from "$src/app";

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
  // EVENTS
  // HOOKS
  // FUNCTIONS
</script>

<template>
  <div class="vbox">
    <h1 class="text heading">Create Customer</h1>
    <TextInput
      bind:value={input.fname}
      label="First Name"
      icon={Icons.Home}
      placeholder="Karen"
    />
    <TextInput bind:value={input.lname} label="Last Name" placeholder="Smith" />
    <p class="text">Image Upload</p>
    <TextInput
      bind:value={input.street}
      label="Street"
      placeholder="Moonshine Ave"
    />
    <TextInput
      bind:value={input.house_number}
      label="Housenumber"
      placeholder="42"
    />
    <TextInput
      bind:value={input.postal_code}
      label="Postal Code"
      placeholder="34512"
    />
    <TextInput bind:value={input.city} label="City" placeholder="New Haven" />
    <p class="text">Country Select</p>
    <TextInput
      bind:value={input.company}
      label="Company"
      icon={Icons.Home}
      placeholder="FDA Ltd."
    />
  </div>
</template>

<style lang="postcss">
  main {
  }
</style>
