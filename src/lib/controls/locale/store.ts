import { writable } from 'svelte/store';
import { browser } from '$app/environment'; 
import type { App } from '$src/app'; 
import { get } from "svelte/store";
import { addMessages, init as _init, getLocaleFromNavigator, locale as _locale, dictionary, locales as _locales, waitLocale } from 'svelte-i18n';

export const locales: App.General.Locale[] = [
  {
    iso2: "en",
    name: "English",
  },
  {
    iso2: "de",
    name: "Deutsch",
  },
];

export const localeInitialized = writable<boolean>(false);

let userLocale : App.General.Locale | undefined;
export const initLocale : Function = function() {
  if (!browser) return () => {};
  console.log("init locale");
  const defaultLocale = locales[0];
    // user set locale
    if ('locale' in localStorage) {
      console.log(" > from localStorage");
      userLocale = locales.find(l => l.iso2 === localStorage.locale);
    }
    // fallback get browser locale
    if (!userLocale) {
      const str = getLocaleFromNavigator();
      console.log(" > from navigator", str);
      if (str != null) userLocale = locales.find(l => str.includes(l.iso2));
    }
    // otherwise take default
    if (!userLocale) {
      console.log(" > default", defaultLocale.iso2);
      userLocale = defaultLocale;
    }
  return async () => {
    if (!userLocale) return;
    console.log("fetching");
    await loadLocale(userLocale.iso2);
    console.log("init");
    await _init({
      fallbackLocale: defaultLocale.iso2,
      initialLocale: userLocale.iso2,
    });
    //locale.set(userLocale);
    localeInitialized.set(true);
  }
}();

async function loadLocale(iso2: string) : Promise<any> {
    const value = get(dictionary)[iso2];
    if (value) return value;
      return await fetch(`${window.location.origin}/locales/${iso2}.json`, {
        method: 'GET',
        mode: 'no-cors',
      })
        .then(response => response.json())
        .then((messages) => {
          console.log("adding messages for", iso2, messages);
          addMessages(iso2, messages);
        });
}

export const locale = function() {
    const {set, subscribe} = writable<App.General.Locale | undefined>(userLocale);
    function setLocale(loc: App.General.Locale) {
      loadLocale(loc.iso2).then(_ => {
          set(loc);
          localStorage.setItem("locale", loc.iso2);
          _locale.set(loc.iso2);
        });
    }
    return {
        set: setLocale,
        subscribe
    }
}();