<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher, onMount } from "svelte";
</script>

<script lang="ts">
  // TYPE
  interface $$Events {
    change: typeof value;
  }
  // PROPS
  export let value: string | number | undefined = undefined;

  let canvas: HTMLCanvasElement | undefined;
  let photo: HTMLImageElement | undefined;
  let video: HTMLVideoElement | undefined;

  const width = 320;
  let height = 0;

  let streaming = false;
  let error: string | undefined;

  onMount(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
        error = err;
      });
    video.addEventListener(
      "canplay",
      (ev) => {
        if (!streaming) {
          height = (video.videoHeight / video.videoWidth) * width;

          video.setAttribute("width", width);
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
    <div class="camera">
      <video id="video" bind:this={video}>
        <track kind="captions" />
        <p class="text">Video stream not available.</p>
      </video>
      <button on:click={takePicture}>Take photo</button>
    </div>
    <canvas id="canvas" bind:this={canvas} />
    <div class="output">
      <img
        id="photo"
        bind:this={photo}
        alt="The screen capture will appear in this box."
      />
    </div>
  </div>
</template>

<style global lang="postcss">
  .picture-input {
    @apply max-h-96 flex;
  }
</style>
