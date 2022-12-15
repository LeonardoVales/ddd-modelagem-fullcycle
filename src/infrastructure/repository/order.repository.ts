import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
// import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {

    const orderItems = await OrderItemModel.findAll({ where: { order_id: entity.id }})

    entity.items.map(async (item) => {
      const orderItemExists = orderItems.find((orderItem) => {
        return orderItem.id == item.id
      })

      if (!orderItemExists) {
        await OrderItemModel.create({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          order_id: entity.id,
          quantity: item.quantity
        })
      }

    })

    await OrderModel.update({
      id: entity.id,
      customer_id: entity.customerId,
      items: entity.items,
      total: entity.total()
    }, {
      where: { id: entity.id}
    })
  }

  async find(id: string): Promise<Order> {
    let orderModel
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: ['items'],
      })
    } catch (error) {
      throw new Error('Order not found')
    }

    const order = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.product_id,
        )
      })
    )

    return order
  }


  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] })
    return orderModels.map(
      (orderModel) =>
        new Order(
          orderModel.id,
          orderModel.customer_id,
          orderModel.items.map((item) => {
            return new OrderItem(
              item.id,
              item.name,
              item.price,
              item.quantity,
              item.product_id,
            )
          })
        )
    )
  }


  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }))
    }, {
      include: [{model: OrderItemModel}]
    })
  }
}