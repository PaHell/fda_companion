<script lang="ts" context="module">
  import { default as Icon, Icons } from "$lib/general/Icon.svelte";
  import { createEventDispatcher, onMount, type ComponentConstructorOptions } from "svelte";
    import Alert, { AlertVariant } from "../general/Alert.svelte";
    import { debounce } from "../helpers";
    import { validate as _validate, type ValidationRuleName } from "../validate";
    import { format, _ } from "svelte-i18n";
    import type { stringify } from "postcss";
  </script>

<script lang="ts" strictEvents>
  // TYPE
  type T = $$Generic<string | number>;
  interface $$Events {
    change: T;
    enter: T;
    validate: boolean;
  }
  // PROPS
  export let value: T;
  export let parse: (str: string) => T = (str) => str as T;
  export let serialize: (el: T) => string = el => el as string;
  export let name: string;
  export let css: string = "";
  export let icon: Icons | undefined = undefined;
  export let hideLabel: boolean = false;
  export let disabled: boolean = false;
  export let type: string = "text";
  export let alignRight: boolean = false;
  export let disableTabIndex: boolean = false;
  export let autofocus: boolean = false;
  export let rules: [ValidationRuleName, ...number[]][] = [];
  
  let valueString: string;
  let validationErrors: [string, ...number[]][] = [];
  
  export function focus() {
    ref?.focus();
  }
  // DATA
  let ref: HTMLInputElement | undefined;
  type InpEvent = Event & { currentTarget: EventTarget & HTMLInputElement };
  type KeyEvent = KeyboardEvent & {
    currentTarget: EventTarget & HTMLInputElement;
  };
  const dispatch = createEventDispatcher<$$Events>();
  const debouncedValidate = debounce(validate, 100);
  const debouncedChange = debounce(() => dispatch("change", value), 100);
  // LIFECYCLE

  $: {
    if (document.activeElement !== ref) {
      console.warn("$$$ TextInput");
      const ser = serialize(value);
      if (ser !== valueString) {
        console.log("valueString", valueString, "ser", ser);
        valueString = ser;
        debouncedValidate();
      }
    }
  }

  onMount(() => {
    valueString = serialize(value);
    if (autofocus) focus();
  });

  // USE
  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
  // FUNCTIONS
  function validate() {
    const errors = _validate(valueString, rules);
    const validChanged = (validationErrors.length === 0) !== (errors.length === 0);
    validationErrors = errors;
    if (validChanged) dispatch("validate", validationErrors.length === 0);
  }

  function onChange(event: InpEvent) {
    //valueString = event.currentTarget.value;
    value = parse(valueString);
    debouncedChange();
    debouncedValidate();
  }

  function onFocus(event: InpEvent) {
    console.log(event.currentTarget);
  }

  function onKey(event: KeyEvent) {
    switch (event.key) {
      case "Enter":
        dispatch("enter", parse(valueString));
        break;
    }
  }
</script>

<template>
  <div class="input-container {css}">

  {#if !hideLabel}
    <p class="text label">{$_(`lib.controls.text_input.${name}.label`)}</p>
  {/if}
  <div
    class="input input-{type}"
    class:right={alignRight}
    class:has-icon={!!icon}
  >
    <input
      bind:this={ref}
      bind:value={valueString}
      use:typeAction
      placeholder=""
      {disabled}
      {name}
      on:input={onChange}
      on:change={onChange}
      on:focus={onFocus}
      on:keydown={onKey}
      tabindex={disabled || disableTabIndex ? -1 : 0}
    />
    <div>
      {#if icon}
        <Icon name={icon} />
      {/if}
      <p class="text placeholder" class:opacity-0={valueString}>
        {$_(`lib.controls.text_input.${name}.placeholder`)}
      </p>
    </div>
  </div>
  {#if validationErrors.length > 0}
    <Alert variant={AlertVariant.Danger} title="Error!" transparent small>
      {#each validationErrors as [error, ...args]}
        <p class="text">{$format(`lib.validation.${error}`, {values: args})}</p>
      {/each}
    </Alert>
  {/if}
</div>
</template>

<style global lang="postcss">
  .input-container {
    &:focus-within > .label {
      @apply text-grayText-pri dark:text-grayTextDark-pri;
    }
    & > .label {
      @apply overflow-hidden w-full
      whitespace-nowrap text-ellipsis;
    }
    & > .input + .alert {
      @apply pt-1;
    }
    & > .alert {
      @apply py-0;
    }
  }
  .input {
    @apply flex flex-col flex-shrink-0
        h-10;

    /* layout, div overlays input exactly
         * and <input/> is before the styled content -> input:focus + *
        */
    & > input,
    & > div {
      @apply h-10 min-w-0;
    }
    & > div {
      @apply -mt-10 pointer-events-none;
      & > *:not(.icon):not(.placeholder) {
        @apply pointer-events-auto;
      }
    }

    & > input {
      @apply px-3
            border outline-0
            shadow-sm rounded
            font-medium select-none
		text-grayText-pri dark:text-grayTextDark-pri	
		caret-accent-500 dark:caret-accent-400
            transition-all
            bg-gray-50 border-gray-300
            dark:bg-gray-800 dark:border-gray-700;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        @apply appearance-none;
      }
      &:hover {
        @apply shadow bg-white border-gray-300
            dark:bg-gray-700 dark:border-gray-700;
      }
      &:focus {
        @apply bg-white dark:bg-gray-800
	  	shadow ring-2 ring-accent-500
		ring-offset-2 ring-offset-gray-100
		dark:ring-offset-gray-900;
      }
      &:disabled {
        @apply pointer-events-none;
        @apply shadow-none
			bg-gray-200 border-gray-300
			dark:bg-gray-900 dark:border-gray-800 !important;
      }
    }

    & > input:focus + div {
      & > .icon {
        @apply text-grayIcon-pri dark:text-grayIconDark-pri;
      }
    }

    & > input:disabled + div {
      & > .text {
        @apply text-grayText-tri dark:text-grayTextDark-tri !important;
      }
      & > .icon {
        @apply text-grayIcon-tri dark:text-grayIconDark-tri !important;
      }
    }

    & > div {
      @apply flex items-center px-2;
      & > .icon {
        @apply ml-1
	  text-grayIcon-sec dark:text-grayIconDark-sec;
      }
      & > .text {
        @apply flex-1 px-1 mb-[.5px] font-medium
				text-ellipsis whitespace-nowrap overflow-hidden text-left;

        &:last-child:not(:first-child) {
          @apply pr-3;
        }

        &.placeholder {
          @apply text-grayText-tri dark:text-grayTextDark-tri
                    transition-opacity indent-px;
        }
      }
    }

    &.right {
      & > input,
      & > div > .placeholder {
        @apply text-right;
      }
    }
    &.has-icon {
      & > input {
        padding-left: calc(21px + 1rem);
      }
    }
  }
</style>
