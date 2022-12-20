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
  let username: string = "";
  let password: string = "";
  // EVENTS
  // HOOKS
  // FUNCTIONS
  function login() {
    console.log("login");
  }
</script>

<template>
  <div class="flex flex-col space-y-4">
    <h1 class="text heading text-center">{$_("routes.auth.login.title")}</h1>
    <TextInput
      bind:value={username}
      name="username"
      />
    <TextInput
      bind:value={password}
      name="password"
      type="password"
      />
    <Button
      icon={Icons.Home}
      text="routes.auth.login.title"
      variant={ButtonVariant.Primary}
      align={ButtonAlignment.Center}
      on:click={login}
      />
      <div class="grid grid-cols-2 gap-4 items-center">
        <Button
          icon={Icons.Home}
          text="routes.auth.login.reset_password"
          variant={ButtonVariant.Secondary}
          align={ButtonAlignment.Center}
          on:click={() => goto("/auth/reset")}
          />
        <Button
          icon={Icons.Home}
          text="routes.auth.login.register"
          variant={ButtonVariant.Secondary}
          align={ButtonAlignment.Center}
          on:click={() => goto("/auth/register")}
          />
      </div>
  </div>
</template>

<style global lang="postcss">
</style>
