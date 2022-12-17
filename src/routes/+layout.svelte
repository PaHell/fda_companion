<script lang="ts" context="module">
  // import css bootstrap
  import "../app.postcss";
  // other imports
  import type { App } from "$src/app";
  import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import { goto, afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import {
    initLocale,
    localeInitialized,
  } from "$src/lib/controls/locale/store";
  import FullscreenLoading from "$src/lib/general/FullscreenLoading.svelte";
import { screenLock } from "$src/store";
import ScreenLock from "$src/lib/ScreenLock.svelte";
</script>

<script lang="ts">

  let navCollapsed = false;
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
  {#if $localeInitialized}
    <div id="main-layout" class:fullscreen={$screenLock.locked}>
      <header>
        <Button icon={Icons.Menu} on:click={() => navCollapsed = !navCollapsed} />
        <main>
            <p class="text font-bold">{import.meta.env.VITE_APP_NAME}</p>
        </main>
        <ScreenLock/>
      </header>
      <div id="content" class:collapsed={navCollapsed}>
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
          <slot />
        </main>
      </div>
    </div>
  {:else}
    <FullscreenLoading />
  {/if}
</template>

<style global lang="postcss">
  #main-layout {
    @apply flex flex-col h-screen;

    & > header {
        @apply grid grid-cols-3 items-center
        h-14 px-2 overflow-hidden border-b
        border-gray-300 dark:border-gray-800;
        & > * {
          &:nth-child(3n-2) {
            @apply justify-self-start;
          }
          &:nth-child(3n-1) {
            @apply justify-self-center;
          }
          &:nth-child(3n) {
            @apply justify-self-end;
          }

        }
        & > main {
            @apply flex-1 flex justify-center items-center;
        }
        & > .button + .button {
            @apply ml-2;
        }
    }

    & > #content {
      @apply flex-1 flex;

      & > nav {
        @apply w-[18rem] py-2 border-r overflow-hidden
        border-gray-300 dark:border-gray-800
        transition-[width];

        & > .button {
          @apply w-[17rem] mx-2 h-16;

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
        @apply flex-1 overflow-auto p-4;
      }

      &.collapsed {
        & > nav {
          @apply w-14;
          & > .button {
            @apply px-1 h-12;
            & > .text {
              @apply text-transparent !important;
            }
          }
        }
        & > main {
          @apply ml-0;
        }
      }
    }

    &.fullscreen {
      & > header {
        @apply h-0;
      }
      & > #content {
        @apply flex-1 items-center justify-center;
        & > nav {
          @apply w-0 border-transparent;
        }
        & > main {
          @apply max-w-3xl;
        }
      }
    }
  }
</style>
