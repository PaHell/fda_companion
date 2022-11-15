<script lang="ts">
  // IMPORT
  import Select from '$lib/controls/Select.svelte';
    import SelectTheme from '$lib/SelectTheme.svelte';
  // PROPS
  const locales : App.Locale[] = [
    {
      iso2: "deu",
      name: "Deutsch"
    },
    {
      iso2: "eng",
      name: "English"
    },
  ];
  let locale : App.Locale | undefined = undefined;
  // EVENTS
  // HOOKS
  // FUNCTIONS
</script>

<template>
  <main>

  </main>
  <Select bind:value={locale}
  items={locales}>
  <div slot="selected" let:item let:index>
      <p class="text">{item.iso2}</p>
      <p class="text caption">{item.name}</p>
  </div>
  <div slot="item" let:item let:index>
    <p class="text">
      <span class="caption">{index}.</span>
      <span>{item.name}</span>
      <span class="heading">({item.iso2})</span>
    </p>
  </div>
    </Select>
</template>

<style lang="postcss">
  main {
    
  }
</style>