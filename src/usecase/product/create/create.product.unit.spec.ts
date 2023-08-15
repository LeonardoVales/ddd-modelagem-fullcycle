import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: 'any_product',
  price: 10.0,
  type: 'a'
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  it('Should create a product', async (): Promise<void> => {
    const repository = MockRepository()
    const useCase = new CreateProductUseCase(repository)
    const output = await useCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })
})