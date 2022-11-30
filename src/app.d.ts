// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="@sveltejs/kit" />

import type { Icons } from "$lib/general/Icon.svelte";
import { ValidationRuleName } from "$lib/validate";

// and what to do when importing types
declare namespace App {
    namespace General {
        interface ValidationRule {
            name: ValidationRuleName;
            translationName: string;
            predicate: (val: string | number, ...args : number[]) => boolean;
        }
        interface Locale {
            iso2: string;
            name: string;
        }
        interface Theme {
            text: string;
            class: string;
        }
        interface NavItem {
            title: string;
            icon: Icons;
            path: string;
        }
    }
    namespace Models {


        interface CustomerIn {
            fname: string;
            lname: string;
            street: string;
            house_number: number;
            postal_code: string;
            city: string;
            country_iso3: string;
            image: string;
            company: string;
        }

        interface Country {
            name: string;
            demonym: string;
            flag: string;
            iso2: string;
            iso3: string;
        }

        interface DatabaseElement {
            id: string;
        }

        class Customer extends DatabaseElement {
            fname: string;
            lname: string;
            street: string;
            house_number: string;
            postal_code: string;
            country_iso3: string;
            image: string;
            company_id: string;
            _company?: Company;
        }

        class Company extends DatabaseElement {
            name: string;
        }

                class User extends DatabaseElement {
            fname: string;
            lname: string;
            roles: string[];
        }

                        class ProductType extends DatabaseElement {
            name: string;
        }
    }
}
