<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { clickOutside } from "../use";
    import Button, { ButtonVariant } from "./Button.svelte";
    export enum OverlayOrientation {
      Top = "top",
      Bottom = "bottom",
      Left = "left",
      Right = "right",
    }
</script>

<script lang="ts">

  interface $$Slots {
    item: {};
    menu: {};
  }
  interface $$Events {
    open: {};
    close: {};
  }

  export let css: string  = "";
  export let opened: boolean  = false;
  export let orientation: OverlayOrientation  = OverlayOrientation.Bottom;

  let refContainer: HTMLElement | undefined;
  let refMenu: HTMLElement | undefined;

  const dispatch = createEventDispatcher<$$Events>();

  export function toggleOpened() {
    opened ? close() : open();
  }

  export function close() {
    if (!refMenu || !opened) return;
    opened = false;
    refMenu.style.removeProperty("max-height");
    dispatch("close");
  }

  export function open() {
    if (!refMenu || opened) return;
    opened = true;
    updateStyle();
    dispatch("open");
  }

  function updateStyle() {
    if (!refContainer || !refMenu) return;
    const spaceFromOrigin = 2;
    const spaceFromScreen = 8;
    const rect = refContainer.getBoundingClientRect();
    switch (orientation) {
      case OverlayOrientation.Top:
        break;
      case OverlayOrientation.Bottom:
        refMenu.style.top = `${rect.bottom + spaceFromOrigin}px`;
        refMenu.style.left = `${rect.left}px`;
        refMenu.style.width = `${rect.width}px`;
        refMenu.style.maxHeight = `${window.innerHeight - rect.bottom - spaceFromScreen}px`;
        break;
      case OverlayOrientation.Left:
        break;
      case OverlayOrientation.Right:
        break;
    }
  }

</script>

<template>
  <div bind:this={refContainer} class="overlay {css}" class:opened use:clickOutside={close}>
    <slot name="item"></slot>
    <menu class="overlay-{orientation}" bind:this={refMenu}>
      <slot name="menu"></slot>
    </menu>
  </div>
</template>

<style global lang="postcss">
  .overlay {
    @apply flex flex-col;
    & > * {
      @apply flex-shrink-0 flex-grow-0;
    }
    & > *:not(menu) {
    }
    & > menu {
      @apply fixed z-40
      flex flex-col
      max-h-0 overflow-hidden
      shadow rounded
      border-gray-300 bg-gray-50
      dark:border-gray-700 dark:bg-gray-800;
      transition: max-height .2s linear;
      will-change: max-height;
      &.overlay-top,
      &.overlay-bottom {
        @apply max-h-0;
      }
      &.overlay-left,
      &.overlay-right {
        @apply max-w-0;
      }
      &.overlay-top {
        @apply flex flex-col-reverse;
      }
      &.overlay-bottom {
        @apply flex flex-col;
      }
      &.overlay-left {
        @apply flex flex-row;
      }
      &.overlay-right {
        @apply flex flex-row;
      }
    }

    &.opened > menu {
      &.overlay-top,
      &.overlay-bottom {
        @apply max-h-96;
      }
      &.overlay-left,
      &.overlay-right {
        @apply max-w-[96];
      }
    }
  }
</style>
