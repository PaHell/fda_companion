<script lang="ts" context="module">
  import type { App } from "$src/app";
  import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
  import { Icons } from "$src/lib/general/Icon.svelte";
  import { goto, afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
import { mobile } from "$lib/controls/view_size/store";
import { screenLock } from "$lib/controls/screen_lock/store";
import ScreenLock from "$src/lib/controls/screen_lock/ScreenLock.svelte";
</script>

<script lang="ts">

  let navCollapsed = false;
  let currentPath: string | undefined;
  const navItems: App.General.NavItem[] = [
    {
      title: "routes.app.customers.create.title",
      icon: Icons.CreateCustomer,
      path: "/app/customers/create",
    },
    {
      title: "routes.app.customers.all.title",
      icon: Icons.Customer,
      path: "/app/customers/all",
    },
    {
      title: "routes.app.product_types.title",
      icon: Icons.ProductType,
      path: "/app/product_types",
    },
    {
      title: "routes.app.settings.title",
      icon: Icons.Settings,
      path: "/app/settings",
    },
  ];

  onMount(() => {
    currentPath = window.location.pathname;
    navCollapsed = $mobile;
  });

  afterNavigate(({ to }) => {
    currentPath = to?.url?.pathname;
  });

  function navigate(path: string) {
    if ($mobile) navCollapsed = true;
    goto(path);
  }
</script>

<template>
    <div id="main-layout" class:fullscreen={$screenLock.locked}>
      <header>
        <Button icon={Icons.NavbarCollapsed} on:click={() => navCollapsed = !navCollapsed} css={navCollapsed ? "collapsed" : ""} />
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
              on:click={() => navigate(item.path)}
              active={currentPath === item.path}
              />
          {/each}
        </nav>
        <main>
          <slot />
        </main>
      </div>
    </div>
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
        & > .button {
          & > .icon {
            @apply transition-all;
          }
          &.collapsed > .icon {
            transform: rotateY(180deg);
          }
        }
        & > main {
          @apply flex justify-center items-center;
        }
    }

    & > #content {
      @apply flex-1 flex;

      & > nav {
        @apply w-[18rem] py-2 border-r overflow-hidden
        border-gray-300 dark:border-gray-800
        bg-gray-100 dark:bg-gray-900
        transition-[width];
        /* fixed nav bar on mobile */

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
            @apply h-12;
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

  .mobile #main-layout {
    & > #content {
      & > nav {
        @apply fixed top-14 left-0;
        height: calc(100vh - 3.5rem);
      }
      &.collapsed {
        & > nav {
          @apply w-0 border-0;
        }
        & > main {
        }
      }
    }
  }
</style>
