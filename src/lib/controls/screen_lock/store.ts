import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { App } from "$src/app.d";
import { isMobile as _isMobile } from "$lib/helpers";

export const screenLock = function() {
    const { subscribe, set, update } = writable<App.General.ScreenLock>({ locked: false, pin: ""});
    return {
        subscribe,
        lock: (pin: string) => {
            set({ locked: true, pin });
        },
        unlock: (pin: string) => {
            update((current: App.General.ScreenLock) => {
                if (current && current.pin === pin) {
                    return { locked: false, pin: "" };
                }
                return current;
            });
        },
    }
}();