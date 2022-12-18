<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  export enum ButtonVariant {
    Primary = "button-pri",
    Secondary = "button-sec",
    Transparent = "button-trans",
  }
  export enum ButtonAlignment {
    Left = "button-left",
    Center = "button-center",
    Right = "button-right",
  }
</script>

<script lang="ts">
    import { _ } from "svelte-i18n";

  export let text: string | undefined = undefined;
  export let icon: Icons | undefined = undefined;
  export let variant: ButtonVariant = ButtonVariant.Secondary;
  export let disabled: boolean = false;
  export let active: boolean = false;
  export let css: string = "";
  export let disableTabIndex: boolean = false;
  export let align: ButtonAlignment = ButtonAlignment.Left;
</script>

<template>
  <button
    on:click
    type="button"
    {disabled}
    class:active
    class="button {variant} {align} {css}"
    tabindex={(disabled || disableTabIndex) ? -1 : 0}
  >
    {#if icon}
      <Icon name={icon} />
    {/if}
    {#if text}
      <p class="text">{$_(text)}</p>
    {/if}
    <slot />
  </button>
</template>

<style global lang="postcss">
  .button {
    @apply flex items-center justify-start flex-shrink-0
        h-10 px-3 border rounded font-medium
        select-none outline-0
		transition-all;

    &:focus {
      @apply relative;
    }

    & * {
      @apply border-inherit text-inherit transition-colors;
    }
    & > *:not(:last-child) {
      @apply mr-1;
    }
    & > .icon {
      &:first-child:last-child {
        @apply -mx-1;
      }
    }
    & > .text {
      @apply mb-[.5px] font-medium
			overflow-ellipsis whitespace-nowrap overflow-hidden
			text-left;
    }

    &.button-center {
      @apply justify-center;
    }
    &.button-right {
      @apply flex-row-reverse;
      & > * {
        &:not(:last-child) {
          @apply mr-0 ml-1;
        }
      }
      & > .text {
        @apply text-right;
      }
      & > .icon {
      }
    }

    &.active {
      @apply relative;
    }

    /* CLICK/FOCUS RING */

    &:not(.button-trans):focus {
      @apply ring-2 ring-accent-500
			ring-offset-2 ring-offset-gray-100
			dark:ring-offset-gray-900;
    }

    /* VARIANTS */

    &.button-sec,
    &.button-trans {
      & > .text {
        @apply text-grayText-sec dark:text-grayTextDark-sec;
      }
      & > .icon {
        @apply text-grayIcon-sec dark:text-grayIconDark-sec;
      }
      &:hover,
      &:focus,
      &:active {
        & > .text {
          @apply text-grayText-pri dark:text-grayTextDark-pri;
        }
        & > .icon {
          @apply text-grayIcon-pri dark:text-grayIconDark-pri;
        }
      }

      &.active {
        & > .text {
          @apply text-accent-600 dark:text-accent-400;
        }
        & > .icon {
          @apply text-accent-500 dark:text-accent-500;
        }
      }
    }

    &.button-pri {
      @apply bg-accent-400 border-accent-500
      dark:bg-accent-600 dark:border-accent-500;
      & > * {
        @apply text-white dark:text-white;
      }
      &:hover {
        @apply bg-accent-500 border-accent-600 dark:bg-accent-500 dark:border-accent-400;
      }
      &:active {
        @apply bg-accent-600 border-accent-600 dark:bg-accent-400 dark:border-accent-400;
      }
    }

    &.button-sec {
      @apply shadow-sm
			bg-gray-50 border-gray-300
			dark:bg-gray-800 dark:border-gray-700;
      &:hover {
        @apply shadow bg-white dark:bg-gray-700;
      }
      &:focus {
        @apply shadow-inner ring-2 ring-accent-500
			ring-offset-2 ring-offset-gray-100
			dark:ring-offset-gray-900;
      }
      &:active {
        @apply shadow-inner bg-gray-100 dark:bg-gray-800;
      }
    }

    &.button-trans {
      @apply bg-transparent border-transparent shadow-none;
      &:hover,
      &:focus {
        @apply bg-gray-200 border-gray-100
	  dark:bg-gray-700 dark:border-gray-800;
      }
      &:focus {
        @apply ring-2 ring-accent-500
			ring-offset-2 ring-offset-gray-100
			dark:ring-offset-gray-900;
      }
      &:active {
        @apply bg-gray-300 dark:bg-gray-800;
      }
    }

    /* DISABLED */

    &:disabled {
      @apply pointer-events-none;
      @apply shadow-none
			bg-gray-200 border-gray-300
			dark:bg-gray-900 dark:border-gray-900 !important;
      & > .text {
        @apply text-grayText-tri dark:text-grayTextDark-tri !important;
      }
      & > .icon {
        @apply text-grayIcon-tri dark:text-grayIconDark-tri !important;
      }
    }
  }
</style>
