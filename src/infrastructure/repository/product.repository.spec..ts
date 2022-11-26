import { Sequelize } from "sequelize-typescript"

describe('ProductRepository tests', () => {
  let sequelize: Sequelize

  beforeEach( async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true },
    })
  })

  afterEach( async () => {
    await sequelize.close()
  })


  it('Should return true', () => {
    expect(true).toBeTruthy()
  })
})