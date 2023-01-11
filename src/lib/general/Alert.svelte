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
    {#if title}
      <p class="text">{$_(title)}</p>
    {/if}
    <div>
      {#if text}
        <p class="text">{$_(text)}</p>
      {/if}
      <slot/>
    </div>
  </div>
</template>

<style global lang="postcss">
  .alert {
    @apply flex items-start justify-center flex-shrink-0
        p-2 border rounded
        border-gray-300 bg-gray-100
        dark:border-gray-700 dark:bg-gray-900
		transition-all;

    & > * {
      @apply scale-0 opacity-50 origin-left; 
      animation: alert 0.4s ease-in-out forwards;
      &:not(:last-child) {
        @apply mr-1;
      }
    }

    & > .icon {
      &:first-child {
        @apply text-inherit;
      }
    }

    & > .text {
      @apply mb-[.5px]
			overflow-ellipsis whitespace-nowrap overflow-hidden
			text-left text-inherit font-medium;

      &:first-child {
        @apply pl-1;
      }
      &:not(:last-child) {
      }
    }

    & > div {
      @apply flex-1 mb-[.5px];

      &:first-child {
        @apply pl-1;
      }
    }

    &.alert-transparent {
      @apply bg-transparent border-transparent
          dark:bg-transparent dark:border-transparent;
    }

    &.alert-small {
      @apply py-1 border-0;
      & > .icon {
        @apply text-[18px];
      }
      & > .text,
      & > div > .text {
        @apply text-xs;
      }
    }

    &.alert-danger {
      @apply border-danger-light
          dark:border-danger-dark;
      & > *:first-child {
        @apply text-danger-light dark:text-danger-dark;
      }
    }
    &.alert-success {
      @apply border-success-light
          dark:border-success-dark;
      & > *:first-child {
        @apply text-success-light dark:text-success-dark;
      }
    }
  }

  @keyframes alert {
    to {
      @apply scale-100 opacity-100;
    }
  }
</style>
