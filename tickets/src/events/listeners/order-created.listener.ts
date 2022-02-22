import {Listener, OrderCreatedEvent, QueueGroupName, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject:Subject.OrderCreated = Subject.OrderCreated
    queueGroupName = QueueGroupName.TicketService

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {

    }
}