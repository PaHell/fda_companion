<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import Overlay, { OverlayOrientation } from "./Overlay.svelte";
  import { createEventDispatcher, onMount, SvelteComponent } from "svelte";
  import Button, { ButtonVariant } from "./Button.svelte";
  import Alert, { AlertVariant } from "../general/Alert.svelte";

  enum State {
    Init,
    Error,
    Streaming,
    Viewing,
  }
</script>

<script lang="ts">
  // TYPE


  // PROPS
  export let base64: string = "";
  let previewBase64: string = "";
  let refOverlay: SvelteComponent | undefined;
  let video: HTMLVideoElement | undefined;
  let stream: MediaStream | undefined;

  let imageSize : [number, number] = [0, 0];
  let displaySize : [number, number] = [0, 0];

  let currentState = State.Init;
  let error: string | undefined;

  onMount(() => {
    console.log("onMount");
  });

  function updateView(state: State) {
    if (!video) return;
    currentState = state;
    video.hidden = state != State.Streaming;
  }

  function init() {
    if (!video) return;
    console.log("init", video);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((_stream) => {
        if (!video) return;
        console.log("setting video src", video);
        stream = _stream;
        video.srcObject = stream;
        video.play();
        updateView(State.Streaming);
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
        error = err;
      });
    updateView(State.Init);
  }

  function destroy() {
    if (!video || !stream) return;
    console.log("destroy", video);
    video.pause();
    video.srcObject = null;
    stream.getTracks().forEach((track) => track.stop());
    updateView(State.Init);
  }

  function clearCanvas() {
    if (!video) return;
    updateView(State.Streaming);
    previewBase64 = "";
  }

  function takePicture() {
    if (!video) return;
    var canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    canvas.width = imageSize[0];
    canvas.height = imageSize[1];
    context.drawImage(video, 0, 0, imageSize[0], imageSize[1]);
    previewBase64 = canvas.toDataURL("image/png");
    updateView(State.Viewing);
  }

  function savePhoto() {
    base64 = previewBase64;
    previewBase64 = "";
    refOverlay?.close();
    clearCanvas();
  }

  function onCanPlay(event: Event & { currentTarget: HTMLVideoElement }) {
    console.log("onCanPlay", event);
    currentState = State.Streaming;
    imageSize = [event.currentTarget.videoWidth, event.currentTarget.videoHeight];
    displaySize = [event.currentTarget.clientWidth, event.currentTarget.clientHeight];
  }
</script>

<template>
  <Overlay
    bind:this={refOverlay}
    orientation={OverlayOrientation.Right}
    on:open={init}
    on:close={destroy}
    css="picture-input"
  >
    <svelte:fragment slot="item">
      <Button
        variant={ButtonVariant.Primary}
        on:click={refOverlay.toggleOpened}
      >
        {#if base64}
          <img id="photo" src={base64} alt="" />
        {:else}
          <Icon name={Icons.Home} large />
          <p class="text">No Image</p>
        {/if}
      </Button>
    </svelte:fragment>
    <svelte:fragment slot="menu">
      {#if previewBase64}
        <img id="photo" src={previewBase64} alt="" />
      {/if}
      <video bind:this={video} on:canplay={onCanPlay}>
        <track kind="captions" />
        <p class="text">Video stream not available.</p>
      </video>
      <footer>
        {#if currentState === State.Init}
          <Alert variant={AlertVariant.Danger} icon={Icons.Home} title="Error!" text={error} />
        {:else if currentState === State.Streaming}
          <Button
            text="Take photo"
            icon={Icons.Home}
            variant={ButtonVariant.Primary}
            on:click={takePicture}
          />
        {:else if currentState === State.Viewing}
          <Button
            text="Retake"
            icon={Icons.Home}
            variant={ButtonVariant.Secondary}
            on:click={clearCanvas}
          />
          <Button
            text="Save"
            icon={Icons.Home}
            variant={ButtonVariant.Primary}
            on:click={savePhoto}
          />
        {:else if currentState === State.Error}
          <p class="text">Camera could not ne loaded</p>
        {/if}
      </footer>
    </svelte:fragment>
  </Overlay>
</template>

<style global lang="postcss">
  .picture-input {
    & > .button {
      @apply w-48 h-48 p-0
      flex-col justify-center items-center
      rounded-full overflow-hidden;
      & > img {
        @apply object-cover min-h-full;
      }
      & > .icon {
        @apply m-0 mb-1 text-accent-900 !important;
      }
      & > .text {
        @apply flex-initial mb-2 text-accent-900;
      }
    }
    & > menu {
      @apply flex justify-items-stretch items-center;
      & > main {
        @apply items-center flex-shrink-0;

        & > * {
        @apply border-inherit;
        &:last-child {
          @apply border-t;
        }
      }
        & > video {
        }
        & > canvas {
        }
        & > footer {
          @apply w-full flex justify-center p-2 mt-[-1px] relative;
          & > .button {
            &:not(:last-child) {
              @apply mr-2;
            }
          }
        }
      }
    }
  }
</style>
