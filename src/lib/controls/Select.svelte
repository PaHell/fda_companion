<script lang="ts">
  // IMPORT
  import Button, { ButtonVariant } from "$lib/controls/Button.svelte";
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher, onMount, SvelteComponent } from "svelte";
  import { debounce, searchByKeys } from "../helpers";
  import { clickOutside } from "../use";
  import Overlay, { OverlayOrientation } from "./Overlay.svelte";
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
    change: {
      item: T;
      index: number;
    };
  }
  // PROPS
  export let items: T[] = [];
  export let value: T | undefined = undefined;
  export let valueUndefined: string = "Nothing selected";
  export let index: number = -1;
  export let enableSearch: boolean = false;
  export let searchPlaceholder: string = "Search";
  export let searchKeysOrdered: (keyof T)[] = [];
  export let searchDebounce: number = 75;
  // REFS
  let refOverlay: SvelteComponent | undefined;
  let refSearch: SvelteComponent | undefined;
  // DATA
  let opened: boolean = false;
  const debouncedSearch = debounce((evt: CustomEvent<string>) => {
    searchItems = searchByKeys(evt.detail, items, searchKeysOrdered);
  }, searchDebounce);
  let searchItems: T[] = [];
  let searchValue: string = "";
  // EVENTS
  const dispatch = createEventDispatcher<$$Events>();
  // LIFECYCLE
  // FUNCTIONS
  function select(item: T, _index: number) {
    if (!refOverlay) return;
    value = item;
    index = _index;
    dispatch("change", { item, index });
    refOverlay.toggleOpened();
  }

  function selectFirst() {
    if (searchItems.length == 0) return;
    select(searchItems[0], 0);
  }
</script>

<template>
  <Overlay
    bind:this={refOverlay}
    bind:opened
    orientation={OverlayOrientation.Bottom}
    css="select"
    on:open={refSearch?.focus}
  >
    <svelte:fragment slot="item">
      <Button
        active={opened}
        variant={ButtonVariant.Secondary}
        on:click={refOverlay.toggleOpened}
      >
        {#if value}
          <slot name="selected" item={value} {index} />
        {:else}
          <p class="text secondary">{valueUndefined}</p>
        {/if}
        <Icon name={Icons.SelectDown} />
      </Button>
    </svelte:fragment>
    <svelte:fragment slot="menu">
      {#if enableSearch}
        <header>
          <TextInput
            bind:this={refSearch}
            bind:value={searchValue}
            placeholder={searchPlaceholder}
            disableTabIndex={!opened}
            on:change={debouncedSearch}
            on:enter={selectFirst}
          />
        </header>
      {/if}
      <div>
        {#each searchValue ? searchItems : items as item, index}
          <Button
            variant={ButtonVariant.Transparent}
            active={item == value}
            disableTabIndex={!opened}
            on:click={() => select(item, index)}
          >
            <slot name="item" {item} {index} />
            <Icon name={Icons.SelectSelected} />
          </Button>
        {/each}
      </div></svelte:fragment
    >
  </Overlay>
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
    & > menu > main {
      @apply border-inherit;

      & > * {
        @apply border border-inherit;
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
        @apply flex-shrink-0 p-2;
      }

      & > div {
        @apply flex-1 py-2 overflow-y-auto overflow-x-hidden;
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
  }
</style>
