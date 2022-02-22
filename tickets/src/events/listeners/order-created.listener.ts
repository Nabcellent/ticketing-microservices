import {Listener, OrderCreatedEvent, Subject} from '@nabz.tickets/common';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject:Subject.OrderCreated = Subject.OrderCreated
    queueGroupName = QueueGroupName.TicketService
}