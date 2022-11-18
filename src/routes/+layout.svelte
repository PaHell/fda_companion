<script lang="ts" context="module">
  // import css bootstrap
  import "../app.postcss";
  // other imports
    import type { App } from "$src/app";
    import Button from "$src/lib/controls/Button.svelte";
    import { Icons } from "$src/lib/general/Icon.svelte";
import Header from "$src/lib/Header.svelte";
import { goto, beforeNavigate } from '$app/navigation';
    import { onMount } from "svelte";
    import { browser, dev, prerendering } from '$app/environment';
</script>

<script lang="ts">
  const navItems : App.General.NavItem[] = [
    {
      title: "Home",
      icon: Icons.Home,
      path: "/",
    },
    {
      title: "Home",
      icon: Icons.Home,
      path: "/",
    },
    {
      title: "Home",
      icon: Icons.Home,
      path: "/",
    },
  ]

  let currentPath = "";

  onMount(() => {
    currentPath = window.location.pathname;
  });

  beforeNavigate((from, to, cancel) => {
    currentPath = to;
    console.log({from, to, cancel});
  });
</script>

<template>
    <Header/>
    <div id="content">
      <nav>
        {#each navItems as item}
          <Button text={item.title} icon={item.icon} on:click={() => goto(item.path)} active={currentPath === item.path} />
        {/each}
      </nav>
      <main>
        <slot />
      </main>
    </div>
</template>

<style global lang="postcss">
  #content {
    @apply flex-1 flex;

    & > nav {
      @apply w-72 border-r
      border-gray-300 dark:border-gray-700;
    }

    & > main {
      @apply flex-1 p-2;

      & > *:not(:last-child) {
        @apply mb-2;
      }
    }
  }
</style>
