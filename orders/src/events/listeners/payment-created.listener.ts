import {Listener, PaymentCreatedEvent, QueueGroupName, Status, Subject} from '@nabz.tickets/common';
import {Message} from 'node-nats-streaming';
import {Order} from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    subject: Subject.PaymentCreated = Subject.PaymentCreated;
    queueGroupName = QueueGroupName.OrderService;

    async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
        const {order_id} = data;

        const order = await Order.findById(order_id);

        if (!order) throw new Error('Order not found!');

        order.set({status: Status.ORDER_COMPLETE});
        await order.save();

        msg.ack();
    }
}