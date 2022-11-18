<script lang="ts">
    import Button from "./controls/Button.svelte";
    import { Icons } from "./general/Icon.svelte";


    // IMPORT
    // PROPS
    // EVENTS
    // HOOKS
    // FUNCTIONS
</script>
  
<template>
    <header id="header">
        <Button icon={Icons.Menu} />
        <div>
            <p class="text font-bold">{import.meta.env.VITE_APP_NAME}</p>
        </div>
        <Button icon={Icons.FullScreen} />
        <Button icon={Icons.Settings} />
    </header>
</template>
  
<style global lang="postcss">
    #header {
        @apply flex justify-center items-center
        p-2 border-b
        border-gray-300 dark:border-gray-700;

        & > div {
            @apply flex-1 flex justify-center items-center;
        }

        & > .button + .button {
            @apply ml-2;
        }
    }
</style>