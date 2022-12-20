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
      role_id: "1",
    },
    {
      id: "2",
      username: "jnapls",
      fname: "John",
      lname: "Appleseed",
      role_id: "2",
    },
    {
      id: "3",
      username: "redesiigner",
      fname: "Patrick",
      lname: "Hellebrand",
      role_id: "1",
    },
    {
      id: "4",
      username: "blauschleim",
      fname: "Maria",
      lname: "Theresa",
      role_id: "2",
    },
  ];

  let roles: App.Models.Role[] = [
    {
      id: "1",
      name: "Admin",
    },
    {
      id: "2",
      name: "User",
    },
  ];

  users.forEach((user) => {
    user._role = roles.find(
      (role) => role.id == user.role_id
    );
  });
</script>

<template>
  <div id="users">
    <h1 class="text heading col-span-2">All Users</h1>
    <Table bind:items={users} css="col-span-2" let:ctx>
      <Column title="ID" width="4rem" css="" sortByKey="id">
        <p class="text secondary font-mono text-right">{ctx.item.id ?? "-"}</p>
      </Column>
      <Column title="lib.controls.text_input.username.label">
        <TextInput
          value={ctx.item.username}
          on:change={(event) => {
            ctx.item.username = event.detail;
            ctx.changed();
          }}
          name="street"
        />
      </Column>
      <Column title="lib.controls.text_input.first_name.label">
        <TextInput
          value={ctx.item.fname}
          on:change={(event) => {
            ctx.item.fname = event.detail;
            ctx.changed();
          }}
          name="first_name"
        />
      </Column>
      <Column title="lib.controls.text_input.last_name.label">
        <TextInput
          value={ctx.item.lname}
          on:change={(event) => {
            ctx.item.lname = event.detail;
            ctx.changed();
          }}
          name="last_name"
        />
      </Column>
      <Column title="lib.controls.select.role">
        <p class="text">{ctx.item._role?.name}</p>
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
