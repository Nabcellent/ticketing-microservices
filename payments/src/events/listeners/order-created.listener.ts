import {Listener, OrderCreatedEvent, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {QueueGroupName} from './queue-group-name';
import {Order} from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subject.OrderCreated = Subject.OrderCreated;
    queueGroupName = QueueGroupName;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        const order = Order.build({
            id: data.id,
            price: data.ticket.price,
            status: data.status,
            user_id: data.user_id,
            version: data.version
        });
        await order.save()

        //  ack() the message
        msg.ack();
    }
}
