import {Message} from "node-nats-streaming";
import {Listener} from "./base.listener";
import {TicketCreatedEvent} from "./ticket-created.event";
import {Subject} from "./subject";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    queueGroupName: string = 'payments-service';
    subject: Subject.TicketCreated = Subject.TicketCreated;

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('Event data!', data)

        console.log(data.title)
        msg.ack()
    }
}
