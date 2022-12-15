import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from '../../domain/entity/order'
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";

import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id,
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it('Should update a product', async () => {

    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
        "1", 
        product.name,
        product.price,
        1,
        product.id,
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "ZipCode 2", "City 2");
    customer2.Address = address2;
    await customerRepository.create(customer2);

    const newOrder = new Order(
      order.id,
      customer2.id,
      [orderItem]
    )

    await orderRepository.update(newOrder)

    const orderModel2 = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    })

    expect(orderModel2.toJSON()).toStrictEqual({
      id: "123",
      customer_id: customer2.id,
      total: order.total(),
      items: [
          {
              id: orderItem.id,
              name: orderItem.name,
              price: orderItem.price,
              product_id: orderItem.productId,
              quantity: orderItem.quantity,
              order_id: order.id
          }
      ]
    });
  })

  it('Should add new orderItem', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
        "1",
        product.name,
        product.price,
        1,
        product.id,
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      1,
      product.id,
    );

    const newOrder = new Order("123", "123", [orderItem2]);

    await orderRepository.update(newOrder)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    })

    // console.log(orderModel.toJSON())

    expect(orderModel.toJSON().items.length).toBe(2)
    expect(true).toBeTruthy()
  })

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('456', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('456', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id,
    )
    const order = new Order('456', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderFound = await orderRepository.find(order.id)

    expect(orderFound).toStrictEqual(order)
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('456', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('456', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      2,
      product.id,
    )
    const order1 = new Order('123', customer.id, [orderItem])

    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      2,
      product.id,
    )
    const order2 = new Order('456', customer.id, [orderItem2])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order1)
    await orderRepository.create(order2)

    const foundOrders = await orderRepository.findAll()
    const orders = [order1, order2]

    expect(foundOrders).toEqual(orders)
  })
});