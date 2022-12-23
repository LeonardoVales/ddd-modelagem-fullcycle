// import EventHandlerInterface from "../../@shared/eve/event-handler.interface";
import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import eventInterface from "../../../@shared/event/event.interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
  handle(event: eventInterface): void {
    console.log(`Sending email to......`)
  }

}