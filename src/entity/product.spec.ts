import Product from "./product"

describe('Product unit test', () => {
  it('Should trhow error when id is empty', () => {
    expect(() => {
      const product = new Product("", "Produtc 1", 100)
    }).toThrowError("Id is required")
  })
})