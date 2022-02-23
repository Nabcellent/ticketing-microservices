import {Listener, OrderCancelledEvent, QueueGroupName, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {Ticket} from '../../models/ticket';
import {TicketUpdatedPublisher} from '../publishers/ticket-updated.publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subject.OrderCancelled = Subject.OrderCancelled;
    queueGroupName = QueueGroupName.TicketService;

    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
        //  Find the ticket being reserved.
        const ticket = await Ticket.findById(data.ticket.id);

        //  Throw error if ticket doesn't exist
        if (!ticket) throw new Error('Ticket not found!');

        //  Mark ticket as reserved by setting the order_id prop and save
        ticket.set({order_id: undefined});
        await ticket.save();

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            user_id: ticket.user_id,
            order_id: ticket.order_id,
            title: ticket.title,
            price: ticket.price,
            version: ticket.version
        });

        //  ack() the message
        msg.ack();
    }
}