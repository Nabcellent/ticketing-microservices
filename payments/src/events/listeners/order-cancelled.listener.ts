import {Listener, OrderCancelledEvent, Status, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {QueueGroupName} from './queue-group-name';
import {Order} from '../../models/order';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subject.OrderCancelled = Subject.OrderCancelled;
    queueGroupName = QueueGroupName;

    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
        const order = await Order.findOne({_id: data.id, version: data.version - 1});

        if (!order) throw new Error('Order not found!');

        order.set({status: Status.ORDER_CANCELLED});
        await order.save();

        msg.ack();
    }
}
