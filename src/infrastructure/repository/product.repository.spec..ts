import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product.model"

describe('ProductRepository tests', () => {
  let sequelize: Sequelize

  beforeEach( async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true },
    })

  sequelize.addModels([ProductModel]);
  await sequelize.sync()
  })

  

  afterEach( async () => {
    await sequelize.close()
  })


  it('Should return true', () => {
    expect(true).toBeTruthy()
  })
})