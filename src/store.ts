import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { App } from "./app.d";

export const authenticated = writable<boolean>(false);