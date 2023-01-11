<script lang="ts" context="module">
  export enum Icons {
    Home = "home-line",
    Settings = "settings-line",
    Menu = "menu-2-line",
    FullScreen = "fullscreen-line",
    SelectDown = "arrow-drop-down-line",
    SelectSelected = "check-line",
    Delete = "delete-bin-line",
    UndoDelete = "arrow-go-back-line",
    SaveChanges = "save-line",
    Add = "add-line",
    OrderByAsc = "arrow-drop-up-line",
    OrderByDesc = "arrow-drop-down-line",
    DeleteBack = "delete-back-2-line",
    ScreenLock = "lock-2-fill",
    ScreenUnlock = "lock-unlock-fill",
    Number1 = "number-1",
    Number2 = "number-2",
    Number3 = "number-3",
    Number4 = "number-4",
    Number5 = "number-5",
    Number6 = "number-6",
    Number7 = "number-7",
    Number8 = "number-8",
    Number9 = "number-9",
    Number0 = "number-0",
    NumberPlaceholder = "asterisk",
    NavbarCollapsed = "menu-fold-line",
    CreateCustomer = "user-add-line",
    Customer = "user-line",
    ProductType = "store-line",
    User = "customer-service-line",
    DevTools = "code-s-slash-line",
    Logout = "logout-box-r-line",
    Company = "building-4-line",
    NoImage = "image-add-fill",
    TakePicture = "camera-lens-line",
    Undo = "arrow-go-back-line"
  }
</script>

<script lang="ts">
  export let name: Icons = Icons.Home;
  export let css: string = "";
  export let large: boolean = false;
</script>

<template>
  <i class="icon ri-{name} {css}" class:large />
</template>

<style global lang="postcss">
  .icon {
    @apply w-[21px] block text-[24px] leading-none indent-[-2px];
    &.large {
      @apply w-[36px] text-[36px] indent-0;
    }
  }
</style>
