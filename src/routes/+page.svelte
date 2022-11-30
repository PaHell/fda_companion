<script lang="ts">
    import TextInput from "$src/lib/controls/TextInput.svelte";
  import Alert, { AlertVariant } from "$src/lib/general/Alert.svelte";
    import { Icons } from "$src/lib/general/Icon.svelte";
    import { ValidationRuleName } from "$src/lib/validate";
import { _ } from "svelte-i18n";

  let value = "";
</script>

<template>
  <h1 class="text heading">{$_("text")}</h1>
  <Alert
    text="text"
    variant={AlertVariant.Danger}/>
  <Alert
    title="title"
    text="text"
    variant={AlertVariant.Danger}/>
  <TextInput
    bind:value
    name="first_name"
    icon={Icons.Home}
    rules={[
      [ValidationRuleName.Required],
      [ValidationRuleName.Range, 2, 5]
    ]}
  />
  <Alert
    title="title"
    text="text"
    icon={Icons.Home}
    variant={AlertVariant.Danger}/>
  <Alert
    title="title"
    text="text"
    icon={Icons.Home}
    variant={AlertVariant.Danger}
    small/>
  <Alert
    title="title"
    text="text"
    icon={Icons.Home}
    variant={AlertVariant.Danger}
    transparent/>
</template>

<style lang="postcss">
  h1 {
    @apply p-2;
  }
</style>
