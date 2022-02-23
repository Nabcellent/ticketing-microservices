import {Listener, OrderCreatedEvent, QueueGroupName, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subject.OrderCreated = Subject.OrderCreated;
    queueGroupName = QueueGroupName.ExpirationService;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        //  Find the ticket being reserved.
        const ticket = await Ticket.findById(data.ticket.id);

        //  Throw error if ticket doesn't exist
        if (!ticket) throw new Error('Ticket not found!');

        //  Mark ticket as reserved by setting the order_id prop and save
        ticket.set({order_id: data.id});
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
