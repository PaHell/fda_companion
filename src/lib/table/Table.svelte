<script lang="ts">
    import { onDestroy, onMount, setContext, SvelteComponent } from 'svelte';
    import Column from './Column.svelte';
    import type { App } from "$src/app";
    import Row, { RowState } from './Row.svelte';
    import { writable, type Writable } from 'svelte/store';
    import Button from '../controls/Button.svelte';

    type T = $$Generic;
    interface $$Slots {
        default: {
            ctx: App.General.RowContext<T>,
        };
    }
    export let items: T[] = [];
    export let css: string = "";
    let columns: App.General.Column[] = [];
    let contexts: App.General.RowContext<T>[] = [];
    setContext<App.General.TableContext<T>>("table", {
        registerColumn,
        getRowContext,
    });

    onMount(() => {
        if (items.length === 0) {
            addItem();
            setTimeout(() => {
                items = [];
            });
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
            changed: () => { }
        });
        items = items;
    }

    function onRowChanged(item: T, index: number, state: RowState) {
        const context = contexts[index];
        context.state = state;
        if (state != RowState.Remove) {
            context.initialState = state;
        }
        items = contexts.map(ctx => ctx.item);
        console.log("Table Changed", JSON.stringify(item));
    }

    function registerColumn(title: string, width: string, css: string) {
        columns.push({
            title,
            width,
            css
        });
        columns = columns;
    }

    function getRowContext(item: T, index: number, _changed: () => void) {
        const changed = (state: RowState = RowState.Modified) => {
            _changed();
            onRowChanged(item, index, state);
        };
        if (contexts[index]) {
            contexts[index].item = item;
            //contexts[index].index = index;
            contexts[index].changed = changed;
            return contexts[index];
        }
        contexts[index] = {
            item,
            index,
            state: RowState.Unmodified,
            initialState: RowState.Unmodified,
            changed
        };
        return contexts[index];
    }
</script>
  
<template>
    <table class="table {css}">
        <thead>
            <tr>
                <th class="state"></th>
                {#each columns as column}
                    <th style="width: {column.width};">{column.title}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each items as item, index}
                <Row {item} {index}>
                    <slot ctx={contexts[index]}/>
                </Row>
            {/each}
        </tbody>
    </table>
    <div>
        <Button
            text="Add"
            on:click={addItem}
            />
    </div>
</template>
  
<style global lang="postcss">
    .table {
        @apply border border-separate border-spacing-0 rounded
        bg-gray-100 dark:bg-gray-800
        border-gray-300 dark:border-gray-700;

        & th,
        & td {
            @apply border-b box-content
            border-gray-300 dark:border-gray-700;
            &:not(:last-child):not(.state) {
                @apply border-r;
            }
        }
        & th {
            @apply h-10 text-grayText-sec dark:text-grayTextDark-sec
            font-semibold text-left;
            &:first-child {
                @apply rounded-tl;
            }
            &:not(.state) {
                @apply px-3;
            }
            &.state {
                @apply w-6;
            }
        }
        & td {
            @apply h-10 p-0 m-0 text-grayText-pri dark:text-grayTextDark-pri
            font-normal text-left text-base;
            height: calc(2.5rem - 2px);
            &.state {
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
                @apply px-3;
            }
            & > .button {
                @apply rounded-none;
                &:first-child:last-child {
                    width: calc(100% + 2px);
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
                    @apply bg-orange-500 dark:bg-orange-400;
                } 
                &.added > td.state > div {
                    @apply bg-blue-600 dark:bg-blue-500;
                }
                &.remove > td.state > div {
                    @apply bg-red-600 dark:bg-red-500;
                }
            }
        }
    }
</style>