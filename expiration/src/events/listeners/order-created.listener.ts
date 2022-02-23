import {Listener, OrderCreatedEvent, QueueGroupName, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subject.OrderCreated = Subject.OrderCreated;
    queueGroupName = QueueGroupName.ExpirationService;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {

        //  ack() the message
        msg.ack();
    }
}
