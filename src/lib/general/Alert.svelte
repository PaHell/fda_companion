<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
    import { _ } from "svelte-i18n";
  export enum AlertVariant {
    Success = "success",
    Warning = "warning",
    Danger = "danger",
  }
</script>

<script lang="ts">
  export let title: string | undefined = undefined;
  export let text: string | undefined = undefined;
  export let icon: Icons | undefined = undefined;
  export let variant: AlertVariant = AlertVariant.Success;
  export let transparent: boolean = false;
  export let small: boolean = false;
  export let css: string = "";
</script>

<template>
  <div class="alert alert-{variant} {css}" class:alert-transparent={transparent} class:alert-small={small}>
    {#if icon}
    <Icon name={icon} />
    {/if}
    {#if text || title}
    <p class="text">
      <span class="title">{title ? $_(title) : ""}</span>
      <span>{text ? $_(text) : ""}</span>
    </p>
    {/if}
    <slot/>
  </div>
</template>

<style global lang="postcss">
  .alert {
    @apply flex items-center justify-center flex-shrink-0
        p-2 border rounded
        border-gray-300 bg-gray-100
        dark:border-gray-800 dark:bg-transparent
		transition-all;

    & > .icon {
      &:first-child:not(:last-child) {
        @apply ml-1 text-inherit;
      }
    }
    & > .text {
      @apply flex-1 px-2 mb-[.5px] font-medium
			overflow-ellipsis whitespace-nowrap overflow-hidden
			text-left text-inherit;

      & > span {
        &.title {
          @apply font-bold mr-1;
        }
        &:not(.title) {
          @apply text-grayText-pri dark:text-grayTextDark-pri;
        }
      }

      &:first-child:last-child {
        @apply pl-1;
      }
      &:last-child:not(:first-child) {
        @apply pr-3;
      }
    }

    &.alert-transparent {
      @apply bg-transparent border-transparent
          dark:bg-transparent dark:border-transparent;
    }

    &.alert-small {
      @apply py-1;
      & > .icon {
        @apply text-[18px];
      }
      & > .text {
        @apply text-xs;
      }
    }

    &.alert-danger {
      @apply text-danger-light dark:text-danger-dark;
    }

  }
</style>
