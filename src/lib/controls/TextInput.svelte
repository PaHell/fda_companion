<script lang="ts" context="module">
	import {default as Icon, Icons} from "$lib/general/Icon.svelte";
</script>

<script lang="ts">
	// TYPE
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
	export let value: string | undefined = undefined;
	export let placeholder: string;
	export let icon: Icons | undefined = undefined;
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;
	// REF
	let ref : HTMLInputElement | undefined;

	type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement; };

	function onInput(event: InputEvent) {
		console.log(event.currentTarget);
	}

	function onFocus(event: InputEvent) {
		console.log(event.currentTarget);
	}
</script>

<template>
	{#if label}
		<p class="text label">{label}</p>
	{/if}
	<div class="input">
		<input
			bind:this={ref}
			bind:value
			type="text"
			{placeholder}
			{disabled}
			on:input={onInput}
			on:focus={onFocus}
			/>
		<div>
			{#if icon}
				<Icon name={icon} />
			{/if}
			<p class="text placeholder">{placeholder}</p>
		</div>
	</div>
</template>

<style global lang="postcss">
	.input {
		@apply flex items-center justify-center flex-shrink-0
        h-10 px-2 border rounded font-medium
        select-none outline-0
		transition-all;

		& > input,
		& > div {
			@apply h-full;
		}
		
		& > input {
			@apply bg-red-500;
			&:not(.button-trans):focus {
				@apply ring-2 ring-accent-500
				ring-offset-2 ring-offset-gray-100
				dark:ring-offset-gray-900;
			}
			&:disabled {
			@apply pointer-events-none;
			@apply shadow-none
			bg-gray-200 border-gray-300
			dark:bg-gray-900 dark:border-gray-900 !important;
			& > .text {
				@apply text-grayText-tri dark:text-grayTextDark-tri !important;
			}
			& > .icon {
				@apply text-grayIcon-tri dark:text-grayIconDark-tri !important;
			}
		}
		}

		& > div {
			& > .icon {
				&:first-child:not(:last-child) {
					@apply ml-2;
				}
			}
			& > .text {
				@apply flex-1 px-2 mb-[.5px] font-medium
				overflow-ellipsis whitespace-nowrap overflow-hidden
				text-left;
	
				&:last-child:not(:first-child) {
					@apply pr-3;
				}

				&.placeholder {
					@apply text-grayText-tri dark:text-grayTextDark-tri;
				}
			}
		}
	}
</style>