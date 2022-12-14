<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { debounce } from "../helpers";
  import { clickOutside } from "../use";
  import Button, { ButtonVariant } from "./Button.svelte";
  export enum OverlayPosition {
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

  export let position: OverlayPosition = OverlayPosition.Bottom;
  export let css: string = "";

  let opened: boolean = false;
  let render: boolean = false;

  const pxSpaceOrigin = 8;
  const pxSpaceScreen = 8;
  const pxMinW = 256;
  const pxMaxW = 480;
  const pxMaxH = 256;

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
    if (!refMenu || !open) return;
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
    switch (position) {
      case OverlayPosition.Top: {
        break;
      }
      case OverlayPosition.Bottom: {
        const maxAvail = window.innerHeight - rect.bottom - pxSpaceOrigin - pxSpaceScreen;
        const height = Math.min(maxAvail, pxMaxH) + "px";
        refMenu.style.maxHeight = height;
        //(refMenu.childNodes[0] as HTMLElement).style.height = height;
        break;
      }
      case OverlayPosition.Left: {
        const width = `min(calc(${window.innerWidth - refContainer.clientLeft + refContainer.clientWidth}px - ${pxSpaceOrigin + pxSpaceScreen}rem), ${maxWidth}rem)`;
          refMenu.style.maxWidth = width;
          (refMenu.childNodes[0] as HTMLElement).style.width = width;
        break;
      }
      case OverlayPosition.Right: {
        const width = `min(calc(${window.innerWidth - refContainer.clientLeft + refContainer.clientWidth}px - ${pxSpaceOrigin + pxSpaceScreen}rem), ${maxWidth}rem)`;
        refMenu.style.maxWidth = width;
        (refMenu.childNodes[0] as HTMLElement).style.width = width;
        break;
      }
    }
  }

  function calcPosition() {
    if (!refContainer || !refMenu) return;
    const rect = refContainer.getBoundingClientRect();
    switch (position) {
      case OverlayPosition.Top:
        break;
      case OverlayPosition.Bottom:
        refMenu.style.top = (rect.bottom + pxSpaceOrigin) + "px";
        let width = Math.min(Math.max(rect.width, pxMinW), pxMaxW);
        refMenu.style.width = width + "px";
        const widthAvail = window.innerWidth - rect.left - pxSpaceScreen;
        console.log({ width, widthAvail });
        if (rect.left + width < widthAvail) {
          refMenu.style.left = rect.left + "px";
          console.log("left", rect.left);
        } else {
          refMenu.style.left = (rect.right - width) + "px";
          console.log("right", rect.right);
        }
        break;
      case OverlayPosition.Left:
        refMenu.style.top = `${rect.top}px`;
        refMenu.style.right = `calc(${window.innerWidth - rect.left}px + ${pxSpaceOrigin}rem)`;
        //refMenu.style.width = `${maxWidth}rem`;
        break;
      case OverlayPosition.Right:
        refMenu.style.top = `${rect.top}px`;
        refMenu.style.left = `calc(${rect.right}px + ${pxSpaceOrigin}rem)`;
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
    class:open
    use:clickOutside={close}
  >
    <slot name="item" />
    <menu class="overlay-{position}" bind:this={refMenu}>
      <main>
        {#if render}
          <slot name="menu" />
        {/if}
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
