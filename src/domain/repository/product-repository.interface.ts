import Product from "../entity/product";
import RepositoryInterface from "./repository-interface";

//No lugar do T vai o Product
export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}