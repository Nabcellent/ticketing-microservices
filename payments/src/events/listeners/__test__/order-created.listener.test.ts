import mongoose from 'mongoose';
import {OrderCreatedListener} from '../order-created.listener';
import {natsWrapper} from '../../../nats-wrapper';
import {OrderCreatedEvent, Status} from '@nabz.tickets/common';
import {Order} from '../../../models/order';

const setup = async () => {
    //  Create an instance of the listener
    const listener = new OrderCreatedListener(natsWrapper.client);

    //  Create fake data and message object
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        user_id: 'sadda',
        status: Status.ORDER_CREATED,
        expires_at: 'sasda',
        version: 0,
        ticket: {
            id: 'ticket.id',
            price: 10
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, data, msg};
};

it('should replicate the order info.', async function () {
    const {listener, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price);
});

it('should ack the message.', async function () {
    const {listener, data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});
