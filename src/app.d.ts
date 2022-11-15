// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    namespace General {
        interface Locale {
            iso2: string;
            name: string;
        }
        interface Theme {
            id: string;
            name: string;
            class: string;
        }
    }
}
