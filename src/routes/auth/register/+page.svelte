<script lang="ts">
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import type { App } from "$src/app";
  import SelectCountry from "$src/lib/controls/country/SelectCountry.svelte";
  import PictureInput from "$src/lib/controls/PictureInput.svelte";
    import { ValidationRuleName } from "$src/lib/validate";
    import Button, { ButtonAlignment, ButtonVariant } from "$src/lib/controls/Button.svelte";
    import Checkbox from "$src/lib/controls/Checkbox.svelte";
    import { _ } from "svelte-i18n";
    import { goto } from "$app/navigation";

  // IMPORT
  // PROPS
  // DATA
  let fname: string = "";
  let lname: string = "";
  let username: string = "";
  let password: string = "";
  // EVENTS
  // HOOKS
  // FUNCTIONS
  function register() {
    console.log("register");
  }
</script>

<template>
  <div class="flex flex-col space-y-4">
    <h1 class="text heading text-center">{$_("routes.auth.register.title")}</h1>
    <div class="grid grid-cols-2 gap-4">
      <TextInput
        bind:value={fname}
        name="first_name"
        />
      <TextInput
        bind:value={lname}
        name="last_name"
        />
    </div>
    <TextInput
      bind:value={username}
      name="username"
      />
    <TextInput
      bind:value={password}
      name="password"
      type="password"
      />
    <div class="grid grid-cols-2 gap-4 items-center">
      <Button
        icon={Icons.Home}
        text="routes.auth.register.login"
        variant={ButtonVariant.Secondary}
        align={ButtonAlignment.Center}
        on:click={() => goto("/auth/login")}
        />
      <Button
        icon={Icons.Home}
        text="routes.auth.register.title"
        variant={ButtonVariant.Primary}
        align={ButtonAlignment.Center}
        on:click={register}
        />
    </div>
  </div>
</template>

<style global lang="postcss">
</style>
