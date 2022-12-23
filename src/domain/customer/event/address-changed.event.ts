import EventInterface from "../../@shared/event/event.interface";
import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";

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