<script lang="ts">
    import { fullscreen } from "$src/store";
    import Button from "./controls/Button.svelte";
    import Overlay, { OverlayPosition } from "./controls/Overlay.svelte";
    import PinCodeInput from "./controls/PinCodeInput.svelte";
    import { Icons } from "./general/Icon.svelte";

    let pin = "";
    let refOverlay: Overlay;

    function openFullscreen() {
        fullscreen.update(val => {
            return !val;
        });
    }
</script>
  
<template>
    <header id="header">
        <Button icon={Icons.Menu} />
        <main>
            <p class="text font-bold">{import.meta.env.VITE_APP_NAME}</p>
        </main>
        <Overlay bind:this={refOverlay} position={OverlayPosition.Bottom} css="overlay-pin">
            <svelte:fragment slot="item">
                <Button icon={Icons.ScreenLock} on:click={refOverlay.toggleOpened} active={$fullscreen} />
            </svelte:fragment>
            <svelte:fragment slot="menu">
                <PinCodeInput bind:value={pin}/>
            </svelte:fragment>
        </Overlay>
    </header>
</template>
  
<style global lang="postcss">
    #header {
        @apply flex justify-center items-center
        p-2 border-b
        border-gray-300 dark:border-gray-800;

        & > main {
            @apply flex-1 flex justify-center items-center;
        }

        & > .button + .button {
            @apply ml-2;
        }
    }

    .overlay-pin {
        & > menu > main {
            @apply p-2;
        }
    }

</style>