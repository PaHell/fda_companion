<script lang="ts">
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import type { App } from "$src/app";
  import { _ } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import { Auth } from "$src/lib/api";
  import Button, { ButtonAlignment, ButtonVariant } from "$src/lib/controls/Button.svelte";
    import Alert from "$src/lib/general/Alert.svelte";

  let username: string = "";
  let password: string = "";
  let error: string = "";
  let token: string = "";

  async function login() {
    console.log("login");
    Auth.login({ username, password })
      .then((_token: App.Models.Auth.Token) => {
        console.log({token});
        token = JSON.stringify(_token, null, 2);
      })
      .catch((msg: App.Models.RequestError) => {
        console.log("error", msg);
        error = JSON.stringify(msg, null, 2);
      });
  }
</script>

<template>
  <div class="flex flex-col space-y-4">
    <h1 class="text heading text-center">{$_("routes.auth.login.title")}</h1>
    <p>{token}</p>
    <Alert
      text={error}
      />
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
