import {Message} from "node-nats-streaming";
import {Listener} from "../../../common/src/events/core/base.listener";
import {TicketCreatedEvent} from "../../../common/src/events/tickets/ticket-created.event";
import {Subject} from "../../../common/src/enums/subject";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    queueGroupName: string = 'payments-service';
    subject: Subject.TicketCreated = Subject.TicketCreated;

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('Event data!', data)

        console.log(data.title)
        msg.ack()
    }
}
