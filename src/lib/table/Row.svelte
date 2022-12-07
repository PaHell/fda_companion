<svelte:options accessors/>

<script lang="ts">
    import { getContext, onDestroy, onMount, setContext, SvelteComponent } from 'svelte';
    import type { App } from "$src/app";

    type T = $$Generic;
    interface $$Slots {
        default: {
            item: T,
            index: number
        };
    }
    export let index: number = -1;
    export let item: T | undefined = undefined;
    
    const table = getContext<App.General.TableContext<T>>("table");
    //item = table.item(index);
    console.log("Row", {item});
    setContext<App.General.RowContext<T>>("row", {
        item,
        index,
        changed: () => {
            console.log("Row changed", {item});
            table.changed(item);
        }
    });
</script>
  
<template>
    {#if item}
        <tr>
            <slot {item} {index}/>
        </tr>
    {/if}
</template>
  
<style global lang="postcss">
</style>