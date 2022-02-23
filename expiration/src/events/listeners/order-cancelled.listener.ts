import {Listener, OrderCancelledEvent, QueueGroupName, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subject.OrderCancelled = Subject.OrderCancelled;
    queueGroupName = QueueGroupName.ExpirationService;

    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {

        //  ack() the message
        msg.ack();
    }
}
