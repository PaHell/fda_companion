<script lang="ts">
    // IMPORT
    import Btn from '$lib/controls/Button.svelte';
    import {default as Icon, Icons} from "$lib/general/Icon.svelte";
    import { createEventDispatcher } from 'svelte';
    // TYPE
    type T = $$Generic;
    interface $$Slots {
        selected: {
            item: T;
            index: number;
        }
        item: {
            item: T;
            index: number;
        }
    }
    interface $$Events {
        change: CustomEvent<{
            item: T,
            index: number
        }>
    }
	// PROPS
    export let items : T[] = [];
	export let value : T | undefined;
	export let valueUndefined : string = "Nothing selected";
	export let index : number = -1;
	export let opened : boolean = false;
    // EVENTS
    const dispatch = createEventDispatcher<{ change: {item: T, index: number} }>()
    // HOOKS
    // FUNCTIONS
    function select(item: T, _index: number) {
        value = item;
        index = _index;
        dispatch("change", { item, index });
    }
</script>

<template>
	<div class="select">
		<Btn active={opened}
			variant="sec"
			on:click={() => opened = !opened}>
            {#if value}
			    <slot name="selected" item={value} {index}/>
            {:else}
                <p>{valueUndefined}</p>
            {/if}
			<Icon name={Icons.SelectDown}/>
		</Btn>
		<menu class:open={opened}>
            <div>
                <div>
                    {#each items as item, index}
                        <Btn
                            variant="trans"
                            active={item == value}
                            on:click={() => select(item, index)}>
                            <slot name="item" {item} {index} />
                            <Icon name={Icons.SelectSelected}/>
                        </Btn>
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
            & p {
                @apply flex-1 text-left;
            }
            & .icon {
                &:last-child {
                    @apply indent-2 border-l;
                }
            }
        }
        & > menu {
            @apply h-0 relative;
            
            & > div {
                @apply max-h-0 overflow-hidden;
                transition: max-height .3s ease-in-out;
                will-change: max-height;
    
                & > div {
                    @apply overflow-hidden
                    py-2 border border-gray-300
                    bg-gray-50 shadow rounded;
    
                    & .button {
                        @apply flex-shrink-0 
                        w-full
                        rounded-none border-none;

                        & > .icon:last-child {
                            @apply hidden;
                        }

                        &:hover,
                        &:focus {
                            @apply bg-gray-100;
                        }
                        &:active {
                            @apply bg-gray-200;
                        }
    
                        &.active {
                            & > p {
                                @apply text-accent-700;
                            }
                            & > .icon:last-child {
                                @apply block text-accent-500;
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