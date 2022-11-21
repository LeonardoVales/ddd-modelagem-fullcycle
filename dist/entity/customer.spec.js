"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
describe('Customer unit test', () => {
    it('Should throw error when id is empty', () => {
        expect(() => {
            const customer = new customer_1.default("", "Leonardo");
        }).toThrowError("Id is required");
    });
    it('Should throw error when name is empty', () => {
        expect(() => {
            const customer = new customer_1.default("123", "");
        }).toThrowError("Name is required");
    });
    it('Should change name', () => {
        const customer = new customer_1.default("123", "Leonardo");
        customer.changeName("John");
        expect(customer.name).toBe("John");
    });
    it('Should activate customer', () => {
        const customer = new customer_1.default("123", "Leo 1");
        const address = new address_1.default("Rua 1", 123, "23435", "São Paulo");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive).toBeTruthy();
    });
});
