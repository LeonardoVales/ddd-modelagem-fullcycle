import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../../checkout/entity/order_item"
import OrderService from "./order.service"

describe('OrderService unit tests', () => {
  it('Should get total of all orders', () => {
    const item1 = new OrderItem("i1", "Item 1", 100, 1, "p1")
    const item2 = new OrderItem("i2", "Item 2", 200, 2, "p2")

    const order1 = new Order("1", "1", [item1])
    const order2 = new Order("1", "1", [item2])

    const total = OrderService.total([order1, order2])

    expect(total).toBe(500)
  })

  it('Should place an order', () => {
    const customer = new Customer("c1", "Customer 1")
    const item1 = new OrderItem("i1", "Item 1", 10, 1, "p1")

    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })
})