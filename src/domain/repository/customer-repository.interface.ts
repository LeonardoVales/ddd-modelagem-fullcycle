import Customer from "../entity/customer";
import RepositoryInterface from "./repository-interface";

//No lugar do T vai o Product
export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}