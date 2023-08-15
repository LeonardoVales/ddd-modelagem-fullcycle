import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProdutDto, OutputCreateProdutDto } from "./create.product.dto";
import { v4 as uuidv4 } from 'uuid';

export default class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepositoryInterface
  ) { }

  async execute(input: InputCreateProdutDto): Promise<OutputCreateProdutDto> {
    const product = ProductFactory.create(input.type, input.name, input.price)
  
    await this.productRepository.create(product as Product)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}