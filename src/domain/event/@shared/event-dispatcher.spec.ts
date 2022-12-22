import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler"
import EventDispatcher from "./event-dispatcher"
import ProductCreatedEvent from '../product/product-created.event'
import EnviaConsoleLog1WhenCustomerIsCreatedHandler from "../customer/handler/envia-console-log-1-when-customer-is-created.handler"
import EnviaConsoleLog2WhenCustomerIsCreatedHandler from "../customer/handler/envia-console-log-2-when-customer-is-created.handler"
import CustomerCreatedEvent from "../customer/customer-created.event"

describe('Domain events tests', () => {
  it('Should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
  })

  it('Should register events handler CustomerCreated', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler()
    const eventHandler2 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler()
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(2)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler1)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(eventHandler2)
  })

  it('Should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0)
  })

  it('Should unregister events handler CustomerCreated', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler()
    const eventHandler2 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler()
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    eventDispatcher.unregister('CustomerCreatedEvent', eventHandler1)

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler1)
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toBeUndefined()
  })

  it('Should unregister all events handler CustomerCreated', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler()
    const eventHandler2 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler()
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)
    eventDispatcher.unregisterAll()

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeUndefined()
  })

  it('Should unregister all event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined()
  })

  it('Should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')
    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10.0
    })

    //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent)

    expect(spyEventHandler).toHaveBeenCalled()
  })

  it('Should notify all events handlers CustomerCreated', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new EnviaConsoleLog1WhenCustomerIsCreatedHandler()
    const eventHandler2 = new EnviaConsoleLog2WhenCustomerIsCreatedHandler()
    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle')
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle')
    eventDispatcher.register('CustomerCreatedEvent', eventHandler1)
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

    const customerCreated = new CustomerCreatedEvent({
      id: '1',
      name: 'Customer 1',
    })

    eventDispatcher.notify(customerCreated)

    expect(spyEventHandler1).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalled()
  })
})