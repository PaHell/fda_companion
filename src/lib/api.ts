import { http } from "./http";
import type { App } from "../app";

export class Auth {
    static async login(user: App.Models.Auth.Login) {
        return await http<App.Models.Auth.Token>('POST', `/login`, user);
    }
    static async logout() {
        return await http<App.Models.RequestSuccess>('POST', `/logout`);
    }
    static async register(user: App.Models.Auth.Register) {
        return await http<App.Models.Auth.Token>('POST', `/users`, user);
    }
}

export class User {
    static async get(id: number) {
        return await http<App.Models.User>('GET', `/users/${id}`);
    }
    static async index() {
        return await http<App.Models.User[]>('GET', `/users`);
    }
}

export class Customer {
    static async get(id: number) {
        return await http('GET', `/customers/${id}`);
    }
    static async index() {
        return await http('GET', `/customers`);
    }
    static async create(customer: Customer) : Promise<Customer> {
        return await http('POST', `/customers`, customer) as Customer;
    }
}