import Product from "../../product/entity/product";
import RepositoryInterface from "../../@shared/repository/repository-interface";

//No lugar do T vai o Product
export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}