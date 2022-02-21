import {OrderCreatedEvent, Publisher, Subject} from '@nabz.tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subject.OrderCreated = Subject.OrderCreated;
}