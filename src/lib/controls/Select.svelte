<script lang="ts">
  // IMPORT
  import Button, { ButtonVariant } from "$lib/controls/Button.svelte";
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher } from "svelte";
  import { clickOutside } from "../use";
  import TextInput from "./TextInput.svelte";
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
  export let enableSearch: boolean = false;
  // REFS
  let refContainer: HTMLDivElement | undefined;
  // DATA
  let styleMenu = "";
  let search = "";
  // EVENTS
  const dispatch = createEventDispatcher<{
    change: { item: T; index: number };
  }>();
  // HOOKS
  // FUNCTIONS
  function toggleOpened() {
    opened = !opened;
    if (opened) updateStyle();
  }
  function onClickOutside() {
    if (opened) opened = false;
  }
  function select(item: T, _index: number) {
    value = item;
    index = _index;
    dispatch("change", { item, index });
    opened = false;
  }
  function updateStyle() {
    if (!refContainer) return;
    const rect = refContainer.getBoundingClientRect();
    styleMenu = `
      top: ${rect.bottom + 2}px;
      width: ${rect.width}px;
    `;
  }
</script>

<template>
  <div
    class="select"
    bind:this={refContainer}
    use:clickOutside={() => (opened = false)}
  >
    <Button
      active={opened}
      variant={ButtonVariant.Secondary}
      on:click={toggleOpened}
    >
      {#if value}
        <slot name="selected" item={value} {index} />
      {:else}
        <p class="text secondary">{valueUndefined}</p>
      {/if}
      <Icon name={Icons.SelectDown} />
    </Button>
    <menu style={styleMenu} class:open={opened}>
      {#if enableSearch}
        <header>
          <TextInput bind:value={search} placeholder="Search" />
        </header>
      {/if}
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
      @apply fixed z-40
      flex flex-col
      max-h-0 overflow-hidden
      shadow rounded
      border-gray-300 bg-gray-50
      dark:border-gray-700 dark:bg-gray-800;
      transition: max-height 0.3s ease-in-out;
      will-change: max-height;

      & > * {
        @apply border border-inherit overflow-hidden;
        &:first-child {
          @apply rounded-t;
        }
        &:not(:first-child) {
          @apply mt-[-1px];
        }
        &:last-child {
          @apply rounded-b;
        }
      }

      & > header {
        @apply p-2 flex-shrink-0;
      }

      & > div {
        @apply flex-1 py-2 overflow-y-auto;
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
      &.open {
        @apply max-h-96 overflow-visible;
      }
    }
  }
</style>
