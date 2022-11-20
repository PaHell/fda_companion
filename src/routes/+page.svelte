<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<template>
  <h1 class="text heading">{$_("text")}</h1>
</template>

<style lang="postcss">
  h1 {
    @apply p-2;
  }
</style>
