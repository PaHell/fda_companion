<script lang="ts" context="module">
  // import css bootstrap
  import "../app.postcss";
  // other imports
  import {
    initLocale,
    localeInitialized,
  } from "$src/lib/controls/locale/store";
  import FullscreenLoading from "$src/lib/general/FullscreenLoading.svelte";
    import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
    import type { AfterNavigate, BeforeNavigate } from "@sveltejs/kit";
    import { onMount } from "svelte";
    import { authenticated, user } from "$src/store";
    import type { App } from "$src/app";
    import Button from "$src/lib/controls/Button.svelte";
    import SelectLanguage from "$src/lib/controls/locale/SelectLanguage.svelte";
    import Overlay, { OverlayPosition } from "$src/lib/controls/Overlay.svelte";
    import SelectTheme from "$src/lib/controls/theme/SelectTheme.svelte";
    import { Icons } from "$src/lib/general/Icon.svelte";

    const routeAuthed = "/app";
    const routeUnauthed = "/auth";
    const redirectAuthed = "/app/customers/create";
    const redirectUnauthed = "/auth/login";
</script>

<script lang="ts">
    let refDevTools: Overlay;
    let devToolsOpened = false;
    initLocale();

  onMount(() => {
    console.log("onMount");
    if (window.location.pathname === "/") {
      goto(redirectUnauthed);
      return;
    }
    onNavigate(window.location.pathname);
  });

  beforeNavigate((nav: BeforeNavigate) => {
    console.log("beforeNavigate", nav);
    if (!nav.to) return;
    onNavigate(nav.to.url.pathname);
  });

  function onNavigate(url: string) {
    console.log("onNavigate", url);
    if (url.startsWith(routeAuthed) && !$authenticated) {
      goto(redirectUnauthed);
    } else if (url.startsWith(routeUnauthed) && $authenticated) {
      goto(redirectAuthed);
    } else {
      console.log("no redirect");
    }
  }

  function bypassAuth(admin: boolean) {
    authenticated.set(true);

    const _user : App.Models.User = {
      id: "1",
      username: "jdoe",
      fname: "John",
      lname: "Doe",
      role_id: "1",
    };

    if (admin) {
      _user.role_id = "2";
      _user._role = {
        id: "2",
        name: "Admin",
      };
    } else {
      _user._role = {
        id: "1",
        name: "User",
      };
    }

    user.set(_user);
    refDevTools.close();
    onNavigate(window.location.pathname);
  }
</script>

<template>
  {#if import.meta.env.DEV}
    <Overlay bind:this={refDevTools} bind:opened={devToolsOpened} position={OverlayPosition.Bottom} css="overlay-dev-tools">
      <svelte:fragment slot="item">
        <Button icon={Icons.DevTools} active={devToolsOpened} on:click={refDevTools.toggleOpened}/>
      </svelte:fragment>
      <svelte:fragment slot="menu">
        <p class="text text-center">Dev Tools</p>
        <SelectTheme/>
        <SelectLanguage/>
        {#if !$authenticated}
          <Button text="Bypass Auth (Normal)" on:click={() => bypassAuth(false)}/>
          <Button text="Bypass Auth (Admin)" on:click={() => bypassAuth(true)}/>
        {/if}
      </svelte:fragment>
    </Overlay>
  {/if}
  {#if $localeInitialized}
    <slot />
  {:else}
    <FullscreenLoading />
  {/if}
</template>

<style global lang="postcss">
  .overlay-dev-tools {
    @apply fixed right-4 z-40;
    top: calc((100% - 2.5rem)/2);
    & > menu > main {
      @apply flex flex-col space-y-2
      p-2 overflow-auto;
    }
  }
</style>
