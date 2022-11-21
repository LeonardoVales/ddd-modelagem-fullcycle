import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

// Agregado 1
let customer = new Customer("123", "Leonardo Vales")
const address = new Address("Rua dois", 2, "4345546", "Minas")
customer.Address = address;
customer.activate();

//Agregado 2
const item1 = new OrderItem("1", "item 1", 10, 5, "1");
const item2 = new OrderItem("2", "item 2", 15, 5, "1");
const order = new Order("1", "123", [item1, item2])