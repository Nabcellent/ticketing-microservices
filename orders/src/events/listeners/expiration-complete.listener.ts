import {ExpirationCompleteEvent, Listener, QueueGroupName, Status, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {Order} from '../../models/order';
import {OrderCancelledPublisher} from '../publishers/order-cancelled.publisher';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    subject: Subject.ExpirationComplete = Subject.ExpirationComplete;
    queueGroupName = QueueGroupName.ExpirationService;

    async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
        const order = await Order.findById(data.order_id).populate('ticket');

        if (!order) throw new Error('Order not found!');
        if (order.status === Status.ORDER_COMPLETE) return msg.ack();

        order.set({status: Status.ORDER_CANCELLED});
        await order.save();

        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id
            }
        });

        msg.ack();
    }
}