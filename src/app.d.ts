// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="@sveltejs/kit" />

import type { Icons } from "$lib/general/Icon.svelte";
import { RowState } from "$lib/table/Row.svelte";
import { ValidationRuleName } from "$lib/validate";
import type { SvelteComponent } from "svelte";

// and what to do when importing types
declare namespace App {
    namespace General {
        interface ValidationRule {
            name: ValidationRuleName;
            translationName: string;
            predicate: (val: string | number, ...args: number[]) => boolean;
        }
        interface Locale {
            iso2: string;
            name: string;
        }
        interface ViewSize {
            text: string;
            class: string;
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
        interface ScreenLock {
            locked: boolean;
            pin: string;
        }
        interface Column<T> {
            title: string;
            width: string;
            css: string;
            sortKey: (keyof T) | null;
        }
        interface TableContext<T> {
            registerColumn: (name: string, width: string, css: string, sortKey: (keyof T) | null) => void;
            getRowContext: (item: T, changed: () => void) => RowContext<T>;
        }
        interface RowContext<T> {
            item: T;
            index: number;
            state: RowState;
            initialState: RowState;
            changed: (state: RowState) => void;
        }
        interface ApiRequest<TInput, TOutput> {
            method: Request.Method;
            url: (...args : any[]) => string;
        }


    }
    namespace Models {

        class DatabaseElement {
            id: number;
        }

        class RequestSuccess {
            success: boolean;
        }

        class RequestError {
            error: string;
        }

        namespace Auth {
            interface Login {
                username: string;
                password: string;
            }
            interface Register {
                username: string;
                password: string;
                fname: string;
                lname: string;
                password: string;
            }
            interface Token {
                access_token: string;
                refresh_token: string;
            }
        }

        class User extends DatabaseElement {
            username: string;
            fname: string;
            lname: string;
            role_id: string;
            _role?: Role;
        }

        class Role extends DatabaseElement {
            name: string;
        }

        interface Country {
            name: string;
            demonym: string;
            flag: string;
            iso2: string;
            iso3: string;
        }

        class CustomerInput {
            fname: string;
            lname: string;
            street: string;
            house_number: string;
            postal_code: string;
            city: string;
            country_iso3: string;
            image: string;
            company: string;
            product_types: DatabaseElement.id[];
        }

        class Customer extends DatabaseElement {
            fname: string;
            lname: string;
            street: string;
            house_number: string;
            postal_code: string;
            city: string;
            country_iso3: string;
            image: string;
            company_id: string;
            _company?: Company;
        }

        class Company extends DatabaseElement {
            name: string;
        }

        class ProductType extends DatabaseElement {
            name: string;
        }
    }
}
