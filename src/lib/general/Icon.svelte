<script lang="ts" context="module">
	export enum Icons {
		Home = "home",
		SelectDown = "arrow-drop-down-line",
		SelectSelected = "check-line",
	};
</script>

<script lang="ts">
	export let name: Icons = Icons.Home;
	export let css: string = '';
	export let large: boolean = false;
</script>

<template>
	<div class="icon {css}" class:large>
		<i class="ri-{name}" />
	</div>
</template>

<style global lang="postcss">
	.icon {
		@apply flex justify-center items-center
    		text-[24px] leading-none;
		&.large {
			@apply text-[36px];
		}
	}
</style>