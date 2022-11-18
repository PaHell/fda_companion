// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Icons } from "./lib/general/Icon.svelte";

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
        interface NavItem {
            title: string;
            icon: Icons;
            path: string;
        }
    }
}
