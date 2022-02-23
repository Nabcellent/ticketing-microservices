import {Listener, OrderCreatedEvent, QueueGroupName, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {expirationQueue} from '../../queues/expiration.queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subject.OrderCreated = Subject.OrderCreated;
    queueGroupName = QueueGroupName.ExpirationService;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        const delay = new Date(data.expires_at).getTime() - new Date().getTime()
        console.log(`Waiting ${delay}ms to process the job`, );

        await expirationQueue.add({order_id: data.id}, {delay});

        msg.ack();
    }
}
