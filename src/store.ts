import { writable } from 'svelte/store';
import { browser } from '$app/environment'; 
import type { App } from './app'; 

export const themes : App.General.Theme[] = [
    {
      text: "Creepy Darkness",
      class: "dark"
    },
    {
      text: "Eyeopening Brightness",
      class: "light"
    },
    {
      text: "Operating System Preference",
      class: ""
    },
  ];
export const theme = function() {
    const {set, subscribe} = writable<App.General.Theme | undefined>();
    if (browser) {
      if ('theme' in localStorage) { // user set theme
        const theme = themes.find(t => t.class === localStorage.theme);
        if (theme) setTheme(theme);
      } else {
        setTheme(themes[2]); // os pref
      }
    }
    function setTheme(theme: App.General.Theme) {
        // update store
        set(theme);
        // clear all other theme classes
        document.documentElement.classList.remove(...themes.map(t => t.class).filter(t => t.length));
        // save & apply
        if (theme.class) { // user set theme
          document.documentElement.classList.add(theme.class);
          localStorage.setItem("theme", theme.class);
        } else { // os pref
          document.documentElement.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          localStorage.removeItem("theme");
        }
        /// apply
    }
    return {
        set: setTheme,
        subscribe
    }
}();