import {natsWrapper} from '../../../nats-wrapper';
import {OrderCancelledEvent, Status} from '@nabz.tickets/common';
import mongoose from 'mongoose';
import {Message} from 'node-nats-streaming';
import {OrderCancelledListener} from '../order-cancelled.listener';
import {Order} from '../../../models/order';

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = await Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        user_id: 'sasad',
        price: 20,
        status: Status.ORDER_CREATED,
        version: 0
    });
    await order.save();

    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: order.version + 1,
        ticket: {
            id: 'order.ticket.id',
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, order, data, msg};
};

it('should update the status of the order & ack() the message.', async function () {
    const {listener, order, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(Status.ORDER_CANCELLED);
    expect(msg.ack).toHaveBeenCalled();
});
