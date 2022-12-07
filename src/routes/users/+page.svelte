<script lang="ts">
  import type { App } from "$src/app";
    import Button, { ButtonVariant } from "$src/lib/controls/Button.svelte";
    import { Icons } from "$src/lib/general/Icon.svelte";
    import Column from "$src/lib/table/Column.svelte";
    import Table from "$src/lib/table/Table.svelte";

  let usersHeader = ["ID", "Username", "Last Name", "First Name"];
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
    <Table bind:items={users} css="col-span-2">
      <Column title="ID" let:context>
        <p class="text">{context.item.id}</p>
      </Column>
      <Column title="Username" let:context>
        <p class="text">{context.item.username}</p>
      </Column>
      <Column title="First name" let:context>
        <p class="text">{context.item.fname}</p>
      </Column>
      <Column title="Last name" let:context>
        <p class="text">{context.item.lname}</p>
      </Column>
      <Column title="Actions" let:context>
        <Button
          icon={Icons.Home}
          text="Create"
          variant={ButtonVariant.Primary}
          on:click={context.changed}
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