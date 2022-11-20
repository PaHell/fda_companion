<script lang="ts" context="module">
  // import css bootstrap
  import "../app.postcss";
  // other imports
  import type { App } from "$src/app";
  import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import Header from "$src/lib/Header.svelte";
  import { goto, afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import {
    initLocale,
    localeInitialized,
  } from "$src/lib/controls/locale/store";
</script>

<script lang="ts">
  let currentPath: string | undefined;
  const navItems: App.General.NavItem[] = [
    {
      title: "Home",
      icon: Icons.Home,
      path: "/",
    },
    {
      title: "Create Customer",
      icon: Icons.Home,
      path: "/customers/create",
    },
    {
      title: "Customers",
      icon: Icons.Home,
      path: "/customers/all",
    },
    {
      title: "Product Types",
      icon: Icons.Home,
      path: "/product_types",
    },
    {
      title: "Users",
      icon: Icons.Home,
      path: "/users",
    },
    {
      title: "Settings",
      icon: Icons.Home,
      path: "/settings",
    },
  ];

  initLocale();

  onMount(() => {
    currentPath = window.location.pathname;
  });

  afterNavigate(({ to }) => {
    currentPath = to?.url?.pathname;
  });
</script>

<template>
  <Header />
  <div id="content">
    <nav>
      {#each navItems as item}
        <Button
          text={item.title}
          icon={item.icon}
          variant={currentPath === item.path
            ? ButtonVariant.Secondary
            : ButtonVariant.Transparent}
          on:click={() => goto(item.path)}
          active={currentPath === item.path}
        />
      {/each}
    </nav>
    <main>
      {#if $localeInitialized}
        <slot />
      {:else}
        <p class="text heading">...</p>
      {/if}
    </main>
  </div>
</template>

<style global lang="postcss">
  #content {
    @apply flex-1 flex;

    & > nav {
      @apply w-72 border-r p-2
      border-gray-300 dark:border-gray-700;

      & > .button {
        @apply w-full h-16;

        &:not(:last-child) {
          @apply mb-2;
        }

        & > .icon {
          @apply mr-1;
        }

        &.button-trans {
          &:hover,
          &:focus {
            @apply bg-gray-200 border-gray-300
      dark:bg-gray-800 dark:border-gray-700;
          }
        }
      }
    }

    & > main {
      @apply flex-1 p-2;

      & > *:not(:last-child) {
        @apply mb-2;
      }
    }
  }
</style>
