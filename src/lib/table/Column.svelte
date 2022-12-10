<svelte:options accessors/>

<script lang="ts">
    import { getContext, onDestroy, onMount, setContext, SvelteComponent } from 'svelte';
    import type { App } from "$src/app";

    type T = $$Generic;
    interface $$Slots {
        default: {};
    }

    export let title: string = "";
    
    const table = getContext<App.General.TableContext<T>>("table");
    onMount(() => {
        table.registerColumn(title);
    });

</script>
  
<template>
    <td>
        <slot/>
    </td>
</template>
  
<style global lang="postcss">
</style>