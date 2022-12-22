import EventInterface from "../@shared/event.interface";
import Address from "../../entity/address";
import Customer from "../../entity/customer";

type AddressChanged = Pick<Customer, 'id' | 'name'> & {
  address: string
}

export default class AddressChangedEvent implements EventInterface {
  dataTimeOcurred: Date;
  eventData: AddressChanged;

  constructor(eventData: AddressChanged) {
    this.dataTimeOcurred = new Date();
    this.eventData = eventData
  }
}