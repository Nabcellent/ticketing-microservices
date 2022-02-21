import {Listener, Subject, TicketCreatedEvent} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {QueueGroupName} from '../queue-group-name';
import {Ticket} from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subject.TicketCreated = Subject.TicketCreated;
    queueGroupName = QueueGroupName.OrderService;

    async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
        const {id, title, price} = data;
        await Ticket.create({_id: id, title, price});

        msg.ack();
    }
}