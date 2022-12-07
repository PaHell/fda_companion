<svelte:options accessors/>

<script lang="ts">
    import { getContext, onDestroy, onMount, setContext, SvelteComponent } from 'svelte';
    import type { App } from "$src/app";

    type T = $$Generic;
    interface $$Slots {
        default: {
            context: App.General.RowContext<T>,
        };
    }

    export let title: string = "";
    
    const table = getContext<App.General.TableContext<T>>("table");
    const context = getContext<App.General.RowContext<T>>("row");
    onMount(() => {
        table.registerColumn(title);
        //item = row.item;
    });
</script>
  
<template>
    <td>
        <slot {context}/>
    </td>
</template>
  
<style global lang="postcss">
</style>