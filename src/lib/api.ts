import { http } from "./http";
import type { App } from "../app";

export class Auth {
    static async login(user: App.Models.Auth.Login) {
        return await http<App.Models.Auth.Token>('POST', `/login`, user);
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
    static async index() {
        return await http<App.Models.Customer[]>('GET', `/Customer/get/all`);
    }
    static async create(customer: App.Models.CustomerInput) {
        return await http<App.Models.Customer>('POST', `/Customer/create/single`, customer);
    }
}

export class ProductType {
    static async index() {
        return await http<App.Models.ProductType[]>('GET', `/ProductGroup/get/all`);
    }
}