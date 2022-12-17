<script lang="ts">
    import { screenLock } from "$src/store";
    import Button, { ButtonVariant } from "./controls/Button.svelte";
    import Overlay, { OverlayPosition } from "./controls/Overlay.svelte";
    import PinCodeInput from "./controls/PinCodeInput.svelte";
    import { Icons } from "./general/Icon.svelte";

    let refOverlay: Overlay;
    let refPinInput: PinCodeInput;

    function onOpen() {
        document.addEventListener("keydown", onKey);
    }

    function onClose() {
        document.removeEventListener("keydown", onKey);
    }

    function onKey(event: KeyboardEvent) {
        refPinInput.onKey(event);
    }

    function toggleLockScreen(event: CustomEvent<string>) {
        console.warn("toggleLockScreen", event.detail)
        const prev = $screenLock.locked;
        // toggle locked
        if (prev) screenLock.unlock(event.detail);
        else screenLock.lock(event.detail);
        // on success
        if (prev != $screenLock.locked) {
            refOverlay.close();
        }
    }
</script>
  
<template>
        <Overlay
            bind:this={refOverlay}
            position={OverlayPosition.Bottom}
            css="screen-lock"
            on:open={onOpen}
            on:close={onClose}>
            <svelte:fragment slot="item">
                <Button
                    icon={$screenLock.locked ? Icons.ScreenUnlock : Icons.ScreenLock }
                    text={$screenLock.locked ? "lib.screen_lock.unlock" : "lib.screen_lock.lock"}
                    on:click={refOverlay.toggleOpened}
                    active={$screenLock.locked}
                    variant={$screenLock.locked ? ButtonVariant.Secondary : ButtonVariant.Primary} />
            </svelte:fragment>
            <svelte:fragment slot="menu">
                <PinCodeInput bind:this={refPinInput} on:complete={toggleLockScreen}/>
            </svelte:fragment>
        </Overlay>
</template>
  
<style global lang="postcss">
    .screen-lock {
        & > .button.active {
            @apply fixed top-2 right-2 z-40;
        }
        & > menu > main {
            @apply p-2;
        }
    }
</style>