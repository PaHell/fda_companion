<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher, onMount } from "svelte";
    import Button, { ButtonVariant } from "./Button.svelte";
</script>

<script lang="ts">
  // TYPE
  interface $$Events {
    change: typeof value;
  }
  // PROPS
  export let value: string | number | undefined = undefined;

  let container: HTMLElement | undefined;
  let canvas: HTMLCanvasElement | undefined;
  let photo: HTMLImageElement | undefined;
  let video: HTMLVideoElement | undefined;

  // height is always larger than width
  let width = 0;
  let height = 0; // this will be a fixed value from css

  let streaming = false;
  let error: string | undefined;

  onMount(() => {
    if (!container || !video) return;
    // apply css height
    height = container.clientHeight;
    // get video stream and show
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (!video) return;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
        error = err;
      });
    // format video stream
    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          const video = ev.target as HTMLVideoElement;
          //height = (video.videoHeight / video.videoWidth) * width;
          width = (video.videoWidth / video.videoHeight) * height;
          //video.setAttribute("width", width);
          video.setAttribute("height", height);
          canvas.setAttribute("width", width);
          canvas.setAttribute("height", height);
          streaming = true;
        }
      },
      false
    );
  });

  function clearPhoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takePicture() {
    if (!video || !canvas || !photo) return;
    const context = canvas.getContext("2d");
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    } else {
      clearPhoto();
    }
  }
</script>

<template>
  {#if error}
    <p class="text">{error}</p>
  {/if}
  <div class="picture-input">
    <main bind:this={container}>
      <video id="video" bind:this={video}>
        <track kind="captions" />
        <p class="text">Video stream not available.</p>
      </video>
      <canvas id="canvas" bind:this={canvas} />
      <img
        id="photo"
        bind:this={photo}
        alt=""
      />
    </main>
    <footer>
      <Button
      text="Take photo"
      icon={Icons.Home}
      variant={ButtonVariant.Primary}
      on:click={takePicture}
      />
    </footer>
  </div>
</template>

<style global lang="postcss">
  .picture-input {
    & > main,
    & > main > * {
      @apply h-72;
    }    
    & > main {
      @apply w-72 relative overflow-hidden
      rounded-full;
      & > *:not(:last-child) {
        @apply absolute w-[600px];
      }
      & > video {
      }
      & > canvas {
      }
      & > img {
      }
    }
  }
</style>
