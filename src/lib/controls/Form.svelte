<script lang="ts" context="module">
</script>

<script lang="ts">
  import { setContext } from "svelte";

  export let id: string = "";
  export let allValid: boolean = false;
  let fields : {[field: string]: boolean}= {};

  setContext("form", (field: string, valid: boolean) => {
    fields[field] = valid;
    allValid = Object.values(fields).every((v) => v);
  });
</script>

<template>
  <form {id}>  
    <slot />
  </form>
</template>

<style global lang="postcss">
</style>
