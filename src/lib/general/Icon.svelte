<script lang="ts" context="module">
  export enum Icons {
    Home = "home-line",
    Settings = "settings-2-line",
    Menu = "menu-2-line",
    FullScreen = "fullscreen-line",
    SelectDown = "arrow-drop-down-line",
    SelectSelected = "check-line",
  }
</script>

<script lang="ts">
  export let name: Icons = Icons.Home;
  export let css: string = "";
  export let large: boolean = false;
</script>

<template>
  <i class="icon ri-{name} {css}" class:large />
</template>

<style global lang="postcss">
  .icon {
    @apply block text-[24px] leading-none;
    &.large {
      @apply text-[36px];
    }
  }
</style>
