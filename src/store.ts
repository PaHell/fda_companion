import { writable } from 'svelte/store';
import { browser } from '$app/environment'; 

export const themes : App.General.Theme[] = [
    {
      id: "dark",
      name: "Dark",
      class: "dark"
    },
    {
      id: "light",
      name: "Light",
      class: "light"
    },
    {
      id: "os",
      name: "OS Preference",
      class: ""
    },
  ];
export const theme = function() {
    const {set, subscribe, update} = writable<App.General.Theme | undefined>();
    if (browser) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const osPref = event.matches ? 'dark' : 'light';
            setTheme(themes.find(t => t.id === osPref));
        });
    }
    function setTheme(theme: App.General.Theme) {
        set(theme);
        // clear all other theme classes
        document.documentElement.classList.remove(...themes.map(t => t.class).filter(t => t.length));
        // save
        localStorage.setItem("theme", theme.id);
        /// apply
        if (theme.class) document.documentElement.classList.add(theme.class);
    }
    return {
        set : setTheme,
        subscribe
    }
}();