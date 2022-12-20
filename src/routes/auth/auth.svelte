<script lang="ts">
</script>

<template>
  <div id="auth">
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="postcss">
  #auth {
    @apply flex justify-center items-center
    w-full h-full;
  }
</style>
