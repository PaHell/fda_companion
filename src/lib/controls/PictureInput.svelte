<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import Overlay, { OverlayOrientation } from "./Overlay.svelte";
  import { createEventDispatcher, onMount, SvelteComponent } from "svelte";
  import Button, { ButtonVariant } from "./Button.svelte";

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
  let refOverlay: SvelteComponent | undefined;
  let canvas: HTMLCanvasElement | undefined;
  let video: HTMLVideoElement | undefined;

  let dynComp: HTMLElement;

  // height is always larger than width
  let width = 320;
  let height = 0;

  let currentState = State.Init;
  let styleVideoCanvas = "";
  let error: string | undefined;

  onMount(() => {
    init();
    console.log("onMount", video, canvas);
    if (!video) return;
    // css width
    width = video.clientWidth;
    // get video stream and show
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (!canvas || !video) return;
        currentState = State.Streaming;
        console.log("setting video src", video);
        video.srcObject = stream;
        video.play();
        canvas.hidden = true;
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
        error = err;
      });
  });

  function init() {
    if (!canvas || !video) return;
    console.log("init", canvas, video);
    canvas.hidden = true;
    video.hidden = true;
    currentState = State.Init;
  }

  function destroy() {
    if (!canvas || !video) return;
    console.log("init", canvas, video);
    canvas.hidden = true;
    video.hidden = true;
    currentState = State.Init;
  }

  function clearCanvas() {
    if (!canvas || !video) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
    canvas.hidden = true;
    video.hidden = false;
    currentState = State.Streaming;
  }

  function takePicture() {
    if (!canvas || !video) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, width, height);
    canvas.hidden = false;
    video.hidden = true;
    currentState = State.Viewing;
  }

  function savePhoto() {
    if (!canvas) return;
    base64 = canvas.toDataURL("image/png");
    refOverlay?.close();
    clearCanvas();
  }

  function onCanPlay(event: Event & { currentTarget: HTMLVideoElement }) {
    console.log("onCanPlay", event);
    currentState = State.Streaming;
    height =
      (event.currentTarget.videoHeight / event.currentTarget.videoWidth) *
      width;
    styleVideoCanvas = `width: ${width}px; height: ${height}px;`;
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
      <video bind:this={video} style={styleVideoCanvas} on:canplay={onCanPlay}>
        <track kind="captions" />
        <p class="text">Video stream not available.</p>
      </video>
      <canvas style={styleVideoCanvas} bind:this={canvas} />
      <div>
        {#if currentState === State.Init}
          <p class="text text-danger-light dark:text-danger-dark">
            Camera could not ne loaded
          </p>
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
      </div>
    </svelte:fragment>
  </Overlay>
</template>

<style global lang="postcss">
  .picture-input {
    & > .button {
      @apply w-48 h-48 flex-col justify-center items-center rounded-full;
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
        @apply justify-center flex-shrink-0;
        & > video {
        }
        & > canvas {
        }
        & > div {
          @apply flex;
          & > .text {
            @apply p-2;
          }
        }
      }
    }
  }
</style>
