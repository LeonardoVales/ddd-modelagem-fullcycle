import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

// Agregado 1
let customer = new Customer("123", "Leonardo Vales")
const address = new Address("Rua dois", 2, "4345546", "Minas")
customer.Address = address;
customer.activate();

//Agregado 2
const item1 = new OrderItem("1", "item 1", 10, 5, "1");
const item2 = new OrderItem("2", "item 2", 15, 5, "1");
const order = new Order("1", "123", [item1, item2])