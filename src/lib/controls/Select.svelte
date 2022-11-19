<script lang="ts">
  // IMPORT
  import Button, { ButtonVariant } from "$lib/controls/Button.svelte";
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher } from "svelte";
  // TYPE
  type T = $$Generic;
  interface $$Slots {
    selected: {
      item: T;
      index: number;
    };
    item: {
      item: T;
      index: number;
    };
  }
  interface $$Events {
    change: CustomEvent<{
      item: T;
      index: number;
    }>;
  }
  // PROPS
  export let items: T[] = [];
  export let value: T | undefined;
  export let valueUndefined: string = "Nothing selected";
  export let index: number = -1;
  export let opened: boolean = false;
  // EVENTS
  const dispatch = createEventDispatcher<{
    change: { item: T; index: number };
  }>();
  // HOOKS
  // FUNCTIONS
  function select(item: T, _index: number) {
    value = item;
    index = _index;
    dispatch("change", { item, index });
    opened = false;
  }
</script>

<template>
  <div class="select">
    <Button
      active={opened}
      variant={ButtonVariant.Secondary}
      on:click={() => (opened = !opened)}
    >
      {#if value}
        <slot name="selected" item={value} {index} />
      {:else}
        <p class="text secondary">{valueUndefined}</p>
      {/if}
      <Icon name={Icons.SelectDown} />
    </Button>
    <menu class:open={opened}>
      <div>
        <div>
          {#each items as item, index}
            <Button
              variant={ButtonVariant.Transparent}
              active={item == value}
              on:click={() => select(item, index)}
            >
              <slot name="item" {item} {index} />
              <Icon name={Icons.SelectSelected} />
            </Button>
          {/each}
        </div>
      </div>
    </menu>
  </div>
</template>

<style global lang="postcss">
  .select {
    @apply flex flex-col;

    & > .button {
      &.active {
        @apply z-50;
      }

      & > .text:not(.secondary) {
        @apply text-grayText-pri dark:text-grayTextDark-pri;
      }

      & > .icon {
        &:last-child {
          @apply indent-2 border-l;
        }
      }
    }
    & > menu {
      @apply h-0 relative;

      & > div {
        @apply max-h-0 overflow-hidden;
        transition: max-height 0.3s ease-in-out;
        will-change: max-height;

        & > div {
          @apply overflow-hidden
                    py-2 border shadow rounded
                    border-gray-300 bg-gray-50
                    dark:border-gray-700 dark:bg-gray-800;

          & .button {
            @apply justify-start w-full
                rounded-none border-none;
            @apply shadow-none ring-0 ring-offset-0 !important;

            & > .text:not(.secondary) {
              @apply text-grayText-pri dark:text-grayTextDark-pri;
            }

            & > .icon:last-child {
              @apply hidden;
            }

            &.active {
              & > .icon:last-child {
                @apply block;
              }
            }
          }
        }
      }
      &.open > div {
        @apply max-h-96 p-[4px] m-[-4px] mt-[-2.5px];
      }
    }
  }
</style>
