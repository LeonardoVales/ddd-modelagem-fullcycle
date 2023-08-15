import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe('Test create product use case', () => {
  let sequelize: Sequelize
    beforeEach( async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory',
        logging: false,
        sync: { force: true },
      })
  
    await sequelize.addModels([ProductModel]);
    await sequelize.sync()
    })
  
    afterEach( async () => {
      await sequelize.close()
    })

  it('Should create a product', async () => {
    const repository = new ProductRepository()
    const usecase = new CreateProductUseCase(repository)

    const input = {
      name: 'any_product',
      price: 10,
      type: 'a'
    }
    const output = await usecase.execute(input)
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })

})