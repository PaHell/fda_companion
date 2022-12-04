<script lang="ts">
    import { fullscreen } from "$src/store";
    import Button from "./controls/Button.svelte";
    import { Icons } from "./general/Icon.svelte";

    function openFullscreen() {
        var elem = document.documentElement;
        fullscreen.update(val => {
            // inverse
            if (!val) {
                elem.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
            return !val;
        });
    }
</script>
  
<template>
    <header id="header">
        <Button icon={Icons.Menu} />
        <div>
            <p class="text font-bold">{import.meta.env.VITE_APP_NAME}</p>
        </div>
        <Button icon={Icons.FullScreen} on:click={openFullscreen} active={$fullscreen} />
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