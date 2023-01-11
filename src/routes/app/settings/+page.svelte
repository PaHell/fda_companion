<script lang="ts">
    import SelectViewSize from "$src/lib/controls/view_size/SelectViewSize.svelte";
  import SelectLanguage from "$src/lib/controls/locale/SelectLanguage.svelte";
  import SelectTheme from "$src/lib/controls/theme/SelectTheme.svelte";
    import Button from "$src/lib/controls/Button.svelte";
    import { Icons } from "$src/lib/general/Icon.svelte";
    import { _ } from "svelte-i18n";
    import { authenticated } from "$src/store";
    import { goto } from "$app/navigation";

    function logout() {
      authenticated.set(false);
      goto("/");
    }
</script>

<template>
  <div id="settings">
    <h1 class="text heading col-span-2">{$_("routes.app.settings.title")}</h1>
    <h2 class="text headline col-span-2">{$_("routes.app.settings.general")}</h2>
    <SelectLanguage />
    {#if $authenticated}
      <div>
        <p class="text label"></p>
        <Button icon={Icons.Logout} text="routes.app.settings.logout" css="w-full" on:click={logout}/>
      </div>
    {/if}
    <h2 class="text headline col-span-2">{$_("routes.app.settings.appearance")}</h2>
    <SelectTheme />
    <SelectViewSize />
  </div>
</template>

<style lang="postcss">
    #settings {
    @apply min-w-0 grid grid-cols-2 gap-4
    items-center;
  }
</style>
