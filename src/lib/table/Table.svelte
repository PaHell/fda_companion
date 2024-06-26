<script lang="ts">
  import { onDestroy, onMount, setContext, SvelteComponent } from "svelte";
  import Column from "./Column.svelte";
  import type { App } from "$src/app";
  import Row, { classes, RowState, translations } from "./Row.svelte";
  import { writable, type Writable } from "svelte/store";
  import Button, { ButtonVariant } from "../controls/Button.svelte";
  import Icon, { Icons } from "../general/Icon.svelte";
  import { _ } from "svelte-i18n";

  type T = $$Generic<App.Models.DatabaseElement>;
  interface $$Slots {
    default: {
      ctx: App.General.RowContext<T>;
    };
  }
  export let items: T[] = [];
  export let css: string = "";
  let columns: App.General.Column<T>[] = [];
  let activeColumn: App.General.Column<T> | null = null;
  let columnSortedAsc: boolean = false;
  let contexts: App.General.RowContext<T>[] = [];
  let counters: [RowState, number][] = [];
  setContext<App.General.TableContext<T>>("table", {
    registerColumn,
    getRowContext,
  });

  onMount(() => {
    // handle no items and thead columns
    if (items.length === 0) {
      addItem();
      setTimeout(() => {
        items = [];
      });
    }
    // sort by first column
    if (columns.length) {
      sortByColumn(columns[0]);
    }
  });

  function addItem() {
    const item = {} as T;
    items.push(item);
    contexts.push({
      item,
      index: items.length - 1,
      state: RowState.Added,
      initialState: RowState.Added,
      changed: () => {
        onRowChanged(contexts[items.length - 1], RowState.Added);
      },
    });
    items = items;
    onRowChanged(contexts[items.length - 1], RowState.Added);
  }

  function sortByColumn(column: App.General.Column<T>) {
    // toggle order or set column
    if (!column.sortKey) return;
    const key = column.sortKey;
    if (activeColumn === column) columnSortedAsc = !columnSortedAsc;
    else {
      activeColumn = column;
      columnSortedAsc = false;
    }
    // sort items
    items = items.sort((a, b) => {
      let score = 0;
      const _a = String(a[key]);
      const _b = String(b[key]);
      if (_a < _b) score = -1;
      else if (_a > _b) score = 1;
      return score * (columnSortedAsc ? 1 : -1);
    });
    // update row indexes
    items.forEach((item, index) => {
      const ctx = contexts.find((ctx) => ctx.item.id === item.id);
      if (ctx) ctx.index = index;
    });
  }

  function saveChanges() {
    console.warn("Save Changes", JSON.stringify(items));
  }

  function onRowChanged(context: App.General.RowContext<T>, state: RowState) {
    console.log("Table Changed", {item: context.item});
    context.state = state;
    if (state != RowState.Deleted) {
      context.initialState = state;
    }
    counters = Object.values(RowState)
      .filter((state) => state !== RowState.Unmodified)
      .map((state) => {
        const count = contexts.filter((ctx) => ctx.state === state).length;
        return [state, count] as [RowState, number];
      });
  }

  function registerColumn(
    title: string,
    width: string,
    css: string,
    sortKey: keyof T | null
  ) {
    if (columns.find(c => c.title == title)) return;
    columns.push({
      title,
      width,
      css,
      sortKey,
    } as App.General.Column<T>);
    columns = columns;
  }

  function getRowContext(item: T, changed: () => void) {
    const existing = contexts.find(ctx => ctx.item.id == item.id);
    if (existing) return existing;
    const index = items.findIndex(i => i.id == item.id);
    contexts[index] = {
      index,
      item,
      state: RowState.Unmodified,
      initialState: RowState.Unmodified,
      changed: (state: RowState = RowState.Modified) => {
        changed();
        onRowChanged(contexts[index], state);
      }
    };
    return contexts[index];
  }
</script>

<template>
  <div class="table-container {css}">
    <table class="table">
      <thead>
        <tr>
          {#each columns as col}
            <th style="width: {col.width};">
              {#if col.sortKey}
                <Button
                  variant={ButtonVariant.Secondary}
                  active={activeColumn === col}
                  on:click={() => sortByColumn(col)}
                >
                  <p class="text flex-1">{$_(col.title)}</p>
                  <Icon
                    name={activeColumn === col && columnSortedAsc
                      ? Icons.OrderByAsc
                      : Icons.OrderByDesc}
                  />
                </Button>
              {:else}
                <p class="text secondary">{$_(col.title)}</p>
              {/if}
            </th>
          {/each}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each items as item (item.id)}
          <Row {item} let:context>
            <slot ctx={context} />
          </Row>
        {/each}
      </tbody>
    </table>
    <footer>
      <Button
        icon={Icons.Add}
        text="lib.table.add"
        variant={ButtonVariant.Secondary}
        on:click={addItem}
      />
      <div class="flex-1" />
      {#each counters as [state, count]}
        {#if count > 0}
          <p class="text badge {classes[state]}">
            {count}
            {$_("lib.table.row_state." + translations[state])}
          </p>
        {/if}
      {/each}
      <Button
        icon={Icons.SaveChanges}
        text="lib.table.save"
        variant={ButtonVariant.Primary}
        on:click={saveChanges}
      />
    </footer>
  </div>
</template>

<style global lang="postcss">
  .table-container > footer {
    @apply flex space-x-2 items-center mt-2;
    & > .badge {
      @apply flex items-center text-sm font-semibold;
      &:not(:last-of-type):after {
        content: "";
        @apply block w-1 h-1 ml-2 rounded-full bg-gray-400 dark:bg-gray-600;
      }
      &.added {
        @apply text-success-light dark:text-success-dark;
      }
      &.modified {
        @apply text-warning-light dark:text-warning-dark;
      }
      &.deleted {
        @apply text-danger-light dark:text-danger-dark;
      }
    }
    & > .button {
      &:last-child {
        @apply ml-4;
      }
    }
  }
  .table {
    @apply border border-separate border-spacing-0
        w-full table-fixed rounded
        bg-gray-100 dark:bg-gray-900
        border-gray-300 dark:border-gray-700;

    & th {
      &:first-child {
        @apply rounded-tl;
      }
      &:last-child {
        @apply w-9;
      }
      & > .text {
        @apply font-semibold;
      }
    }
    & th,
    & td {
      @apply p-0 m-0 text-grayText-pri dark:text-grayTextDark-pri
            border-b box-content
            font-normal text-left text-base
            border-gray-300 dark:border-gray-700;
      height: calc(2.5rem - 2px);
      &:not(:last-child) {
        @apply border-r;
      }
      &.state {
        @apply w-6;
        & > div {
          @apply w-2 h-2 mx-auto rounded-full;
        }
      }
      & > * {
        @apply m-[-1px];
      }
      & > .input-container {
        & > .label {
          @apply hidden;
        }
        & > .input {
          & > input {
            @apply rounded-none;
          }
        }
      }
      & > .text {
        @apply px-3 whitespace-nowrap overflow-hidden text-ellipsis;
      }
      & > .button {
        @apply rounded-none;
        &:first-child:last-child {
          width: calc(100% + 2px);
        }
      }

      & > .select {
        & > .label {
          @apply hidden;
        }
        & > .button {
          @apply rounded-none;
        }
      }
    }

    & > thead {
      & > tr {
      }
    }
    & > tbody {
      & > tr {
        @apply transition-colors;
        &:last-child > td {
          @apply border-b-0;
        }
        &.unmodified > td.state > div {
          @apply bg-gray-300 dark:bg-gray-700;
        }
        &.modified > td.state > div {
          @apply bg-warning-light dark:bg-warning-dark;
        }
        &.added > td.state > div {
          @apply bg-success-light dark:bg-success-dark;
        }
        &.deleted > td.state > div {
          @apply bg-danger-light dark:bg-danger-dark;
        }
      }
    }
  }
</style>
