<script lang="ts">
  import Button, { ButtonVariant } from "$lib/controls/Button.svelte";
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { _ } from "svelte-i18n";
  import type { App } from "$src/app";
    import { createEventDispatcher } from "svelte";

  interface $$Events {
    complete: string;
  }

  export let length: number = 4;
  let value: string = "";
  let values: number[] = Array(10).fill(0).map((_, i) => (i + 1) % 10);

  const icons : Icons[] = [
    Icons.Number0,
    Icons.Number1,
    Icons.Number2,
    Icons.Number3,
    Icons.Number4,
    Icons.Number5,
    Icons.Number6,
    Icons.Number7,
    Icons.Number8,
    Icons.Number9,
  ];

  const dispatch = createEventDispatcher<$$Events>();

  export function enter(i: number) {
    value += i;
    if (value.length === length) {
      // execute later, so user sees the last number
      setTimeout(() => {
        dispatch("complete", value);
        value = "";
      }, 0);
    }
  }

  export function remove() {
    value = value.slice(0, -1);
  }

  export function onKey(e: KeyboardEvent) {
    switch (e.key) {
      case "Backspace":
        remove();
        break;
      default:
        if (e.key >= "0" && e.key <= "9") {
          enter(parseInt(e.key));
        }
        break;
    }
  }

</script>

<template>
    <div class="pin-code-input" on:contextmenu={(e) => { e.preventDefault(); return false; }}>
        <header>
            {#each value as number}
                <Icon name={icons[parseInt(number)]} css="text-grayText-pri dark:text-grayTextDark-pri"/>
            {/each}
            {#each Array(length - value.length) as _}
                <Icon name={Icons.NumberPlaceholder} css="text-grayText-sec dark:text-grayTextDark-sec"/>
            {/each}
        </header>
            {#each values as i}
                <Button
                    icon={icons[i]}
                    variant={ButtonVariant.Secondary}
                    disabled={value.length >= length}
                    on:click={() => enter(i)}/>
            {/each}
            <Button
                icon={Icons.DeleteBack}
                variant={ButtonVariant.Secondary}
                disabled={value.length === 0}
                on:click={remove}/>
    </div>

</template>

<style global lang="postcss">
    .pin-code-input {
        @apply grid grid-cols-3 gap-2;
        & > header {
            @apply col-span-3 py-2
            flex items-center justify-center
            border rounded
            border-gray-300 dark:border-gray-700
            bg-gray-200 dark:bg-gray-900
            text-center font-mono;
            letter-spacing: 0.25rem;
            & > .icon {
                @apply mx-1;
            }
        }
        & > .button {
            @apply select-none;
            &:nth-last-child(2) {
                grid-column: 2;
            }
        }
    }
</style>
