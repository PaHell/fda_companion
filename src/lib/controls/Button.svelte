<script lang="ts" context="module">
	import {default as Icon, Icons} from "$lib/general/Icon.svelte";
	export enum ButtonVariant {
		Primary = "pri",
		Secondary = "sec",
		Transparent = "trans"
	}
</script>

<script lang="ts">
	export let text: string | undefined = undefined;
	export let icon: Icons | undefined = undefined;
	export let variant: ButtonVariant = ButtonVariant.Secondary;
	export let disabled: boolean = false;
	export let active: boolean = false;
	export let css: string = '';
</script>

<template>
	<button on:click type="button" {disabled} class:active class="button button-{variant} {css}">
		{#if icon}
			<Icon name={icon} />
		{/if}
		{#if text}
		<p class="text">{text}</p>
		{/if}
		<slot />
	</button>
</template>

<style global lang="postcss">
	.button {
		@apply flex items-center justify-center flex-shrink-0
        h-10 px-2 border rounded font-medium
        select-none outline-0
		transition-all;

		& * {
			@apply border-inherit text-inherit transition-colors;
		}
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
		}

		/* ACTIVE */

		/* VARIANTS */

		&:not(.button-trans):focus {
			@apply ring-2 ring-accent-500
			ring-offset-2 ring-offset-gray-100
			dark:ring-offset-gray-900;
		}

		&.button-pri {
			@apply bg-accent-400 border-accent-500
			text-white;
			&:hover {
				@apply bg-accent-500 border-accent-600;
			}
			&:active {
				@apply bg-accent-600 border-accent-600;
			}
		}

		&.button-sec,
		&.button-trans {
			& > .text {
				@apply text-grayText-sec dark:text-grayTextDark-sec !important;
			}
			& > .icon {
				@apply text-grayIcon-sec dark:text-grayIconDark-sec;
			}
			&:hover,
			&:focus,
			&:active {
				& > .text {
					@apply text-grayText-pri dark:text-grayTextDark-pri;
				}
				& > .icon {
					@apply text-grayIcon-pri dark:text-grayIconDark-pri;
				}
			}
		}

		&.button-sec {
			@apply shadow-sm
			bg-gray-50 border-gray-300
			dark:bg-gray-800 dark:border-gray-700;
			&:hover {
				@apply shadow bg-white dark:bg-gray-700;
			}
			&:active {
				@apply shadow-inner bg-gray-100 dark:bg-gray-800;
			}
		}

		&.button-trans {
			@apply bg-transparent border-transparent;
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
</style>