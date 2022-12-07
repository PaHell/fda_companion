<script lang="ts">
    import { onDestroy, setContext, SvelteComponent } from 'svelte';
    import Column from './Column.svelte';
    import type { App } from "$src/app";
    import Row from './Row.svelte';
    import { writable, type Writable } from 'svelte/store';

    type T = $$Generic;
    interface $$Slots {
        default: {};
    }
    export let items: T[] = [];
    export let css: string = "";
    let stores: Writable<T>[] = [];
    let columns: string[] = [];
    setContext<App.General.TableContext<T>>("table", {
        registerColumn: (title: string) => {
            if (columns.includes(title)) return;
            columns.push(title);
            columns = columns;
        },
        changed: (item: T) => {
            console.log("Table changed", {item});
            item.id = "changed";
        }
    });
</script>
  
<template>
    <table class="table {css}">
        <thead>
            <tr>
                {#each columns as column}
                    <th>{column}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each items as item, index}
                <Row {item} {index} let:item let:index>
                    <slot {item} {index}/>
                </Row>
            {/each}
        </tbody>
    </table>
</template>
  
<style global lang="postcss">
    .table {
        @apply border border-separate border-spacing-0 rounded
        bg-gray-100 dark:bg-gray-800
        border-gray-300 dark:border-gray-700;

        & th,
        & td {
            @apply px-2 border-b
            border-gray-300 dark:border-gray-700;
            &:not(:last-child) {
                @apply border-r;
            }
        }
        & th {
            @apply h-10 text-grayText-sec dark:text-grayTextDark-sec
            font-semibold text-left;
            &:first-child {
                @apply rounded-tl;
            }
        }
        & td {
            @apply h-12 text-grayText-pri dark:text-grayTextDark-pri
            font-normal text-left text-base;
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
                &:hover {
                    @apply bg-gray-200 dark:bg-gray-700;
                }    
            }
        }
    }
</style>