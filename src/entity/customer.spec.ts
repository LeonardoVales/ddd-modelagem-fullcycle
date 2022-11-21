import Address from "./address"
import Customer from "./customer"

describe('Customer unit test', () => {
  it('Should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer("", "Leonardo")
    }).toThrowError("Id is required")
  })

  it('Should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer("123", "")
    }).toThrowError("Name is required")
  })

  it('Should change name', () => {
    const customer = new Customer("123", "Leonardo")
    customer.changeName("John")

    expect(customer.name).toBe("John")
  })

  it('Should activate customer', () => {
    const customer = new Customer("123", "Leo 1")
    const address = new Address("Rua 1", 123, "23435", "São Paulo")
    customer.Address = address
    customer.activate()

    expect(customer.isActive).toBeTruthy()
  })
})