import {Listener, OrderCreatedEvent, QueueGroupName, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {Ticket} from '../../models/ticket';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subject.OrderCreated = Subject.OrderCreated;
    queueGroupName = QueueGroupName.TicketService;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        //  Find the ticket being reserved.
        const ticket = await Ticket.findById(data.ticket.id);

        //  Throw error if ticket doesn't exist
        if (!ticket) throw new Error('Ticket not found!');

        //  Mark ticket as reserved by setting the order_id prop and save
        ticket.set({order_id: data.id});
        await ticket.save();

        //  ack() the message
        msg.ack();
    }
}