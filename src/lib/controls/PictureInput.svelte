<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import Overlay from "./Overlay.svelte";
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
  let refOverlay: SvelteComponent | undefined;
  let container: HTMLElement | undefined;
  let canvas: HTMLCanvasElement | undefined;
  let video: HTMLVideoElement | undefined;
  let photoSrc: string = "";

  let dynComp: HTMLElement;

  // height is always larger than width
  let width = 320;
  let height = 0; 

  let currentState = State.Init;
  let styleVideoCanvas = "";
  let error: string | undefined;

  onMount(() => {
    if (!container) return;
    // css width
    width = container.clientWidth;
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
    const data = canvas.toDataURL("image/png");
    photoSrc = data;
    refOverlay?.close();
    clearCanvas();
  }

  function onCanPlay(event: Event & { currentTarget: HTMLVideoElement }) {
    console.log("onCanPlay", event);
    currentState = State.Streaming;
    height = (event.currentTarget.videoHeight / event.currentTarget.videoWidth) * width;
    styleVideoCanvas = `width: ${width}px; height: ${height}px;`;
  }
</script>

<template>
  <Overlay bind:this={refOverlay}>
    <svelte:fragment slot="item">
      <Button
      variant={ButtonVariant.Primary}
      on:click={refOverlay.toggleOpened}
      >
      {#if photoSrc}
          <img
            id="photo"
            src={photoSrc}
            alt=""/>
          {:else}
          <Icon name={Icons.Home} />
        {/if}
      </Button>
    </svelte:fragment>
    <svelte:fragment slot="menu">
      <div class="picture-input {currentState}" bind:this={container}>
        <video bind:this={video} style={styleVideoCanvas} on:canplay={onCanPlay}>
          <track kind="captions" />
          <p class="text">Video stream not available.</p>
        </video>
        <canvas style={styleVideoCanvas} bind:this={canvas} />
        <div>
          {#if currentState === State.Streaming}
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
          {/if}
          </div>
      </div>
    </svelte:fragment>
  </Overlay>
</template>

<style global lang="postcss">
  .picture-input {
    @apply w-96;
    & > main {
      & > video {
      }
      & > canvas {
      }
    }
  }
</style>
