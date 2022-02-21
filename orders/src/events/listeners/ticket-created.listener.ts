import {Listener, Subject, TicketCreatedEvent} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {QueueGroupName} from '../queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;
    queueGroupName = QueueGroupName.OrderService

    onMessage(data: TicketCreatedEvent["data"], msg: Message) {

    }
}