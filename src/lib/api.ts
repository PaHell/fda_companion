import { http } from "./http";
import type { App } from "../app";

export class Auth {
    static async login(user: App.Models.Auth.Login) {
        return await http<App.Models.Auth.Token>('POST', `/login`, user);
    }
}

export class Customer {
    static async index() {
        return await http<App.Models.Customer[]>('GET', `/customers`);
    }
    static async create(customer: App.Models.Customer) {
        return await http<{}>('POST', `/customers`, customer);
    }
}

export class ProductType {
    static async index() {
        return await http<App.Models.ProductType[]>('GET', `/product-groups`);
    }
}