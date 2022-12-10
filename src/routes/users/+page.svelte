<script lang="ts">
  import type { App } from "$src/app";
    import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
    import TextInput from "$src/lib/controls/TextInput.svelte";
    import { Icons } from "$src/lib/general/Icon.svelte";
    import Column from "$src/lib/table/Column.svelte";
    import { RowState } from "$src/lib/table/Row.svelte";
    import Table from "$src/lib/table/Table.svelte";
    import { getContext } from "svelte";
    import { claim_text } from "svelte/internal";
    import { get } from "svelte/store";

  let users: App.Models.User[] = [
    {
      id: "1",
      username: "jdoe",
      fname: "John",
      lname: "Doe",
      roles: [],
    },
    {
      id: "2",
      username: "jnapls",
      fname: "John",
      lname: "Appleseed",
      roles: [],
    },
    {
      id: "3",
      username: "redesiigner",
      fname: "Patrick",
      lname: "Hellebrand",
      roles: [],
    },
    {
      id: "4",
      username: "blauschleim",
      fname: "Maria",
      lname: "Theresa",
      roles: [],
    },
  ];
</script>

<template>
  <div id="users">
    <h1 class="text heading col-span-2">All Users</h1>
    <p class="text">{JSON.stringify(users[0])}</p>
    <Table bind:items={users} css="col-span-2" let:ctx>
      <Column title="ID">
        <p class="text">{ctx.item.id}</p>
      </Column>
      <Column title="Username">
        <TextInput
          value={ctx.item.username}
          on:change={event => {
            ctx.item.username = event.detail;
            ctx.changed();
          }}
          name="street"
          css="col-span-2"
          />
        <p class="text">{ctx.item?.username}</p>
      </Column>
      <Column title="First name">
        <p class="text">{ctx.item.fname}</p>
      </Column>
      <Column title="Last name">
        <p class="text">{ctx.item.lname}</p>
      </Column>
      <Column title="Actions">
        <Button
          text={ctx.state == RowState.Remove ? "Keep" : "Remove"}
          variant={ButtonVariant.Secondary}
          on:click={() => {
            ctx.changed(ctx.state == RowState.Remove ? ctx.initialState : RowState.Remove);
          }}
          />
      </Column>
    </Table>
  </div>
</template>

<style lang="postcss">
    #users {
      @apply min-w-0 grid grid-cols-2 gap-4
      items-center;
    }
</style>