import { writable } from 'svelte/store';
import type { App } from '$src/app'; 
import { countries as _countries } from "country-flags-svg";

export const countries = function() {
    const {set, subscribe} = writable<App.Models.Country[]>(_countries);
    return {
        set,
        subscribe
    }
}();