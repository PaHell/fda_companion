import { http } from "./http";

export class Customer {
    static async get(id: number) {
        return await http('GET', `/customers/{id}`);
    }
    static async index() {
        return await http('GET', `/customers`);
    }
    static async create(customer: Customer) : Promise<Customer> {
        return await http('POST', `/customers`, {}, customer) as Customer;
    }
}