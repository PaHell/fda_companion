<script lang="ts" context="module">
	import {default as Icon, Icons} from "$lib/general/Icon.svelte";
</script>

<script lang="ts">
	export let text: string | undefined = undefined;
	export let icon: Icons | undefined = undefined;
	export let variant: 'pri' | 'sec' | 'trans' = 'sec';
	export let disabled: boolean = false;
	export let active: boolean = false;
	export let css: string = '';
</script>

<template>
	<button on:click type="button" {disabled} class:active class="button button-{variant} {css}">
		{#if icon}
			<Icon name={icon} />
		{/if}
		<slot />
		{#if text}
			<p>{text}</p>
		{/if}
	</button>
</template>

<style global lang="postcss">
	.button {
		@apply flex items-center justify-center flex-shrink-0
        h-10 px-2 border rounded font-medium
        select-none outline-0
		transition-all;

		& * {
			@apply border-inherit transition-colors;
		}
		& > .icon {
			&:first-child:not(:last-child) {
				@apply ml-2;
			}
		}
		& > p {
			@apply flex-1 px-2 mb-[.5px] font-medium text-base
			overflow-ellipsis whitespace-nowrap overflow-hidden
			text-left;

			& > span {
				@apply text-gray-600;
			}

			&:last-child:not(:first-child) {
				@apply pr-3;
			}
		}

		/* ACTIVE */

		/* VARIANTS */

		&:not(.button-trans):focus {
			@apply ring-2 ring-accent-500
			ring-offset-2 ring-offset-gray-100;
		}

		&.button-pri {
			@apply bg-accent-400 border-accent-500 text-black;
			&:hover {
				@apply bg-accent-500 border-accent-600;
			}
			&:active {
				@apply bg-accent-600 border-accent-600;
			}
		}

		&.button-sec,
		&.button-trans {
			& p {
				@apply text-gray-700;
			}
			& .icon {
				@apply text-gray-500;
			}
			&:hover,
			&:focus,
			&:active {
				& p {
					@apply text-gray-900;
				}
				& .icon {
					@apply text-gray-700;
				}
			}
		}

		&.button-sec {
			@apply bg-gray-50 border-gray-300 shadow-sm;
			&:hover {
				@apply bg-white shadow;
			}
			&:active {
				@apply bg-gray-100 shadow-inner;
			}
		}

		&.button-trans {
			@apply bg-transparent border-transparent;
		}

		&:disabled {
			@apply pointer-events-none;
			@apply shadow-none bg-gray-200 border-gray-300 !important;
			& p {
				@apply text-gray-500 !important;
			}
			& .icon {
				@apply text-gray-400 !important;
			}
		}
	}
</style>