<svelte:options accessors/>

<script lang="ts">
    import { getContext, onDestroy, onMount, setContext, SvelteComponent } from 'svelte';
    import type { App } from "$src/app";

    type T = $$Generic;
    interface $$Slots {
        default: {};
    }

    export let title: string = "";
    export let width: string = "auto";
    export let css: string = "";
    
    const table = getContext<App.General.TableContext<T>>("table");
    onMount(() => {
        table.registerColumn(title, width, css);
    });

</script>
  
<template>
    <td class={css}>
        <slot/>
    </td>
</template>
  
<style global lang="postcss">
</style>