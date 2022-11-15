<script lang="ts">
    // IMPORT
    import Select from '$lib/controls/Select.svelte';
    import { onMount } from 'svelte';
    import { theme, themes } from '$lib/../store';
    // PROPS
    let selectedTheme : App.General.Theme | undefined = undefined;
    // EVENTS
    // HOOKS
    onMount(() => {
      selectedTheme = $theme;
    });
    // FUNCTIONS
    function setTheme(_theme: App.General.Theme) : void {
      theme.set(_theme);
      // clear all other theme classes
      document.documentElement.classList.remove(...themes.map(t => t.class).filter(t => t.length));
      // save
      localStorage.setItem("theme", _theme.id);
      /// apply
      if (_theme.class) document.documentElement.classList.add(_theme.class);
    }
</script>
  
<template>
    <Select
        bind:value={selectedTheme}
        items={themes}
        on:change={e => setTheme(e.detail.item)}>
        <div slot="selected" let:item>
            <p class="text">{item.name}</p>
        </div>
        <div slot="item" let:item>
            <p class="text">{item.name}</p>
        </div>
    </Select>
</template>
  
  <style lang="postcss">
  </style>