"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe('Product unit test', () => {
    it('Should trhow error when id is empty', () => {
        expect(() => {
            const product = new product_1.default("", "Produtc 1", 100);
        }).toThrowError("Id is required");
    });
});
