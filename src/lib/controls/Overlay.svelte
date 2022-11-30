<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { debounce } from "../helpers";
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

  export let css: string = "";
  export let opened: boolean = false;
  export let render: boolean = false;
  export let orientation: OverlayOrientation = OverlayOrientation.Bottom;

  const spaceFromOrigin = .5;
  const spaceFromScreen = .5;
  const maxWidth = 20;
  const maxHeight = 20;

  let refContainer: HTMLElement | undefined;
  let refMenu: HTMLElement | undefined;

  const dispatch = createEventDispatcher<$$Events>();
  const debouncedCalcPosition = debounce(calcPosition, 100);

  onMount(() => {
    debouncedCalcPosition();
  });

  export function toggleOpened() {
    opened ? close() : open();
  }

  export function close() {
    if (!refMenu || !opened) return;
    opened = false;
    refMenu.style.removeProperty("max-height");
    refMenu.style.removeProperty("max-width");
    dispatch("close");
  }

  export function open() {
    if (!refMenu || opened) return;
    // first view is lazy, items stay rendered afterwards
    if (!render) {
      render = true;
      setTimeout(open, 0);
      return;
    }
    opened = true;
    updateSize();
    dispatch("open");
  }

  function updateSize() {
    if (!refContainer || !refMenu) return;
    const rect = refContainer.getBoundingClientRect();
    switch (orientation) {
      case OverlayOrientation.Top:
        break;
      case OverlayOrientation.Bottom:
        const height = `min(calc(${
          window.innerHeight - rect.bottom
        }px - ${spaceFromOrigin + spaceFromScreen}rem), ${maxHeight}rem)`;
        refMenu.style.maxHeight = height;
        (refMenu.childNodes[0] as HTMLElement).style.height = height;
        break;
      case OverlayOrientation.Left:
        break;
      case OverlayOrientation.Right:
        const width = `min(calc(${window.innerWidth - refContainer.clientLeft + refContainer.clientWidth}px - ${spaceFromOrigin + spaceFromScreen}rem), ${maxWidth}rem)`;
        refMenu.style.maxWidth = width;
        (refMenu.childNodes[0] as HTMLElement).style.width = width;
        break;
    }
  }

  function calcPosition() {
    if (!refContainer || !refMenu) return;
    const rect = refContainer.getBoundingClientRect();
    switch (orientation) {
      case OverlayOrientation.Top:
        break;
      case OverlayOrientation.Bottom:
        refMenu.style.top = `calc(${rect.bottom}px + ${spaceFromOrigin}rem)`;
        refMenu.style.left = `${refContainer.getClientRects().item(0)?.left}px`;
        refMenu.style.width = `${refContainer.clientWidth}px`;
        break;
      case OverlayOrientation.Left:
        break;
      case OverlayOrientation.Right:
        refMenu.style.top = `${rect.top}px`;
        refMenu.style.left = `calc(${rect.right}px + ${spaceFromOrigin}rem)`;
        //refMenu.style.width = `${maxWidth}rem`;
        break;
    }
  }
</script>

<svelte:window on:resize={debouncedCalcPosition} />

<template>
  <div
    bind:this={refContainer}
    class="overlay {css}"
    class:opened
    use:clickOutside={close}
  >
    <slot name="item" />
    <menu class="overlay-{orientation}" bind:this={refMenu} class:render>
      <main>
        <slot name="menu" />
      </main>
    </menu>
  </div>
</template>

<style global lang="postcss">
  .overlay {
    & > .active {
      @apply relative z-50;
    }
    & > menu {
      @apply fixed z-40 overflow-hidden
      flex justify-items-stretch items-stretch
      shadow rounded;
      transition-timing-function: linear;
      transition-duration: 0.2s;
      transition-property: max-height, max-width;
      will-change: max-height, max-width;
      &:not(.render) > main {
        @apply hidden;
      }
      & > main {
        @apply flex flex-col w-full rounded overflow-hidden
        border border-gray-300 bg-gray-50
      dark:border-gray-700 dark:bg-gray-800;
      }
      &.overlay-top,
      &.overlay-bottom {
        @apply max-h-0;
      }
      &.overlay-left,
      &.overlay-right {
        @apply max-w-0;
      }
    }
  }
</style>
