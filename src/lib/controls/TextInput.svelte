<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher, onMount } from "svelte";
</script>

<script lang="ts">
  // TYPE
  interface $$Events {
    change: typeof value;
  }
  // PROPS
  export let value: string | number | undefined = undefined;
  export let placeholder: string;
  export let icon: Icons | undefined = undefined;
  export let label: string | undefined = undefined;
  export let disabled: boolean = false;
  export let type: string = "text";
  export let alignRight: boolean = false;
  export let disableTabIndex: boolean = false;
  export let autofocus: boolean = false;
  export function focus() {
    ref?.focus();
  }
  // DATA
  let ref: HTMLInputElement | undefined;
  type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };
  const dispatch = createEventDispatcher<$$Events>();
  // LIFECYCLE

  onMount(() => {
    if (autofocus) focus();
  });

  // USE
  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
  // FUNCTIONS
  function onInput(event: InputEvent) {
    console.log(event.currentTarget);
    dispatch("change", event.currentTarget.value);
  }

  function onFocus(event: InputEvent) {
    console.log(event.currentTarget);
  }
</script>

<template>
  {#if label}
    <p class="text label">{label}</p>
  {/if}
  <div
    class="input input-{type}"
    class:right={alignRight}
    class:has-icon={!!icon}
  >
    <input
      bind:this={ref}
      bind:value
      use:typeAction
      placeholder=""
      {disabled}
      on:input={onInput}
      on:focus={onFocus}
      tabindex={disabled || disableTabIndex ? -1 : 0}
    />
    <div>
      {#if icon}
        <Icon name={icon} />
      {/if}
      <p class="text placeholder" class:opacity-0={value?.toString().length}>
        {placeholder}
      </p>
    </div>
  </div>
</template>

<style global lang="postcss">
  .input {
    @apply flex flex-col flex-shrink-0
        h-10;

    /* layout, div overlays input exactly
         * and <input/> is before the styled content -> input:focus + *
        */
    & > input,
    & > div {
      @apply h-10;
    }
    & > div {
      @apply -mt-10 pointer-events-none;
      & > *:not(.icon):not(.placeholder) {
        @apply pointer-events-auto;
      }
    }

    & > input {
      @apply px-4
            border outline-0
            shadow-sm rounded
            font-medium select-none
		text-grayText-pri dark:text-grayTextDark-pri	
		caret-accent-500 dark:caret-accent-400
            transition-all
            bg-gray-50 border-gray-300
            dark:bg-gray-800 dark:border-gray-700;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        @apply appearance-none;
      }
      &:hover {
        @apply shadow bg-white border-gray-300
            dark:bg-gray-700 dark:border-gray-700;
      }
      &:focus {
        @apply bg-white dark:bg-gray-800
	  	shadow ring-2 ring-accent-500
		ring-offset-2 ring-offset-gray-100
		dark:ring-offset-gray-900;
      }
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

    & > input:focus + div {
      & > .icon {
        @apply text-accent-500;
      }
    }

    & > div {
      @apply flex items-center px-2;
      & > .icon {
        @apply pl-1
	  text-grayIcon-sec dark:text-grayIconDark-sec;
      }
      & > .text {
        @apply flex-1 px-2 mb-[.5px] font-medium
				overflow-ellipsis whitespace-nowrap overflow-hidden
				text-left;

        &:last-child:not(:first-child) {
          @apply pr-3;
        }

        &.placeholder {
          @apply text-grayText-tri dark:text-grayTextDark-tri
                    transition-opacity indent-px;
        }
      }
    }

    &.right {
      & > input,
      & > div > .placeholder {
        @apply text-right;
      }
    }
    &.has-icon {
      & > input {
        padding-left: calc(24px + 1.25rem);
      }
    }
  }
</style>
