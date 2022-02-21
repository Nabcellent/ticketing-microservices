import {OrderCancelledEvent, Publisher, Subject} from '@nabz.tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subject.OrderCancelled = Subject.OrderCancelled;
}