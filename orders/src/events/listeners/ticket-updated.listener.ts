import {Listener, Subject, TicketUpdatedEvent} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {QueueGroupName} from '../queue-group-name';
import {Ticket} from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subject.TicketUpdated = Subject.TicketUpdated;
    queueGroupName = QueueGroupName.OrderService;

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        const {id, title, price} = data;
        const ticket = await Ticket.findById(id);

        if (!ticket) throw new Error('Ticket not found');

        ticket.set({title, price});
        await ticket.save();

        msg.ack();
    }
}