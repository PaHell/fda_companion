<script lang="ts">
  import TextInput from "$src/lib/controls/TextInput.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import type { App } from "$src/app";
  import { _ } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import { Auth, Customer, ProductType } from "$src/lib/api";
  import Button, { ButtonAlignment, ButtonVariant } from "$src/lib/controls/Button.svelte";
  import Alert, { AlertVariant } from "$src/lib/general/Alert.svelte";
  import { readFile, setHeaders, writeFile } from "$src/lib/http";
  import { authenticated, productTypes } from "$src/store";
    import { redirectAuthed } from "$src/routes/+layout.svelte";

  let username: string = "";
  let password: string = "";
  let error: string = "";

  if (import.meta.env.VITE_MODE === 'DEV') {
    username = import.meta.env.VITE_LOGIN_USERNAME;
    password = import.meta.env.VITE_LOGIN_PASSWORD;
  }

  async function login() {
    console.log("login");
    Auth.login({ username, password })
      .then(async (resp: App.Models.Auth.Token) => {
        setHeaders({ Authorization: `Bearer ${resp.token}` });
        authenticated.set(true);
        goto(redirectAuthed);
      })
      .catch((msg: App.Models.RequestError) => {
        console.log("error", msg);
        error = msg.error;
      });
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
    {#if error}
      <Alert
        title="messages.errors.error"
        text={error}
        variant={AlertVariant.Danger}
        />
    {/if}
    <Button
      text="routes.auth.login.title"
      variant={ButtonVariant.Primary}
      align={ButtonAlignment.Center}
      on:click={login}
      />
  </div>
</template>

<style global lang="postcss">
</style>
