import {PaymentCreatedEvent, Publisher, Subject} from '@nabz.tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject:Subject.PaymentCreated = Subject.PaymentCreated
}
